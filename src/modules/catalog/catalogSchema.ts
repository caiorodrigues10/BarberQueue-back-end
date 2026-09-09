import { z } from "zod";

// ─── Variations ───────────────────────────────────────────────────

export const createVariationSchema = z.object({
  serviceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  price: z.number().min(0),
  avgTimeMinutes: z.number().int().min(1),
  isPublic: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateVariationSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  avgTimeMinutes: z.number().int().min(1).optional(),
  isPublic: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

// ─── Addons ───────────────────────────────────────────────────────

export const createAddonSchema = z.object({
  serviceId: z.string().uuid(),
  name: z.string().min(1).max(100),
  price: z.number().min(0),
  avgTimeMinutes: z.number().int().min(0).default(0),
  isPublic: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

export const updateAddonSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  price: z.number().min(0).optional(),
  avgTimeMinutes: z.number().int().min(0).optional(),
  isPublic: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

// ─── Combos ───────────────────────────────────────────────────────

export const createComboSchema = z.object({
  barbershopId: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().max(5000).optional().nullable(),
  comboPrice: z.number().min(0),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  items: z.array(z.object({
    serviceId: z.string().uuid(),
    variationId: z.string().uuid().optional().nullable(),
    sortOrder: z.number().int().min(0).default(0),
    originalPrice: z.number().min(0),
    discountedPrice: z.number().min(0),
  })).min(1),
});

export const updateComboSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(5000).optional().nullable(),
  comboPrice: z.number().min(0).optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const updateComboItemSchema = z.object({
  sortOrder: z.number().int().min(0).optional(),
  originalPrice: z.number().min(0).optional(),
  discountedPrice: z.number().min(0).optional(),
});

export const comboItemSchema = z.object({
  serviceId: z.string().uuid(),
  variationId: z.string().uuid().optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
  originalPrice: z.number().min(0),
  discountedPrice: z.number().min(0),
});

export const catalogListQuerySchema = z.object({
  barbershopId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  isPublic: z.coerce.boolean().optional(),
});
