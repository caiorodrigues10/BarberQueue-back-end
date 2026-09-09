import { FastifyRequest, FastifyReply } from "fastify";
import { createGoalSchema, updateGoalSchema, goalQuerySchema } from "./goalSchema";
import { GoalUseCases } from "./goalUseCases";
import { AppError } from "@/shared/errors/AppError";

export class GoalController {
  private useCases = new GoalUseCases();

  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createGoalSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);
    if (user.role !== "MASTER_ADMIN" && resolvedBarbershopId !== user.barbershopId) {
      throw new AppError("Access denied", 403);
    }

    const goal = await this.useCases.create(resolvedBarbershopId, body);

    reply.status(201).send({ success: true, data: goal });
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, goalId } = request.params as { barbershopId: string; goalId: string };
    const body = updateGoalSchema.parse(request.body);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const goal = await this.useCases.update(goalId, resolvedBarbershopId, body);

    reply.send({ success: true, data: goal });
  }

  async getProgress(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, goalId } = request.params as { barbershopId: string; goalId: string };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const progress = await this.useCases.getProgress(goalId, resolvedBarbershopId);

    reply.send({ success: true, data: progress });
  }

  async list(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = goalQuerySchema.parse(request.query);

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const goals = await this.useCases.list(resolvedBarbershopId, {
      professionalId: query.professionalId,
      period: query.period,
    });

    reply.send({ success: true, data: goals });
  }

  async getRanking(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const { metric, startDate, endDate } = request.query as {
      metric: string;
      startDate: string;
      endDate: string;
    };

    const resolvedBarbershopId =
      user.role === "MASTER_ADMIN"
        ? barbershopId
        : user.barbershopId ?? barbershopId;

    if (!resolvedBarbershopId) throw new AppError("barbershopId is required", 400);

    const ranking = await this.useCases.getRanking(
      resolvedBarbershopId,
      metric,
      new Date(startDate),
      new Date(endDate)
    );

    reply.send({ success: true, data: ranking });
  }
}
