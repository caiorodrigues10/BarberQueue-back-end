import { CatalogRepository } from "./catalogRepository";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type {
  createVariationSchema,
  updateVariationSchema,
  createAddonSchema,
  updateAddonSchema,
  createComboSchema,
  updateComboSchema,
  catalogListQuerySchema,
} from "./catalogSchema";

type CreateVariation = z.infer<typeof createVariationSchema>;
type UpdateVariation = z.infer<typeof updateVariationSchema>;
type CreateAddon = z.infer<typeof createAddonSchema>;
type UpdateAddon = z.infer<typeof updateAddonSchema>;
type CreateCombo = z.infer<typeof createComboSchema>;
type UpdateCombo = z.infer<typeof updateComboSchema>;
type ListQuery = z.infer<typeof catalogListQuerySchema>;

export class CatalogUseCases {
  private repo = new CatalogRepository();

  // ─── Variations ─────────────────────────────────────────────────

  async listVariations(barbershopId: string, query: ListQuery) {
    return this.repo.listVariations(barbershopId, query.serviceId, query.isPublic);
  }

  async getVariation(id: string) {
    const v = await this.repo.findVariationById(id);
    if (!v) throw new AppError("Variação não encontrada", 404);
    return v;
  }

  async createVariation(barbershopId: string, data: CreateVariation) {
    return this.repo.createVariation(data);
  }

  async updateVariation(id: string, barbershopId: string, data: UpdateVariation) {
    const existing = await this.repo.findVariationById(id);
    if (!existing) throw new AppError("Variação não encontrada", 404);
    return this.repo.updateVariation(id, data);
  }

  async deleteVariation(id: string, barbershopId: string) {
    const existing = await this.repo.findVariationById(id);
    if (!existing) throw new AppError("Variação não encontrada", 404);
    return this.repo.deleteVariation(id);
  }

  // ─── Addons ─────────────────────────────────────────────────────

  async listAddons(barbershopId: string, query: ListQuery) {
    return this.repo.listAddons(barbershopId, query.serviceId, query.isPublic);
  }

  async getAddon(id: string) {
    const a = await this.repo.findAddonById(id);
    if (!a) throw new AppError("Addon não encontrado", 404);
    return a;
  }

  async createAddon(barbershopId: string, data: CreateAddon) {
    return this.repo.createAddon(data);
  }

  async updateAddon(id: string, barbershopId: string, data: UpdateAddon) {
    const existing = await this.repo.findAddonById(id);
    if (!existing) throw new AppError("Addon não encontrado", 404);
    return this.repo.updateAddon(id, data);
  }

  async deleteAddon(id: string, barbershopId: string) {
    const existing = await this.repo.findAddonById(id);
    if (!existing) throw new AppError("Addon não encontrado", 404);
    return this.repo.deleteAddon(id);
  }

  // ─── Combos ─────────────────────────────────────────────────────

  async listCombos(barbershopId: string, isActive?: boolean) {
    return this.repo.listCombos(barbershopId, isActive);
  }

  async getCombo(id: string) {
    const c = await this.repo.findComboById(id);
    if (!c) throw new AppError("Combo não encontrado", 404);
    return c;
  }

  async createCombo(barbershopId: string, data: CreateCombo) {
    return this.repo.createCombo({ ...data, barbershopId });
  }

  async updateCombo(id: string, barbershopId: string, data: UpdateCombo) {
    const existing = await this.repo.findComboById(id);
    if (!existing) throw new AppError("Combo não encontrado", 404);
    if (existing.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return this.repo.updateCombo(id, data);
  }

  async deleteCombo(id: string, barbershopId: string) {
    const existing = await this.repo.findComboById(id);
    if (!existing) throw new AppError("Combo não encontrado", 404);
    if (existing.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return this.repo.deleteCombo(id);
  }

  async addComboItem(comboId: string, barbershopId: string, item: { serviceId: string; variationId?: string | null; sortOrder?: number; originalPrice: number; discountedPrice: number }) {
    const combo = await this.repo.findComboById(comboId);
    if (!combo) throw new AppError("Combo não encontrado", 404);
    if (combo.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return this.repo.addComboItem(comboId, item);
  }

  async removeComboItem(id: string, barbershopId: string) {
    return this.repo.removeComboItem(id);
  }
}
