import { FastifyRequest, FastifyReply } from "fastify";
import {
  createWaitlistEntrySchema,
  updateWaitlistEntrySchema,
  createWaitlistOfferSchema,
  publicCreateWaitlistEntrySchema,
  waitlistEntryListQuerySchema,
} from "./waitlistSchema";
import { WaitlistUseCases } from "./waitlistUseCases";
import { AppError } from "@/shared/errors/AppError";

export class WaitlistController {
  private useCases = new WaitlistUseCases();

  async listEntries(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = waitlistEntryListQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const result = await this.useCases.listWaitlistEntries(resolvedBarbershopId, query);
    reply.send({ success: true, data: result });
  }

  async createEntry(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createWaitlistEntrySchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? (body as any).barbershopId ?? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const entry = await this.useCases.createWaitlistEntry(resolvedBarbershopId, {
      ...body,
      barbershopId: resolvedBarbershopId,
    });

    reply.status(201).send({ success: true, data: entry });
  }

  async updateEntry(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateWaitlistEntrySchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const entry = await this.useCases.updateWaitlistEntry(resolvedBarbershopId, id, body);
    reply.send({ success: true, data: entry });
  }

  async deleteEntry(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    await this.useCases.deleteWaitlistEntry(resolvedBarbershopId, id);
    reply.send({ success: true });
  }

  async offerSlot(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = createWaitlistOfferSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const offer = await this.useCases.offerSlot(resolvedBarbershopId, id, {
      offeredDate: body.offeredDate,
      offeredTime: body.offeredTime,
      staffId: body.staffId,
    });

    reply.status(201).send({ success: true, data: offer });
  }

  async publicCreateEntry(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = publicCreateWaitlistEntrySchema.parse(request.body);

    const entry = await this.useCases.createWaitlistEntry(body.barbershopId, {
      ...body,
      barbershopId: body.barbershopId,
    });

    reply.status(201).send({ success: true, data: entry });
  }

  async getOfferByToken(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { token } = request.query as { token: string };
    if (!token) throw new AppError("token is required", 400);

    const { WaitlistRepository } = await import("./waitlistRepository");
    const repo = new WaitlistRepository();
    const offer = await repo.getOfferByToken(token);
    if (!offer) throw new AppError("Offer not found", 404);

    reply.send({ success: true, data: offer });
  }

  async acceptOffer(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { token } = request.body as { token: string };
    if (!token) throw new AppError("token is required", 400);

    const result = await this.useCases.acceptOffer(token);
    reply.send({ success: true, data: result });
  }

  async declineOffer(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { token } = request.body as { token: string };
    if (!token) throw new AppError("token is required", 400);

    const result = await this.useCases.declineOffer(token);
    reply.send({ success: true, data: result });
  }
}
