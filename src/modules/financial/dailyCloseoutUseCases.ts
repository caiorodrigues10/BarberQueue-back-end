import { prisma } from "@/libs/prismaClient";
import { AppError } from "@/shared/errors/AppError";
import {
  DailyCloseoutRepository,
  DailyCloseoutData,
  DailyCloseoutResponse,
} from "./dailyCloseoutRepository";

export class DailyCloseoutUseCases {
  private repo = new DailyCloseoutRepository();

  async closeDay(
    barbershopId: string,
    date: Date,
    userId: string,
    payload: Omit<DailyCloseoutData, "closedBy" | "closedAt">
  ): Promise<DailyCloseoutResponse> {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    const startOfDay = new Date(normalizedDate);
    const endOfDay = new Date(normalizedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const [expenses, commissions, productSales, fiados, cashMovements] = await Promise.all([
      prisma.expense.aggregate({
        where: {
          barbershopId,
          referenceDate: { gte: startOfDay, lte: endOfDay },
        },
        _sum: { amount: true },
      }),
      prisma.commissionEntry.aggregate({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
        _sum: { amount: true },
      }),
      prisma.retailSale.aggregate({
        where: {
          barbershopId,
          soldAt: { gte: startOfDay, lte: endOfDay },
          status: "COMPLETED",
        },
        _sum: { total: true },
      }),
      prisma.fiado.findMany({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
        select: { originalAmount: true, paidAmount: true },
      }),
      prisma.cashMovement.findMany({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
      }),
    ]);

    const aggregatedExpenses = expenses._sum.amount ?? 0;
    const aggregatedCommissions = commissions._sum.amount ?? 0;
    const aggregatedProductSales = productSales._sum.total ?? 0;

    let aggregatedFiadoCreated = 0;
    let aggregatedFiadoPaid = 0;
    for (const f of fiados) {
      aggregatedFiadoCreated += f.originalAmount;
      aggregatedFiadoPaid += f.paidAmount;
    }

    const positiveTypes = ["SERVICE_SALE", "PRODUCT_SALE", "PACKAGE_SALE", "FIADO_PAYMENT"];

    let cashFromMovements = 0;
    let pixFromMovements = 0;
    let cardFromMovements = 0;
    let fiadoFromMovements = 0;

    for (const m of cashMovements) {
      const amt = Number(m.amount);
      const isIn = positiveTypes.includes(m.type);
      const signed = isIn ? amt : -amt;

      switch (m.paymentMethod) {
        case "CASH":
          cashFromMovements += signed;
          break;
        case "PIX":
          pixFromMovements += signed;
          break;
        case "CREDIT_CARD":
        case "DEBIT_CARD":
          cardFromMovements += signed;
          break;
        case "FIADO":
          fiadoFromMovements += signed;
          break;
      }
    }

    const data: DailyCloseoutData = {
      balanceOpen: payload.balanceOpen,
      cashReceived: payload.cashReceived || cashFromMovements,
      pixReceived: payload.pixReceived || pixFromMovements,
      cardReceived: payload.cardReceived || cardFromMovements,
      fiadoCreated: aggregatedFiadoCreated || (fiadoFromMovements > 0 ? fiadoFromMovements : 0),
      fiadoPaid: aggregatedFiadoPaid || (fiadoFromMovements < 0 ? Math.abs(fiadoFromMovements) : 0),
      expenses: aggregatedExpenses,
      commissions: aggregatedCommissions,
      productSales: aggregatedProductSales,
      discrepancy: payload.discrepancy ?? null,
      notes: payload.notes ?? null,
      closedBy: userId,
      closedAt: new Date(),
    };

    return this.repo.upsert(barbershopId, normalizedDate, data);
  }

  async getCloseout(
    barbershopId: string,
    date: Date
  ): Promise<DailyCloseoutResponse> {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const existing = await this.repo.findByDate(barbershopId, normalizedDate);
    if (existing) return existing;

    const startOfDay = new Date(normalizedDate);
    const endOfDay = new Date(normalizedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const [expenses, commissions, productSales, fiados, cashMovements] = await Promise.all([
      prisma.expense.aggregate({
        where: {
          barbershopId,
          referenceDate: { gte: startOfDay, lte: endOfDay },
        },
        _sum: { amount: true },
      }),
      prisma.commissionEntry.aggregate({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
        _sum: { amount: true },
      }),
      prisma.retailSale.aggregate({
        where: {
          barbershopId,
          soldAt: { gte: startOfDay, lte: endOfDay },
          status: "COMPLETED",
        },
        _sum: { total: true },
      }),
      prisma.fiado.findMany({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
        select: { originalAmount: true, paidAmount: true },
      }),
      prisma.cashMovement.findMany({
        where: {
          barbershopId,
          createdAt: { gte: startOfDay, lte: endOfDay },
        },
      }),
    ]);

    const aggregatedExpenses = expenses._sum.amount ?? 0;
    const aggregatedCommissions = commissions._sum.amount ?? 0;
    const aggregatedProductSales = productSales._sum.total ?? 0;

    let aggregatedFiadoCreated = 0;
    let aggregatedFiadoPaid = 0;
    for (const f of fiados) {
      aggregatedFiadoCreated += f.originalAmount;
      aggregatedFiadoPaid += f.paidAmount;
    }

    const positiveTypes = ["SERVICE_SALE", "PRODUCT_SALE", "PACKAGE_SALE", "FIADO_PAYMENT"];
    let cashFromMovements = 0;
    let pixFromMovements = 0;
    let cardFromMovements = 0;

    for (const m of cashMovements) {
      const amt = Number(m.amount);
      const isIn = positiveTypes.includes(m.type);
      const signed = isIn ? amt : -amt;

      switch (m.paymentMethod) {
        case "CASH":
          cashFromMovements += signed;
          break;
        case "PIX":
          pixFromMovements += signed;
          break;
        case "CREDIT_CARD":
        case "DEBIT_CARD":
          cardFromMovements += signed;
          break;
      }
    }

    const autoCalculated = await this.repo.upsert(barbershopId, normalizedDate, {
      balanceOpen: 0,
      cashReceived: cashFromMovements,
      pixReceived: pixFromMovements,
      cardReceived: cardFromMovements,
      fiadoCreated: aggregatedFiadoCreated,
      fiadoPaid: aggregatedFiadoPaid,
      expenses: aggregatedExpenses,
      commissions: aggregatedCommissions,
      productSales: aggregatedProductSales,
      notes: "Auto-calculated from CashMovement records",
    });

    return autoCalculated;
  }
}
