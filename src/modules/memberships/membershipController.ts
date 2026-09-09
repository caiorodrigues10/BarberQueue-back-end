import { FastifyRequest, FastifyReply } from "fastify";
import {
  createMembershipPlanSchema,
  updateMembershipPlanSchema,
  createMembershipSchema,
  recordPaymentSchema,
  useBenefitSchema,
  membershipListQuerySchema,
} from "./membershipSchema";
import { MembershipUseCases } from "./membershipUseCases";
import { AppError } from "@/shared/errors/AppError";

export class MembershipController {
  private useCases = new MembershipUseCases();

  async listPlans(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const plans = await this.useCases.listPlans(resolvedBarbershopId);
    reply.send({ success: true, data: plans });
  }

  async createPlan(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createMembershipPlanSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const plan = await this.useCases.createPlan(resolvedBarbershopId, body);
    reply.status(201).send({ success: true, data: plan });
  }

  async updatePlan(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, planId } = request.params as { barbershopId: string; planId: string };
    const body = updateMembershipPlanSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const plan = await this.useCases.updatePlan(resolvedBarbershopId, planId, body);
    reply.send({ success: true, data: plan });
  }

  async listMemberships(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = membershipListQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const { MembershipRepository } = await import("./membershipRepository");
    const repo = new MembershipRepository();
    const result = await repo.listMemberships(resolvedBarbershopId, query);
    reply.send({ success: true, data: result });
  }

  async createMembership(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createMembershipSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.createMembership(resolvedBarbershopId, body);
    reply.status(201).send({ success: true, data: membership });
  }

  async getMembershipDetails(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.getMembershipDetails(resolvedBarbershopId, id);
    reply.send({ success: true, data: membership });
  }

  async activateMembership(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.activateMembership(resolvedBarbershopId, id);
    reply.send({ success: true, data: membership });
  }

  async pauseMembership(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.pauseMembership(resolvedBarbershopId, id);
    reply.send({ success: true, data: membership });
  }

  async resumeMembership(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.resumeMembership(resolvedBarbershopId, id);
    reply.send({ success: true, data: membership });
  }

  async cancelMembership(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const membership = await this.useCases.cancelMembership(resolvedBarbershopId, id);
    reply.send({ success: true, data: membership });
  }

  async recordPayment(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id, cycleId } = request.params as {
      barbershopId: string;
      id: string;
      cycleId: string;
    };
    const body = recordPaymentSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const cycle = await this.useCases.recordPayment(resolvedBarbershopId, id, cycleId, body);
    reply.send({ success: true, data: cycle });
  }

  async useBenefit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id, benefitId } = request.params as {
      barbershopId: string;
      id: string;
      benefitId: string;
    };
    const body = useBenefitSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const usage = await this.useCases.useBenefit(resolvedBarbershopId, id, benefitId, body.appointmentId);
    reply.status(201).send({ success: true, data: usage });
  }

  async reverseBenefit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id, benefitId } = request.params as {
      barbershopId: string;
      id: string;
      benefitId: string;
    };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const usage = await this.useCases.reverseBenefit(resolvedBarbershopId, benefitId);
    reply.send({ success: true, data: usage });
  }
}
