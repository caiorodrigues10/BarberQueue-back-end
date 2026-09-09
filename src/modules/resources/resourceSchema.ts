import { z } from "zod";

export const resourceTypeMap = {
  room: "ROOM",
  chair: "CHAIR",
  equipment: "EQUIPMENT",
  vehicle: "VEHICLE",
  other: "OTHER",
} as const;

export const createResourceSchema = z.object({
  barbershopId: z.string().uuid(),
  name: z.string().min(1).max(100),
  type: z.enum(["room", "chair", "equipment", "vehicle", "other"]),
  description: z.string().max(500).optional().nullable(),
  isActive: z.boolean().default(true),
  maxConcurrent: z.number().int().min(1).max(100).default(1),
});

export const updateResourceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: z.enum(["room", "chair", "equipment", "vehicle", "other"]).optional(),
  description: z.string().max(500).optional().nullable(),
  isActive: z.boolean().optional(),
  maxConcurrent: z.number().int().min(1).max(100).optional(),
});

export const resourceListQuerySchema = z.object({
  type: z.enum(["room", "chair", "equipment", "vehicle", "other"]).optional(),
  isActive: z
    .string()
    .transform((v) => v === "true")
    .optional(),
});

export const createResourceBookingSchema = z.object({
  resourceId: z.string().uuid(),
  barbershopId: z.string().uuid(),
  appointmentId: z.string().uuid().optional().nullable(),
  staffId: z.string().uuid().optional().nullable(),
  startAt: z.string().datetime(),
  endTime: z.string().datetime(),
  notes: z.string().max(500).optional().nullable(),
});

export const updateResourceBookingSchema = z.object({
  startAt: z.string().datetime().optional(),
  endTime: z.string().datetime().optional(),
  staffId: z.string().uuid().optional().nullable(),
  appointmentId: z.string().uuid().optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

export const availabilityQuerySchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
});

export const resourceBookingsListQuerySchema = z.object({
  dateFrom: z.string().datetime(),
  dateTo: z.string().datetime(),
  resourceId: z.string().uuid().optional(),
  status: z
    .enum(["CONFIRMED", "CANCELED", "COMPLETED"])
    .optional(),
});
