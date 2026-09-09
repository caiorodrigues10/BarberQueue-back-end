import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { UpdateOnboardingProgressUseCase } from './UpdateOnboardingProgressUseCase';
import { GetOnboardingProgressUseCase } from './GetOnboardingProgressUseCase';
import { AppError } from '@/shared/errors/AppError';

export class OnboardingProgressController {
  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };
    const { step, completedSteps } = request.body as { step: string; completedSteps: string[] };
    const user = request.user!;

    if (user.role !== 'MASTER_ADMIN' && user.barbershopId !== id) {
      throw new AppError('Acesso negado', 403);
    }

    const useCase = container.resolve(UpdateOnboardingProgressUseCase);
    const result = await useCase.execute({
      barbershopId: id,
      step,
      completedSteps,
    });

    reply.send({ success: true, data: result });
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };
    const user = request.user!;

    if (user.role !== 'MASTER_ADMIN' && user.barbershopId !== id) {
      throw new AppError('Acesso negado', 403);
    }

    const useCase = container.resolve(GetOnboardingProgressUseCase);
    const result = await useCase.execute(id);

    reply.send({ success: true, data: result });
  }
}
