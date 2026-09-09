import { FastifyRequest, FastifyReply } from "fastify";
import {
  purchaseGiftCardSchema,
  redeemGiftCardSchema,
  giftCardListQuerySchema,
} from "./giftCardSchema";
import { GiftCardUseCases } from "./giftCardUseCases";
import { AppError } from "@/shared/errors/AppError";

export class GiftCardController {
  private useCases = new GiftCardUseCases();

  async purchase(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId } = request.params as { barbershopId: string };
    const body = purchaseGiftCardSchema.parse({ ...(request.body as object), barbershopId });
    const card = await this.useCases.purchase(barbershopId, body);
    reply.status(201).send({ success: true, data: card });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId } = request.params as { barbershopId: string };
    const query = giftCardListQuerySchema.parse(request.query);
    const cards = await this.useCases.list(barbershopId, query);
    reply.send({ success: true, data: cards });
  }

  async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const card = await this.useCases.getById(id, barbershopId);
    reply.send({ success: true, data: card });
  }

  async lookupByCode(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId } = request.params as { barbershopId: string };
    const { code } = request.query as { code?: string };
    if (!code) throw new AppError("Parâmetro 'code' é obrigatório", 400);
    const card = await this.useCases.lookupByCode(code, barbershopId);
    reply.send({ success: true, data: card });
  }

  async redeem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = redeemGiftCardSchema.parse(request.body);
    const card = await this.useCases.redeem(id, barbershopId, body);
    reply.send({ success: true, data: card });
  }

  async cancel(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const card = await this.useCases.cancel(id, barbershopId);
    reply.send({ success: true, data: card });
  }

  async getUsages(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const usages = await this.useCases.getUsages(id, barbershopId);
    reply.send({ success: true, data: usages });
  }
}
