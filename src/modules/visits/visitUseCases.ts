import { VisitRepository } from "./visitRepository";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type {
  createVisitSchema,
  updateVisitStatusSchema,
  addItemSchema,
  recordPaymentSchema,
  closeTabSchema,
  visitListQuerySchema,
} from "./visitSchema";

type CreateVisit = z.infer<typeof createVisitSchema>;
type AddItem = z.infer<typeof addItemSchema>;
type RecordPayment = z.infer<typeof recordPaymentSchema>;
type CloseTab = z.infer<typeof closeTabSchema>;
type ListQuery = z.infer<typeof visitListQuerySchema>;

export class VisitUseCases {
  private repo = new VisitRepository();

  async listByBarbershop(barbershopId: string, query: ListQuery) {
    return this.repo.listByBarbershop(barbershopId, query.status);
  }

  async getById(id: string) {
    const visit = await this.repo.findById(id);
    if (!visit) throw new AppError("Visita não encontrada", 404);
    return visit;
  }

  async create(barbershopId: string, data: CreateVisit) {
    return this.repo.create({ ...data, barbershopId });
  }

  async updateStatus(id: string, barbershopId: string, status: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("Visita não encontrada", 404);
    if (existing.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return this.repo.updateStatus(id, status);
  }

  async addItem(visitId: string, barbershopId: string, data: AddItem) {
    const existing = await this.repo.findById(visitId);
    if (!existing) throw new AppError("Visita não encontrada", 404);
    if (existing.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return this.repo.addItem(visitId, data);
  }

  async updateItemStatus(itemId: string, barbershopId: string, status: string) {
    return this.repo.updateItemStatus(itemId, status);
  }

  async removeItem(itemId: string, barbershopId: string) {
    return this.repo.removeItem(itemId);
  }

  async recordPayment(tabId: string, barbershopId: string, data: RecordPayment) {
    const visit = await this.repo.findById(tabId);
    if (!visit?.tab) throw new AppError("Tab não encontrada", 404);
    return this.repo.recordPayment(tabId, data);
  }

  async closeTab(tabId: string, barbershopId: string, userId: string, data?: CloseTab) {
    return this.repo.closeTab(tabId, userId, data);
  }
}
