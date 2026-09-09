import { z } from "zod";

export const visitStatusMap = {
  planned: "PLANNED",
  in_progress: "IN_PROGRESS",
  completed: "COMPLETED",
  canceled: "CANCELED",
} as const;

export const tabStatusMap = {
  open: "OPEN",
  closed: "CLOSED",
  canceled: "CANCELED",
} as const;

export const createVisitSchema = z.object({
  barbershopId: z.string().uuid(),
  clientId: z.string().uuid().optional().nullable(),
  clientIdentityId: z.string().uuid().optional().nullable(),
});

export const updateVisitStatusSchema = z.object({
  status: z.enum(["planned", "in_progress", "completed", "canceled"]),
});

export const addItemSchema = z.object({
  type: z.enum(["SERVICE", "ADDON", "PRODUCT", "COMBO", "CREDIT", "DEPOSIT"]).default("SERVICE"),
  serviceId: z.string().uuid().optional().nullable(),
  variationId: z.string().uuid().optional().nullable(),
  addonId: z.string().uuid().optional().nullable(),
  productId: z.string().uuid().optional().nullable(),
  comboId: z.string().uuid().optional().nullable(),
  appointmentId: z.string().uuid().optional().nullable(),
  quantity: z.number().int().min(1).default(1),
  unitPrice: z.number().min(0),
  discountPercent: z.number().min(0).max(100).default(0),
  discountAmount: z.number().min(0).default(0),
  total: z.number().min(0),
  staffId: z.string().uuid().optional().nullable(),
});

export const recordPaymentSchema = z.object({
  amount: z.number().min(0.01),
  paymentMethod: z.string().min(1).max(30),
  reference: z.string().max(200).optional().nullable(),
});

export const closeTabSchema = z.object({
  discountAmount: z.number().min(0).optional(),
  creditsApplied: z.number().min(0).optional(),
  depositApplied: z.number().min(0).optional(),
});

export const visitListQuerySchema = z.object({
  barbershopId: z.string().uuid().optional(),
  status: z.enum(["planned", "in_progress", "completed", "canceled"]).optional(),
});
