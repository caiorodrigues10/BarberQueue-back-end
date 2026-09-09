import { injectable } from 'tsyringe';
import { prisma } from '@/libs/prismaClient';
import { AppError } from '@/shared/errors/AppError';

@injectable()
export class GetOnboardingProgressUseCase {
  async execute(barbershopId: string) {
    const barbershop = await prisma.barbershop.findUnique({
      where: { id: barbershopId },
      select: {
        onboardingStartedAt: true,
        onboardingCurrentStep: true,
        onboardingCompletedSteps: true,
        onboardingCompletedAt: true,
      },
    });
    if (!barbershop) throw new AppError('Salão não encontrado', 404);

    return {
      startedAt: barbershop.onboardingStartedAt,
      currentStep: barbershop.onboardingCurrentStep,
      completedSteps: barbershop.onboardingCompletedSteps,
      completedAt: barbershop.onboardingCompletedAt,
    };
  }
}
