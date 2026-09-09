import { FastifyRequest, FastifyReply } from "fastify";
import {
  requestOtpSchema,
  verifyOtpSchema,
  requestLinkSchema,
  confirmLinkSchema,
  rejectLinkSchema,
  createCareTemplateSchema,
  updateCareTemplateSchema,
  sendCareInstructionSchema,
  clientPortalQuerySchema,
} from "./clientPortalSchema";
import { ClientPortalRepositoryInstance } from "./clientPortalUseCases";
import { AppError } from "@/shared/errors/AppError";

export class ClientPortalController {
  private useCases = new ClientPortalRepositoryInstance();

  // ─── OTP Auth ────────────────────────────────────────────────
  async requestOtp(request: FastifyRequest, reply: FastifyReply) {
    const body = requestOtpSchema.parse(request.body);
    const ip = request.ip;
    const result = await this.useCases.requestOtp(body.phone, body.name, ip);

    reply.send({
      success: true,
      data: {
        expiresAt: result.expiresAt,
        identityId: result.identityId,
      },
    });
  }

  async verifyOtp(request: FastifyRequest, reply: FastifyReply) {
    const body = verifyOtpSchema.parse(request.body);
    const result = await this.useCases.verifyOtp(body.phone, body.code);

    reply.send({ success: true, data: result });
  }

  // ─── Salon Links ─────────────────────────────────────────────
  async requestLink(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as any;
    const identityId = user.identityId;
    if (!identityId) throw new AppError("identityId required", 400);

    const body = requestLinkSchema.parse(request.body);
    const link = await this.useCases.requestLink(
      identityId,
      body.barbershopId,
      body.salonClientId
    );

    reply.status(201).send({ success: true, data: link });
  }

  async confirmLink(request: FastifyRequest, reply: FastifyReply) {
    const { linkId } = request.params as { linkId: string };
    const body = confirmLinkSchema.parse(request.body ?? {});
    const user = request.user!;

    const link = await this.useCases.confirmLink(
      linkId,
      body.confirmedById ?? user.id
    );

    reply.send({ success: true, data: link });
  }

  async rejectLink(request: FastifyRequest, reply: FastifyReply) {
    const { linkId } = request.params as { linkId: string };
    const body = rejectLinkSchema.parse(request.body ?? {});
    const user = request.user!;

    const link = await this.useCases.rejectLink(
      linkId,
      body.rejectedById ?? user.id,
      body.reason
    );

    reply.send({ success: true, data: link });
  }

  async revokeLink(request: FastifyRequest, reply: FastifyReply) {
    const { linkId } = request.params as { linkId: string };
    const link = await this.useCases.revokeLink(linkId);
    reply.send({ success: true, data: link });
  }

  async listPendingLinks(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const links = await this.useCases.listPendingLinks(barbershopId);
    reply.send({ success: true, data: links });
  }

  async listAllLinks(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const links = await this.useCases.listAllLinks(barbershopId);
    reply.send({ success: true, data: links });
  }

  async listMyLinks(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as any;
    const identityId = user.identityId;
    if (!identityId) throw new AppError("identityId required", 400);

    const links = await this.useCases.listMyLinks(identityId);
    reply.send({ success: true, data: links });
  }

  // ─── Care Templates ──────────────────────────────────────────
  async createCareTemplate(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const body = createCareTemplateSchema.parse(request.body);
    const template = await this.useCases.createCareTemplate(barbershopId, body);

    reply.status(201).send({ success: true, data: template });
  }

  async updateCareTemplate(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const { id } = request.params as { id: string };
    const body = updateCareTemplateSchema.parse(request.body);
    const template = await this.useCases.updateCareTemplate(id, barbershopId, body);

    reply.send({ success: true, data: template });
  }

  async listCareTemplates(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const templates = await this.useCases.listCareTemplates(barbershopId);
    reply.send({ success: true, data: templates });
  }

  async deleteCareTemplate(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const { id } = request.params as { id: string };
    await this.useCases.deleteCareTemplate(id, barbershopId);

    reply.send({ success: true, message: "Template removido" });
  }

  // ─── Care Instructions ───────────────────────────────────────
  async sendCareInstruction(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const body = sendCareInstructionSchema.parse(request.body);
    const instruction = await this.useCases.sendCareInstruction(barbershopId, {
      ...body,
      sentById: user.id,
    });

    reply.status(201).send({ success: true, data: instruction });
  }

  async listCareInstructions(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const barbershopId = user.barbershopId;
    if (!barbershopId) throw new AppError("barbershopId required", 400);

    const query = clientPortalQuerySchema.parse(request.query);
    const instructions = await this.useCases.listCareInstructions(barbershopId);

    reply.send({ success: true, data: instructions });
  }

  async markCareInstructionRead(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.useCases.markCareInstructionRead(id);
    reply.send({ success: true, message: "Marcado como lido" });
  }

  async listMyCareInstructions(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as any;
    const identityId = user.identityId;
    if (!identityId) throw new AppError("identityId required", 400);

    const barbershopId = (request.query as any)?.barbershopId;
    const instructions = await this.useCases.listMyCareInstructions(
      identityId,
      barbershopId
    );

    reply.send({ success: true, data: instructions });
  }

  // ─── Portal Dashboard ────────────────────────────────────────
  async getPortalDashboard(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as any;
    const identityId = user.identityId;
    if (!identityId) throw new AppError("identityId required", 400);

    const { barbershopId } = request.params as { barbershopId: string };
    const dashboard = await this.useCases.getPortalDashboard(
      barbershopId,
      identityId
    );

    reply.send({ success: true, data: dashboard });
  }
}
