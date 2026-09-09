import { prisma } from "@/libs/prismaClient";
import { AppError } from "@/shared/errors/AppError";
import {
  createResourceSchema,
  updateResourceSchema,
  createResourceBookingSchema,
  updateResourceBookingSchema,
  resourceTypeMap,
} from "./resourceSchema";
import type { z } from "zod";

type CreateResourceInput = z.infer<typeof createResourceSchema>;
type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
type CreateBookingInput = z.infer<typeof createResourceBookingSchema>;
type UpdateBookingInput = z.infer<typeof updateResourceBookingSchema>;

const resourceSelect = {
  id: true,
  barbershopId: true,
  name: true,
  type: true,
  description: true,
  isActive: true,
  maxConcurrent: true,
  createdAt: true,
  updatedAt: true,
  barbershop: { select: { id: true, name: true } },
} as const;

const bookingSelect = {
  id: true,
  resourceId: true,
  barbershopId: true,
  appointmentId: true,
  staffId: true,
  startAt: true,
  endTime: true,
  status: true,
  notes: true,
  createdAt: true,
  resource: { select: { id: true, name: true, type: true } },
  staff: { select: { id: true, name: true } },
  appointment: { select: { id: true, customerName: true, date: true, time: true } },
} as const;

export class ResourceRepository {
  // ─── Resource CRUD ─────────────────────────────────────────

  async listByBarbershop(barbershopId: string, type?: string, isActive?: boolean) {
    return prisma.resource.findMany({
      where: {
        barbershopId,
        ...(type ? { type: type.toUpperCase() as any } : {}),
        ...(isActive !== undefined ? { isActive } : {}),
      },
      select: resourceSelect,
      orderBy: { name: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.resource.findUnique({
      where: { id },
      select: resourceSelect,
    });
  }

  async create(data: CreateResourceInput) {
    return prisma.resource.create({
      data: {
        barbershopId: data.barbershopId,
        name: data.name,
        type: resourceTypeMap[data.type],
        description: data.description ?? null,
        isActive: data.isActive ?? true,
        maxConcurrent: data.maxConcurrent ?? 1,
      },
      select: resourceSelect,
    });
  }

  async update(id: string, data: UpdateResourceInput) {
    const existing = await prisma.resource.findUnique({ where: { id } });
    if (!existing) throw new AppError("Recurso não encontrado", 404);

    return prisma.resource.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.type !== undefined && { type: resourceTypeMap[data.type] }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.maxConcurrent !== undefined && { maxConcurrent: data.maxConcurrent }),
      },
      select: resourceSelect,
    });
  }

  async delete(id: string) {
    const existing = await prisma.resource.findUnique({ where: { id } });
    if (!existing) throw new AppError("Recurso não encontrado", 404);

    await prisma.resource.delete({ where: { id } });
  }

  // ─── Booking CRUD ──────────────────────────────────────────

  async listBookingsByBarbershop(
    barbershopId: string,
    dateFrom: Date,
    dateTo: Date,
    resourceId?: string,
    status?: string
  ) {
    return prisma.resourceBooking.findMany({
      where: {
        barbershopId,
        startAt: { gte: dateFrom },
        endTime: { lte: dateTo },
        ...(resourceId ? { resourceId } : {}),
        ...(status ? { status: status.toUpperCase() as any } : {}),
      },
      select: bookingSelect,
      orderBy: { startAt: "asc" },
    });
  }

  async findBookingById(id: string) {
    return prisma.resourceBooking.findUnique({
      where: { id },
      select: bookingSelect,
    });
  }

  async createBooking(data: CreateBookingInput) {
    return prisma.resourceBooking.create({
      data: {
        resourceId: data.resourceId,
        barbershopId: data.barbershopId,
        appointmentId: data.appointmentId ?? null,
        staffId: data.staffId ?? null,
        startAt: new Date(data.startAt),
        endTime: new Date(data.endTime),
        notes: data.notes ?? null,
      },
      select: bookingSelect,
    });
  }

  async updateBooking(id: string, data: UpdateBookingInput) {
    const existing = await prisma.resourceBooking.findUnique({ where: { id } });
    if (!existing) throw new AppError("Reserva não encontrada", 404);

    return prisma.resourceBooking.update({
      where: { id },
      data: {
        ...(data.startAt !== undefined && { startAt: new Date(data.startAt) }),
        ...(data.endTime !== undefined && { endTime: new Date(data.endTime) }),
        ...(data.staffId !== undefined && { staffId: data.staffId }),
        ...(data.appointmentId !== undefined && { appointmentId: data.appointmentId }),
        ...(data.notes !== undefined && { notes: data.notes }),
      },
      select: bookingSelect,
    });
  }

  async cancelBooking(id: string) {
    const existing = await prisma.resourceBooking.findUnique({ where: { id } });
    if (!existing) throw new AppError("Reserva não encontrada", 404);
    if (existing.status === "CANCELED") throw new AppError("Reserva já cancelada", 400);

    return prisma.resourceBooking.update({
      where: { id },
      data: { status: "CANCELED" },
      select: bookingSelect,
    });
  }

  // ─── Availability check ────────────────────────────────────

  async countOverlappingBookings(
    resourceId: string,
    startAt: Date,
    endTime: Date,
    excludeBookingId?: string
  ) {
    return prisma.resourceBooking.count({
      where: {
        resourceId,
        status: { not: "CANCELED" },
        ...(excludeBookingId ? { id: { not: excludeBookingId } } : {}),
        startAt: { lt: endTime },
        endTime: { gt: startAt },
      },
    });
  }

  async getResourceWithBookings(resourceId: string) {
    return prisma.resource.findUnique({
      where: { id: resourceId },
      include: {
        bookings: {
          where: { status: { not: "CANCELED" } },
          select: {
            id: true,
            startAt: true,
            endTime: true,
            status: true,
            staffId: true,
            appointmentId: true,
          },
          orderBy: { startAt: "asc" },
        },
      },
    });
  }
}
