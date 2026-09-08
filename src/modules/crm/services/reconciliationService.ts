import { prisma } from '@/libs/prismaClient';

export interface ReconciliationResult {
  status: 'HEALTHY' | 'DIVERGENT';
  lastBackfillAt: Date | null;
  sources: {
    services: { count: number; total: number };
    packages: { count: number; total: number };
    fiados: { count: number; total: number };
    commissions: { count: number; total: number };
  };
  differences: Array<{
    type: string;
    description: string;
    expected: number;
    actual: number;
  }>;
}

export class ReconciliationService {
  async reconcile(barbershopId: string, from: Date, to: Date): Promise<ReconciliationResult> {
    const [serviceEvents, packageEvents, fiadoEvents, commissionEntries, lastBackfill] = await Promise.all([
      prisma.crmFinancialEvent.findMany({
        where: { barbershopId, kind: 'SERVICE_COMPLETED', occurredAt: { gte: from, lte: to } },
      }),
      prisma.crmFinancialEvent.findMany({
        where: { barbershopId, kind: 'PACKAGE_SOLD', occurredAt: { gte: from, lte: to } },
      }),
      prisma.fiado.findMany({
        where: { barbershopId, createdAt: { gte: from, lte: to }, status: { in: ["PENDING", "PARTIAL"] } },
      }),
      prisma.commissionEntry.findMany({
        where: { barbershopId, createdAt: { gte: from, lte: to } },
      }),
      prisma.crmBackfillRun.findFirst({
        where: { barbershopId, status: "SUCCEEDED" },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      }),
    ]);

    const serviceTotal = serviceEvents.reduce((sum: number, e: { grossAmount: number }) => sum + e.grossAmount, 0);
    const packageTotal = packageEvents.reduce((sum: number, e: { grossAmount: number }) => sum + e.grossAmount, 0);
    const fiadoTotal = fiadoEvents.reduce((sum: number, f: { originalAmount: number; paidAmount: number; creditAdjustedAmount?: number | null }) => sum + Math.max(0, f.originalAmount - f.paidAmount - (f.creditAdjustedAmount ?? 0)), 0);
    const commissionTotal = commissionEntries.reduce((sum: number, c: { amount: number }) => sum + c.amount, 0);

    const differences: ReconciliationResult['differences'] = [];

    if (commissionTotal > 0 && serviceTotal > 0) {
      const avgCommissionRate = commissionTotal / serviceTotal;
      if (avgCommissionRate > 1 || avgCommissionRate < 0) {
        differences.push({
          type: 'SERVICE_VS_COMMISSION',
          description: 'Comissões excedem receita de serviços (rate > 100%)',
          expected: serviceTotal,
          actual: commissionTotal,
        });
      }
    }

    return {
      status: differences.length === 0 ? 'HEALTHY' : 'DIVERGENT',
      lastBackfillAt: lastBackfill?.completedAt ?? null,
      sources: {
        services: { count: serviceEvents.length, total: serviceTotal },
        packages: { count: packageEvents.length, total: packageTotal },
        fiados: { count: fiadoEvents.length, total: fiadoTotal },
        commissions: { count: commissionEntries.length, total: commissionTotal },
      },
      differences,
    };
  }
}
