import { injectable } from 'tsyringe';
import { prisma } from '@/libs/prismaClient';
import { AppError } from '@/shared/errors/AppError';

@injectable()
export class ListActivationMetricsUseCase {
  async execute(barbershopId: string) {
    const barbershop = await prisma.barbershop.findUnique({ where: { id: barbershopId }, select: { id: true } });
    if (!barbershop) throw new AppError('Salão não encontrado', 404);

    const metrics = await prisma.activationMetric.findMany({
      where: { barbershopId },
      orderBy: { createdAt: 'desc' },
    });

    return metrics;
  }
}
