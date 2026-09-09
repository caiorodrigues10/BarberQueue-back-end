import { z } from "zod";

export const updateDepositPolicySchema = z.object({
  depositRequired: z.boolean().optional(),
  depositDefaultPercent: z.number().min(0).max(100).optional(),
  depositDefaultAmount: z.number().min(0).optional(),
  depositConfirmHours: z.number().min(1).optional(),
  depositInstructions: z.string().max(500).optional().nullable(),
  depositPixKey: z.string().max(100).optional().nullable(),
  depositRefundRule: z.string().max(500).optional().nullable(),
  noShowDepositRule: z.string().max(500).optional().nullable(),
});

export const confirmDepositSchema = z.object({
  pixKey: z.string().max(100).optional(),
  notes: z.string().max(300).optional(),
  idempotencyKey: z.string().max(100).optional(),
});

export const depositListQuerySchema = z.object({
  status: z.string().optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  page: z.coerce.number().min(1).default(1).optional(),
  limit: z.coerce.number().min(1).max(100).default(20).optional(),
});

export type UpdateDepositPolicyInput = z.infer<typeof updateDepositPolicySchema>;
export type ConfirmDepositInput = z.infer<typeof confirmDepositSchema>;
export type DepositListQueryInput = z.infer<typeof depositListQuerySchema>;
