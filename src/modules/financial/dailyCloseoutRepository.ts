import { prisma } from "@/libs/prismaClient";
import { Decimal } from "@prisma/client/runtime/library";

export interface DailyCloseoutData {
  balanceOpen: number;
  cashReceived: number;
  pixReceived: number;
  cardReceived: number;
  fiadoCreated: number;
  fiadoPaid: number;
  expenses: number;
  commissions: number;
  productSales: number;
  discrepancy?: number | null;
  notes?: string | null;
  closedBy?: string | null;
  closedAt?: Date | null;
}

export interface DailyCloseoutResponse {
  id: string;
  barbershopId: string;
  date: Date;
  balanceOpen: Decimal;
  cashReceived: Decimal;
  pixReceived: Decimal;
  cardReceived: Decimal;
  fiadoCreated: Decimal;
  fiadoPaid: Decimal;
  expenses: Decimal;
  commissions: Decimal;
  productSales: Decimal;
  discrepancy: Decimal | null;
  notes: string | null;
  closedBy: string | null;
  closedAt: Date | null;
  createdAt: Date;
}

export class DailyCloseoutRepository {
  async upsert(
    barbershopId: string,
    date: Date,
    data: DailyCloseoutData
  ): Promise<DailyCloseoutResponse> {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const existing = await prisma.dailyCloseout.findUnique({
      where: { barbershopId_date: { barbershopId, date: normalizedDate } },
    });

    if (existing) {
      return prisma.dailyCloseout.update({
        where: { id: existing.id },
        data: {
          balanceOpen: data.balanceOpen,
          cashReceived: data.cashReceived,
          pixReceived: data.pixReceived,
          cardReceived: data.cardReceived,
          fiadoCreated: data.fiadoCreated,
          fiadoPaid: data.fiadoPaid,
          expenses: data.expenses,
          commissions: data.commissions,
          productSales: data.productSales,
          discrepancy: data.discrepancy ?? null,
          notes: data.notes ?? null,
          closedBy: data.closedBy ?? null,
          closedAt: data.closedAt ?? new Date(),
        },
      });
    }

    return prisma.dailyCloseout.create({
      data: {
        barbershopId,
        date: normalizedDate,
        balanceOpen: data.balanceOpen,
        cashReceived: data.cashReceived,
        pixReceived: data.pixReceived,
        cardReceived: data.cardReceived,
        fiadoCreated: data.fiadoCreated,
        fiadoPaid: data.fiadoPaid,
        expenses: data.expenses,
        commissions: data.commissions,
        productSales: data.productSales,
        discrepancy: data.discrepancy ?? null,
        notes: data.notes ?? null,
        closedBy: data.closedBy ?? null,
        closedAt: data.closedAt ?? new Date(),
      },
    });
  }

  async findByDate(
    barbershopId: string,
    date: Date
  ): Promise<DailyCloseoutResponse | null> {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    return prisma.dailyCloseout.findUnique({
      where: { barbershopId_date: { barbershopId, date: normalizedDate } },
    });
  }

  async list(
    barbershopId: string,
    startDate: Date,
    endDate: Date
  ): Promise<DailyCloseoutResponse[]> {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    return prisma.dailyCloseout.findMany({
      where: {
        barbershopId,
        date: { gte: start, lte: end },
      },
      orderBy: { date: "desc" },
    });
  }
}
