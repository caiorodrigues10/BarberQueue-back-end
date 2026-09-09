import { ResourceRepository } from "./resourceRepository";
import { AppError } from "@/shared/errors/AppError";
import type { z } from "zod";
import type {
  createResourceSchema,
  updateResourceSchema,
  createResourceBookingSchema,
  updateResourceBookingSchema,
  availabilityQuerySchema,
  resourceBookingsListQuerySchema,
} from "./resourceSchema";

type CreateResourceInput = z.infer<typeof createResourceSchema>;
type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
type CreateBookingInput = z.infer<typeof createResourceBookingSchema>;
type UpdateBookingInput = z.infer<typeof updateResourceBookingSchema>;
type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;
type BookingsListQuery = z.infer<typeof resourceBookingsListQuerySchema>;

export class ResourceUseCases {
  private repo = new ResourceRepository();

  // ─── Resource operations ───────────────────────────────────

  async listResources(barbershopId: string, query: { type?: string; isActive?: boolean }) {
    return this.repo.listByBarbershop(barbershopId, query.type, query.isActive);
  }

  async getResource(id: string, barbershopId: string) {
    const resource = await this.repo.findById(id);
    if (!resource) throw new AppError("Recurso não encontrado", 404);
    if (resource.barbershopId !== barbershopId) throw new AppError("Acesso negado", 403);
    return resource;
  }

  async createResource(barbershopId: string, data: CreateResourceInput) {
    return this.repo.create({ ...data, barbershopId });
  }

  async updateResource(id: string, barbershopId: string, data: UpdateResourceInput) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("Recurso não encontrado", 404);
    if (existing.barbershopId !== barbershopId) {
      throw new AppError("Acesso negado", 403);
    }
    return this.repo.update(id, data);
  }

  async deleteResource(id: string, barbershopId: string) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new AppError("Recurso não encontrado", 404);
    if (existing.barbershopId !== barbershopId) {
      throw new AppError("Acesso negado", 403);
    }
    return this.repo.delete(id);
  }

  // ─── Booking operations ────────────────────────────────────

  async listBookings(barbershopId: string, query: BookingsListQuery) {
    const dateFrom = new Date(query.dateFrom);
    const dateTo = new Date(query.dateTo);
    return this.repo.listBookingsByBarbershop(
      barbershopId,
      dateFrom,
      dateTo,
      query.resourceId,
      query.status
    );
  }

  async createBooking(barbershopId: string, data: CreateBookingInput) {
    const resource = await this.repo.findById(data.resourceId);
    if (!resource) throw new AppError("Recurso não encontrado", 404);
    if (resource.barbershopId !== barbershopId) {
      throw new AppError("Recurso não pertence a esta barbearia", 400);
    }

    const startAt = new Date(data.startAt);
    const endTime = new Date(data.endTime);
    if (endTime <= startAt) {
      throw new AppError("Horário de término deve ser posterior ao início", 400);
    }

    // Check capacity
    const overlapping = await this.repo.countOverlappingBookings(data.resourceId, startAt, endTime);
    if (overlapping >= resource.maxConcurrent) {
      throw new AppError("Recurso não disponível no horário solicitado", 409, {
        code: "RESOURCE_CONFLICT",
        resourceId: data.resourceId,
        maxConcurrent: resource.maxConcurrent,
        currentBookings: overlapping,
      });
    }

    return this.repo.createBooking(data);
  }

  async updateBooking(
    id: string,
    barbershopId: string,
    data: UpdateBookingInput
  ) {
    const existing = await this.repo.findBookingById(id);
    if (!existing) throw new AppError("Reserva não encontrada", 404);
    if (existing.barbershopId !== barbershopId) {
      throw new AppError("Acesso negado", 403);
    }

    const startAt = data.startAt ? new Date(data.startAt) : existing.startAt;
    const endTime = data.endTime ? new Date(data.endTime) : existing.endTime;

    if (endTime <= startAt) {
      throw new AppError("Horário de término deve ser posterior ao início", 400);
    }

    // Check capacity if time changed
    if (data.startAt || data.endTime) {
      const overlapping = await this.repo.countOverlappingBookings(
        existing.resourceId,
        startAt,
        endTime,
        id
      );
      const resource = await this.repo.findById(existing.resourceId);
      if (resource && overlapping >= resource.maxConcurrent) {
        throw new AppError("Recurso não disponível no horário solicitado", 409, {
          code: "RESOURCE_CONFLICT",
          resourceId: existing.resourceId,
          maxConcurrent: resource.maxConcurrent,
          currentBookings: overlapping,
        });
      }
    }

    return this.repo.updateBooking(id, data);
  }

  async cancelBooking(id: string, barbershopId: string) {
    const existing = await this.repo.findBookingById(id);
    if (!existing) throw new AppError("Reserva não encontrada", 404);
    if (existing.barbershopId !== barbershopId) {
      throw new AppError("Acesso negado", 403);
    }
    return this.repo.cancelBooking(id);
  }

  // ─── Availability ──────────────────────────────────────────

  async checkAvailability(resourceId: string, barbershopId: string, query: AvailabilityQuery) {
    const resource = await this.repo.getResourceWithBookings(resourceId);
    if (!resource) throw new AppError("Recurso não encontrado", 404);
    if (resource.barbershopId !== barbershopId) {
      throw new AppError("Acesso negado", 403);
    }

    const dateFrom = new Date(query.dateFrom);
    const dateTo = new Date(query.dateTo);

    const bookings = resource.bookings.filter((b: { startAt: Date; endTime: Date }) => {
      const bStart = new Date(b.startAt);
      const bEnd = new Date(b.endTime);
      return bStart < dateTo && bEnd > dateFrom;
    });

    return {
      resourceId: resource.id,
      resourceName: resource.name,
      resourceType: resource.type,
      maxConcurrent: resource.maxConcurrent,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      bookings: bookings.map((b: { id: string; startAt: Date; endTime: Date; status: string; staffId: string | null; appointmentId: string | null }) => ({
        id: b.id,
        startAt: b.startAt,
        endTime: b.endTime,
        status: b.status,
        staffId: b.staffId,
        appointmentId: b.appointmentId,
      })),
    };
  }
}
