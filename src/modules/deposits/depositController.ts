import { FastifyRequest, FastifyReply } from "fastify";
import {
  updateDepositPolicySchema,
  confirmDepositSchema,
  depositListQuerySchema,
} from "./depositPolicySchema";
import { DepositUseCases } from "./depositUseCases";
import { AppError } from "@/shared/errors/AppError";

export class DepositController {
  private useCases = new DepositUseCases();

  async getDepositPolicy(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const policy = await this.useCases.getDepositPolicy(resolvedBarbershopId);
    reply.send({ success: true, data: policy });
  }

  async updateDepositPolicy(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = updateDepositPolicySchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const policy = await this.useCases.updateDepositPolicy(resolvedBarbershopId, body);
    reply.send({ success: true, data: policy });
  }

  async getAppointmentDeposit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { appointmentId } = request.params as { appointmentId: string };
    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const deposit = await this.useCases.getAppointmentDeposit(appointmentId);
    reply.send({ success: true, data: deposit });
  }

  async confirmDeposit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { appointmentId } = request.params as { appointmentId: string };
    const body = confirmDepositSchema.parse(request.body);

    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const deposit = await this.useCases.confirmAppointmentDeposit(appointmentId, user.id, body);
    reply.send({ success: true, data: deposit });
  }

  async waiveDeposit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { appointmentId } = request.params as { appointmentId: string };

    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const deposit = await this.useCases.waiveAppointmentDeposit(appointmentId, user.id);
    reply.send({ success: true, data: deposit });
  }

  async rejectDeposit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { appointmentId } = request.params as { appointmentId: string };

    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const deposit = await this.useCases.rejectAppointmentDeposit(appointmentId, user.id);
    reply.send({ success: true, data: deposit });
  }

  async refundDeposit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { appointmentId } = request.params as { appointmentId: string };

    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const deposit = await this.useCases.refundAppointmentDeposit(appointmentId, user.id);
    reply.send({ success: true, data: deposit });
  }

  async listDeposits(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = depositListQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const result = await this.useCases.listDeposits(resolvedBarbershopId, query);
    reply.send({ success: true, data: result });
  }
}
