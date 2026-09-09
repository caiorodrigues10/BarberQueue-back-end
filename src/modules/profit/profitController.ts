import { FastifyRequest, FastifyReply } from "fastify";
import {
  profitSettingsSchema,
  profitPeriodQuerySchema,
  profitComputeSchema,
  profitTrendQuerySchema,
  profitByServiceQuerySchema,
  profitByStaffQuerySchema,
} from "./profitSchema";
import { ProfitUseCases } from "./profitUseCases";
import { AppError } from "@/shared/errors/AppError";

export class ProfitController {
  private useCases = new ProfitUseCases();

  async getSettings(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const settings = await this.useCases.getSettings(resolvedBarbershopId);
    reply.send({ success: true, data: settings });
  }

  async updateSettings(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = profitSettingsSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const settings = await this.useCases.updateSettings(resolvedBarbershopId, body);
    reply.send({ success: true, data: settings });
  }

  async getPeriodProfit(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, period } = request.params as { barbershopId: string; period: string };

    profitPeriodQuerySchema.parse({ period });

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.getPeriodProfit(resolvedBarbershopId, period);
    reply.send({ success: true, data });
  }

  async computePeriod(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = profitComputeSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.computePeriod(resolvedBarbershopId, body.period);
    reply.send({ success: true, data });
  }

  async getTrend(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = profitTrendQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.getTrend(resolvedBarbershopId, query.months);
    reply.send({ success: true, data });
  }

  async getByService(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = profitByServiceQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.getByService(resolvedBarbershopId, query.period);
    reply.send({ success: true, data });
  }

  async getByStaff(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = profitByStaffQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.getByStaff(resolvedBarbershopId, query.period);
    reply.send({ success: true, data });
  }
}
