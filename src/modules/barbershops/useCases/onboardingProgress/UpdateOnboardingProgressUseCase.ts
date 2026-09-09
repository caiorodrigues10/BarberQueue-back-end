import { injectable } from 'tsyringe';
import { prisma } from '@/libs/prismaClient';
import { AppError } from '@/shared/errors/AppError';

interface UpdateOnboardingProgressDTO {
  barbershopId: string;
  step: string;
  completedSteps: string[];
}

@injectable()
export class UpdateOnboardingProgressUseCase {
  async execute({ barbershopId, step, completedSteps }: UpdateOnboardingProgressDTO) {
    const barbershop = await prisma.barbershop.findUnique({ where: { id: barbershopId } });
    if (!barbershop) throw new AppError('Salão não encontrado', 404);

    const now = new Date();
    const startedAt = barbershop.onboardingStartedAt || now;

    const completedAt = completedSteps.length > 0 ? now : barbershop.onboardingCompletedAt;

    const updated = await prisma.barbershop.update({
      where: { id: barbershopId },
      data: {
        onboardingStartedAt: startedAt,
        onboardingCurrentStep: step,
        onboardingCompletedSteps: completedSteps,
        onboardingCompletedAt: completedAt,
      },
      select: {
        onboardingStartedAt: true,
        onboardingCurrentStep: true,
        onboardingCompletedSteps: true,
        onboardingCompletedAt: true,
      },
    });

    return updated;
  }
}
