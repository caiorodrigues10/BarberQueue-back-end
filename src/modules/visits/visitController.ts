import { FastifyRequest, FastifyReply } from "fastify";
import {
  createVisitSchema,
  updateVisitStatusSchema,
  addItemSchema,
  recordPaymentSchema,
  closeTabSchema,
  visitListQuerySchema,
} from "./visitSchema";
import { VisitUseCases } from "./visitUseCases";
import { AppError } from "@/shared/errors/AppError";

export class VisitController {
  private useCases = new VisitUseCases();

  private resolveBarbershopId(user: { role: string; barbershopId?: string }, barbershopId?: string) {
    if (user.role === "MASTER_ADMIN") return barbershopId;
    return user.barbershopId ?? barbershopId;
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = visitListQuerySchema.parse(request.query);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.listByBarbershop(resolved, query);
    reply.send({ success: true, data });
  }

  async getDetail(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.getById(id);
    reply.send({ success: true, data });
  }

  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createVisitSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.create(resolved, { ...body, barbershopId: resolved });
    reply.status(201).send({ success: true, data });
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateVisitStatusSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.updateStatus(id, resolved, body.status);
    reply.send({ success: true, data });
  }

  async addItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = addItemSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.addItem(id, resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async updateItemStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, itemId } = request.params as { barbershopId: string; itemId: string };
    const body = (request.body ?? {}) as { status: string };

    if (!body.status) throw new AppError("status is required", 400);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.updateItemStatus(itemId, resolved, body.status);
    reply.send({ success: true, data });
  }

  async removeItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, itemId } = request.params as { barbershopId: string; itemId: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    await this.useCases.removeItem(itemId, resolved);
    reply.send({ success: true, message: "Item removido" });
  }

  async recordPayment(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, tabId } = request.params as { barbershopId: string; tabId: string };
    const body = recordPaymentSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.recordPayment(tabId, resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async closeTab(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, tabId } = request.params as { barbershopId: string; tabId: string };
    const body = request.body ? closeTabSchema.parse(request.body) : undefined;

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.closeTab(tabId, resolved, user.id, body);
    reply.send({ success: true, data });
  }
}
