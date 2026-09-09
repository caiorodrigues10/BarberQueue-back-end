import { FastifyRequest, FastifyReply } from "fastify";
import {
  createResourceSchema,
  updateResourceSchema,
  resourceListQuerySchema,
  createResourceBookingSchema,
  updateResourceBookingSchema,
  availabilityQuerySchema,
  resourceBookingsListQuerySchema,
} from "./resourceSchema";
import { ResourceUseCases } from "./resourceUseCases";
import { AppError } from "@/shared/errors/AppError";

export class ResourceController {
  private useCases = new ResourceUseCases();

  // ─── Resource handlers ─────────────────────────────────────

  async listResources(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = resourceListQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const resources = await this.useCases.listResources(resolvedBarbershopId, {
      type: query.type,
      isActive: query.isActive,
    });
    reply.send({ success: true, data: resources });
  }

  async getResource(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const resource = await this.useCases.getResource(id, barbershopId);
    if (resource.barbershopId !== resolvedBarbershopId) {
      throw new AppError("Acesso negado", 403);
    }
    reply.send({ success: true, data: resource });
  }

  async createResource(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createResourceSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? (body as any).barbershopId ?? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const resource = await this.useCases.createResource(resolvedBarbershopId, {
      ...body,
      barbershopId: resolvedBarbershopId,
    });
    reply.status(201).send({ success: true, data: resource });
  }

  async updateResource(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateResourceSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const resource = await this.useCases.updateResource(id, resolvedBarbershopId, body);
    reply.send({ success: true, data: resource });
  }

  async deleteResource(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    await this.useCases.deleteResource(id, resolvedBarbershopId);
    reply.send({ success: true, message: "Recurso removido" });
  }

  // ─── Availability ──────────────────────────────────────────

  async checkAvailability(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const query = availabilityQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const availability = await this.useCases.checkAvailability(id, resolvedBarbershopId, query);
    reply.send({ success: true, data: availability });
  }

  // ─── Booking handlers ──────────────────────────────────────

  async listBookings(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = resourceBookingsListQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const bookings = await this.useCases.listBookings(resolvedBarbershopId, query);
    reply.send({ success: true, data: bookings });
  }

  async createBooking(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createResourceBookingSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? (body as any).barbershopId ?? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const booking = await this.useCases.createBooking(resolvedBarbershopId, {
      ...body,
      barbershopId: resolvedBarbershopId,
    });
    reply.status(201).send({ success: true, data: booking });
  }

  async updateBooking(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, bookingId } = request.params as {
      barbershopId: string;
      bookingId: string;
    };
    const body = updateResourceBookingSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const booking = await this.useCases.updateBooking(bookingId, resolvedBarbershopId, body);
    reply.send({ success: true, data: booking });
  }

  async cancelBooking(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, bookingId } = request.params as {
      barbershopId: string;
      bookingId: string;
    };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    await this.useCases.cancelBooking(bookingId, resolvedBarbershopId);
    reply.send({ success: true, message: "Reserva cancelada" });
  }
}
