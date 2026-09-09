import { z } from "zod";

export const profitSettingsSchema = z.object({
  defaultTaxRate: z.number().min(0).max(100).default(0),
  defaultCommission: z.number().min(0).max(100).default(0),
  overheadCategories: z.record(z.number()).default({}),
});

export type ProfitSettingsInput = z.infer<typeof profitSettingsSchema>;

export const profitPeriodQuerySchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Period must be YYYY-MM format"),
});

export const profitComputeSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Period must be YYYY-MM format"),
});

export const profitTrendQuerySchema = z.object({
  months: z.coerce.number().int().min(1).max(24).default(6),
});

export const profitByServiceQuerySchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Period must be YYYY-MM format").optional(),
});

export const profitByStaffQuerySchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Period must be YYYY-MM format").optional(),
});

export const profitManualAdjustmentSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/, "Period must be YYYY-MM format"),
  serviceId: z.string().uuid().optional().nullable(),
  staffId: z.string().uuid().optional().nullable(),
  revenue: z.number().optional(),
  directCosts: z.number().optional(),
  overheadCosts: z.number().optional(),
  taxAmount: z.number().optional(),
  commissionAmt: z.number().optional(),
});
