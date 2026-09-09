import { z } from "zod";

export const giftCardStatusMap = {
  active: "ACTIVE",
  partially_used: "PARTIALLY_USED",
  exhausted: "EXHAUSTED",
  expired: "EXPIRED",
  canceled: "CANCELED",
} as const;

export const purchaseGiftCardSchema = z.object({
  barbershopId: z.string().uuid(),
  initialBalance: z.number().positive().max(100000),
  buyerName: z.string().max(200).optional(),
  buyerPhone: z.string().max(20).optional(),
  recipientName: z.string().max(200).optional(),
  recipientPhone: z.string().max(20).optional(),
  purchaserId: z.string().uuid().optional(),
  recipientId: z.string().uuid().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const redeemGiftCardSchema = z.object({
  amount: z.number().positive().max(100000),
  appointmentId: z.string().uuid().optional(),
  notes: z.string().max(500).optional(),
});

export const giftCardListQuerySchema = z.object({
  status: z.enum(["active", "partially_used", "exhausted", "expired", "canceled"]).optional(),
});
