import { GiftCardRepository } from "./giftCardRepository";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type { purchaseGiftCardSchema, redeemGiftCardSchema, giftCardListQuerySchema } from "./giftCardSchema";

type PurchaseInput = z.infer<typeof purchaseGiftCardSchema>;
type RedeemInput = z.infer<typeof redeemGiftCardSchema>;
type ListQuery = z.infer<typeof giftCardListQuerySchema>;

export class GiftCardUseCases {
  private repo = new GiftCardRepository();

  async purchase(barbershopId: string, data: PurchaseInput) {
    const code = await this.repo.generateUniqueCode();
    return this.repo.create({ ...data, barbershopId }, code);
  }

  async getById(id: string, barbershopId: string) {
    const card = await this.repo.findById(id);
    if (!card) throw new AppError("Gift card não encontrado", 404);
    if (card.barbershopId !== barbershopId) throw new AppError("Gift card não pertence a esta barbearia", 403);
    return card;
  }

  async lookupByCode(code: string, barbershopId: string) {
    const card = await this.repo.findByCode(code);
    if (!card) throw new AppError("Gift card não encontrado", 404);
    if (card.barbershopId !== barbershopId) throw new AppError("Gift card não pertence a esta barbearia", 403);
    return card;
  }

  async list(barbershopId: string, query: ListQuery) {
    return this.repo.listByBarbershop(barbershopId, query.status);
  }

  async redeem(id: string, barbershopId: string, data: RedeemInput) {
    const card = await this.repo.findById(id);
    if (!card) throw new AppError("Gift card não encontrado", 404);
    if (card.barbershopId !== barbershopId) {
      throw new AppError("Gift card não pertence a esta barbearia", 403);
    }
    if (card.status === "CANCELED") {
      throw new AppError("Gift card está cancelado", 400);
    }
    if (card.status === "EXPIRED") {
      throw new AppError("Gift card expirado", 400);
    }
    if (card.status === "EXHAUSTED") {
      throw new AppError("Gift card sem saldo", 400);
    }
    if (card.expiresAt && new Date(card.expiresAt) < new Date()) {
      throw new AppError("Gift card expirou", 400);
    }

    const currentBalance = Number(card.currentBalance);
    if (data.amount > currentBalance) {
      throw new AppError("Valor excede o saldo disponível", 400);
    }

    const newBalance = currentBalance - data.amount;
    const newStatus = newBalance === 0 ? "EXHAUSTED" : "PARTIALLY_USED";

    await this.repo.addUsage({
      giftCardId: id,
      amount: data.amount,
      appointmentId: data.appointmentId,
      notes: data.notes,
    });

    const updated = await this.repo.updateBalance(id, newBalance, newStatus);

    if (newStatus === "EXHAUSTED") {
      await this.repo.markRedeemed(id);
    }

    return updated;
  }

  async cancel(id: string, barbershopId: string) {
    const card = await this.repo.findById(id);
    if (!card) throw new AppError("Gift card não encontrado", 404);
    if (card.barbershopId !== barbershopId) {
      throw new AppError("Gift card não pertence a esta barbearia", 403);
    }
    if (card.status === "EXHAUSTED") {
      throw new AppError("Não é possível cancelar gift card totalmente utilizado", 400);
    }
    return this.repo.cancel(id);
  }

  async getUsages(id: string, barbershopId: string) {
    const card = await this.repo.findById(id);
    if (!card) throw new AppError("Gift card não encontrado", 404);
    if (card.barbershopId !== barbershopId) throw new AppError("Gift card não pertence a esta barbearia", 403);
    return this.repo.getUsages(id);
  }

  async expireExpired() {
    return this.repo.expireExpired();
  }
}
