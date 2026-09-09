import { prisma } from "@/libs/prismaClient";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type {
  createVisitSchema,
  updateVisitStatusSchema,
  addItemSchema,
  recordPaymentSchema,
  closeTabSchema,
} from "./visitSchema";

type CreateVisit = z.infer<typeof createVisitSchema>;
type AddItem = z.infer<typeof addItemSchema>;
type RecordPayment = z.infer<typeof recordPaymentSchema>;
type CloseTab = z.infer<typeof closeTabSchema>;

const visitSelect = {
  id: true,
  barbershopId: true,
  clientId: true,
  clientIdentityId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  client: { select: { id: true, name: true, whatsapp: true } },
  tab: {
    select: {
      id: true,
      visitId: true,
      barbershopId: true,
      status: true,
      subtotal: true,
      discountAmount: true,
      creditsApplied: true,
      depositApplied: true,
      totalReceived: true,
      totalPending: true,
      closedAt: true,
      closedById: true,
      createdAt: true,
      updatedAt: true,
      items: {
        select: {
          id: true,
          type: true,
          serviceId: true,
          variationId: true,
          addonId: true,
          productId: true,
          comboId: true,
          appointmentId: true,
          quantity: true,
          unitPrice: true,
          discountPercent: true,
          discountAmount: true,
          total: true,
          staffId: true,
          status: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" as const },
      },
      payments: {
        select: {
          id: true,
          amount: true,
          paymentMethod: true,
          reference: true,
          recordedById: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" as const },
      },
    },
  },
} as const;

export class VisitRepository {
  async listByBarbershop(barbershopId: string, status?: string) {
    return prisma.visit.findMany({
      where: {
        barbershopId,
        ...(status ? { status: status.toUpperCase() as any } : {}),
      },
      select: visitSelect,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.visit.findUnique({ where: { id }, select: visitSelect });
  }

  async create(data: CreateVisit) {
    const visit = await prisma.visit.create({
      data: {
        barbershopId: data.barbershopId,
        clientId: data.clientId ?? null,
        clientIdentityId: data.clientIdentityId ?? null,
        status: "PLANNED",
      },
      select: { id: true, barbershopId: true },
    });

    const tab = await prisma.visitTab.create({
      data: {
        visitId: visit.id,
        barbershopId: visit.barbershopId,
        status: "OPEN",
      },
      select: { id: true },
    });

    return this.findById(visit.id);
  }

  async updateStatus(id: string, status: string) {
    const existing = await prisma.visit.findUnique({ where: { id } });
    if (!existing) throw new AppError("Visita não encontrada", 404);

    return prisma.visit.update({
      where: { id },
      data: { status: status.toUpperCase() as any },
      select: visitSelect,
    });
  }

  async addItem(visitId: string, data: AddItem) {
    const visit = await prisma.visit.findUnique({
      where: { id: visitId },
      select: { id: true, tab: { select: { id: true, status: true } } },
    });
    if (!visit) throw new AppError("Visita não encontrada", 404);
    if (!visit.tab) throw new AppError("Tab não encontrada", 404);
    if (visit.tab.status !== "OPEN") throw new AppError("Tab não está aberta", 400);

    const item = await prisma.tabItem.create({
      data: {
        tabId: visit.tab.id,
        type: data.type as any,
        serviceId: data.serviceId ?? null,
        variationId: data.variationId ?? null,
        addonId: data.addonId ?? null,
        productId: data.productId ?? null,
        comboId: data.comboId ?? null,
        appointmentId: data.appointmentId ?? null,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
        discountPercent: data.discountPercent,
        discountAmount: data.discountAmount,
        total: data.total,
        staffId: data.staffId ?? null,
        status: "PENDING",
      },
      select: {
        id: true,
        type: true,
        serviceId: true,
        variationId: true,
        addonId: true,
        productId: true,
        comboId: true,
        appointmentId: true,
        quantity: true,
        unitPrice: true,
        discountPercent: true,
        discountAmount: true,
        total: true,
        staffId: true,
        status: true,
        createdAt: true,
      },
    });

    await this.recalculateTab(visit.tab.id);

    return item;
  }

  async updateItemStatus(itemId: string, status: string) {
    const item = await prisma.tabItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError("Item não encontrado", 404);

    return prisma.tabItem.update({
      where: { id: itemId },
      data: { status: status.toUpperCase() as any },
    });
  }

  async removeItem(itemId: string) {
    const item = await prisma.tabItem.findUnique({ where: { id: itemId } });
    if (!item) throw new AppError("Item não encontrado", 404);

    await prisma.tabItem.delete({ where: { id: itemId } });
    await this.recalculateTab(item.tabId);
  }

  async recordPayment(tabId: string, data: RecordPayment) {
    const tab = await prisma.visitTab.findUnique({ where: { id: tabId } });
    if (!tab) throw new AppError("Tab não encontrada", 404);
    if (tab.status !== "OPEN") throw new AppError("Tab não está aberta", 400);

    const payment = await prisma.tabPayment.create({
      data: {
        tabId,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        reference: data.reference ?? null,
      },
      select: {
        id: true,
        amount: true,
        paymentMethod: true,
        reference: true,
        recordedById: true,
        createdAt: true,
      },
    });

    await this.recalculateTab(tabId);

    return payment;
  }

  async closeTab(tabId: string, userId: string, data?: CloseTab) {
    const tab = await prisma.visitTab.findUnique({
      where: { id: tabId },
      select: { id: true, status: true, barbershopId: true, visitId: true },
    });
    if (!tab) throw new AppError("Tab não encontrada", 404);
    if (tab.status !== "OPEN") throw new AppError("Tab não está aberta", 400);

    if (data) {
      await prisma.visitTab.update({
        where: { id: tabId },
        data: {
          ...(data.discountAmount !== undefined && { discountAmount: data.discountAmount }),
          ...(data.creditsApplied !== undefined && { creditsApplied: data.creditsApplied }),
          ...(data.depositApplied !== undefined && { depositApplied: data.depositApplied }),
        },
      });
      await this.recalculateTab(tabId);
    }

    const updatedTab = await prisma.visitTab.update({
      where: { id: tabId },
      data: {
        status: "CLOSED",
        closedAt: new Date(),
        closedById: userId,
      },
    });

    await prisma.visit.update({
      where: { id: tab.visitId },
      data: { status: "COMPLETED" },
    });

    return this.findById(tab.visitId);
  }

  private async recalculateTab(tabId: string) {
    const items = await prisma.tabItem.findMany({
      where: { tabId },
      select: { total: true, discountAmount: true },
    });

    const payments = await prisma.tabPayment.findMany({
      where: { tabId },
      select: { amount: true },
    });

    const subtotal = items.reduce((sum: number, i: any) => sum + Number(i.total), 0);
    const totalDiscount = items.reduce((sum: number, i: any) => sum + Number(i.discountAmount), 0);
    const totalReceived = payments.reduce((sum: number, p: any) => sum + Number(p.amount), 0);
    const totalPending = Math.max(0, subtotal - totalDiscount - totalReceived);

    await prisma.visitTab.update({
      where: { id: tabId },
      data: {
        subtotal,
        totalReceived,
        totalPending,
      },
    });
  }
}
