import { z } from "zod";

export const configureLoyaltyProgramSchema = z.object({
  type: z.enum(["VISITS"]).default("VISITS"),
  config: z.object({
    visitsRequired: z.coerce.number().int().min(1).default(10),
    rewardDescription: z.string().max(200).default("Cortesia"),
  }),
});

export const recordVisitSchema = z.object({
  clientId: z.string().uuid(),
  idempotencyKey: z.string().max(100).optional().nullable(),
});

export const redeemRewardSchema = z.object({
  clientId: z.string().uuid(),
  description: z.string().max(200).optional(),
  idempotencyKey: z.string().max(100).optional().nullable(),
});

export const adjustManualSchema = z.object({
  clientId: z.string().uuid(),
  delta: z.coerce.number().int(),
  description: z.string().max(200),
  idempotencyKey: z.string().max(100).optional().nullable(),
});

export type ConfigureLoyaltyProgramInput = z.infer<typeof configureLoyaltyProgramSchema>;
export type RecordVisitInput = z.infer<typeof recordVisitSchema>;
export type RedeemRewardInput = z.infer<typeof redeemRewardSchema>;
export type AdjustManualInput = z.infer<typeof adjustManualSchema>;
