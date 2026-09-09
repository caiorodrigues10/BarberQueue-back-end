import { prisma } from "@/libs/prismaClient";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type {
  createVariationSchema,
  updateVariationSchema,
  createAddonSchema,
  updateAddonSchema,
  createComboSchema,
  updateComboSchema,
} from "./catalogSchema";

type CreateVariation = z.infer<typeof createVariationSchema>;
type UpdateVariation = z.infer<typeof updateVariationSchema>;
type CreateAddon = z.infer<typeof createAddonSchema>;
type UpdateAddon = z.infer<typeof updateAddonSchema>;
type CreateCombo = z.infer<typeof createComboSchema>;
type UpdateCombo = z.infer<typeof updateComboSchema>;

const variationSelect = {
  id: true,
  serviceId: true,
  name: true,
  price: true,
  avgTimeMinutes: true,
  isPublic: true,
  sortOrder: true,
  createdAt: true,
  service: { select: { id: true, name: true } },
} as const;

const addonSelect = {
  id: true,
  serviceId: true,
  name: true,
  price: true,
  avgTimeMinutes: true,
  isPublic: true,
  sortOrder: true,
  createdAt: true,
  service: { select: { id: true, name: true } },
} as const;

const comboSelect = {
  id: true,
  barbershopId: true,
  name: true,
  description: true,
  comboPrice: true,
  isActive: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  items: {
    select: {
      id: true,
      serviceId: true,
      variationId: true,
      sortOrder: true,
      originalPrice: true,
      discountedPrice: true,
      service: { select: { id: true, name: true } },
      variation: { select: { id: true, name: true, price: true } },
    },
    orderBy: { sortOrder: "asc" as const },
  },
} as const;

// ─── Variations ───────────────────────────────────────────────────

export class CatalogRepository {
  async listVariations(barbershopId: string, serviceId?: string, isPublic?: boolean) {
    return prisma.serviceVariation.findMany({
      where: {
        service: { barbershopId },
        ...(serviceId ? { serviceId } : {}),
        ...(isPublic !== undefined ? { isPublic } : {}),
      },
      select: variationSelect,
      orderBy: { sortOrder: "asc" },
    });
  }

  async findVariationById(id: string) {
    return prisma.serviceVariation.findUnique({ where: { id }, select: variationSelect });
  }

  async createVariation(data: CreateVariation) {
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service) throw new AppError("Serviço não encontrado", 404);

    return prisma.serviceVariation.create({
      data: {
        serviceId: data.serviceId,
        name: data.name,
        price: data.price,
        avgTimeMinutes: data.avgTimeMinutes,
        isPublic: data.isPublic,
        sortOrder: data.sortOrder,
      },
      select: variationSelect,
    });
  }

  async updateVariation(id: string, data: UpdateVariation) {
    const existing = await prisma.serviceVariation.findUnique({ where: { id } });
    if (!existing) throw new AppError("Variação não encontrada", 404);

    return prisma.serviceVariation.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.avgTimeMinutes !== undefined && { avgTimeMinutes: data.avgTimeMinutes }),
        ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
      select: variationSelect,
    });
  }

  async deleteVariation(id: string) {
    const existing = await prisma.serviceVariation.findUnique({ where: { id } });
    if (!existing) throw new AppError("Variação não encontrada", 404);
    await prisma.serviceVariation.delete({ where: { id } });
  }

  // ─── Addons ───────────────────────────────────────────────────────

  async listAddons(barbershopId: string, serviceId?: string, isPublic?: boolean) {
    return prisma.serviceAddon.findMany({
      where: {
        service: { barbershopId },
        ...(serviceId ? { serviceId } : {}),
        ...(isPublic !== undefined ? { isPublic } : {}),
      },
      select: addonSelect,
      orderBy: { sortOrder: "asc" },
    });
  }

  async findAddonById(id: string) {
    return prisma.serviceAddon.findUnique({ where: { id }, select: addonSelect });
  }

  async createAddon(data: CreateAddon) {
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service) throw new AppError("Serviço não encontrado", 404);

    return prisma.serviceAddon.create({
      data: {
        serviceId: data.serviceId,
        name: data.name,
        price: data.price,
        avgTimeMinutes: data.avgTimeMinutes,
        isPublic: data.isPublic,
        sortOrder: data.sortOrder,
      },
      select: addonSelect,
    });
  }

  async updateAddon(id: string, data: UpdateAddon) {
    const existing = await prisma.serviceAddon.findUnique({ where: { id } });
    if (!existing) throw new AppError("Addon não encontrado", 404);

    return prisma.serviceAddon.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.avgTimeMinutes !== undefined && { avgTimeMinutes: data.avgTimeMinutes }),
        ...(data.isPublic !== undefined && { isPublic: data.isPublic }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
      select: addonSelect,
    });
  }

  async deleteAddon(id: string) {
    const existing = await prisma.serviceAddon.findUnique({ where: { id } });
    if (!existing) throw new AppError("Addon não encontrado", 404);
    await prisma.serviceAddon.delete({ where: { id } });
  }

  // ─── Combos ───────────────────────────────────────────────────────

  async listCombos(barbershopId: string, isActive?: boolean) {
    return prisma.serviceCombo.findMany({
      where: {
        barbershopId,
        ...(isActive !== undefined ? { isActive } : {}),
      },
      select: comboSelect,
      orderBy: { sortOrder: "asc" },
    });
  }

  async findComboById(id: string) {
    return prisma.serviceCombo.findUnique({ where: { id }, select: comboSelect });
  }

  async createCombo(data: CreateCombo) {
    return prisma.serviceCombo.create({
      data: {
        barbershopId: data.barbershopId,
        name: data.name,
        description: data.description ?? null,
        comboPrice: data.comboPrice,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        items: {
          create: data.items.map((item) => ({
            serviceId: item.serviceId,
            variationId: item.variationId ?? null,
            sortOrder: item.sortOrder,
            originalPrice: item.originalPrice,
            discountedPrice: item.discountedPrice,
          })),
        },
      },
      select: comboSelect,
    });
  }

  async updateCombo(id: string, data: UpdateCombo) {
    const existing = await prisma.serviceCombo.findUnique({ where: { id } });
    if (!existing) throw new AppError("Combo não encontrado", 404);

    return prisma.serviceCombo.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.comboPrice !== undefined && { comboPrice: data.comboPrice }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.sortOrder !== undefined && { sortOrder: data.sortOrder }),
      },
      select: comboSelect,
    });
  }

  async deleteCombo(id: string) {
    const existing = await prisma.serviceCombo.findUnique({ where: { id } });
    if (!existing) throw new AppError("Combo não encontrado", 404);
    await prisma.serviceCombo.delete({ where: { id } });
  }

  async addComboItem(comboId: string, item: { serviceId: string; variationId?: string | null; sortOrder?: number; originalPrice: number; discountedPrice: number }) {
    const combo = await prisma.serviceCombo.findUnique({ where: { id: comboId } });
    if (!combo) throw new AppError("Combo não encontrado", 404);

    return prisma.comboItem.create({
      data: {
        comboId,
        serviceId: item.serviceId,
        variationId: item.variationId ?? null,
        sortOrder: item.sortOrder ?? 0,
        originalPrice: item.originalPrice,
        discountedPrice: item.discountedPrice,
      },
      select: {
        id: true,
        comboId: true,
        serviceId: true,
        variationId: true,
        sortOrder: true,
        originalPrice: true,
        discountedPrice: true,
      },
    });
  }

  async removeComboItem(id: string) {
    const existing = await prisma.comboItem.findUnique({ where: { id } });
    if (!existing) throw new AppError("Item do combo não encontrado", 404);
    await prisma.comboItem.delete({ where: { id } });
  }
}
