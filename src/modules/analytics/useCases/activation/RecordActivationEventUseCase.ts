import { injectable } from 'tsyringe';
import { prisma } from '@/libs/prismaClient';
import { AppError } from '@/shared/errors/AppError';

interface RecordActivationEventDTO {
  barbershopId: string;
  event: string;
  metadata?: Record<string, unknown>;
}

@injectable()
export class RecordActivationEventUseCase {
  async execute({ barbershopId, event, metadata }: RecordActivationEventDTO) {
    const barbershop = await prisma.barbershop.findUnique({ where: { id: barbershopId }, select: { id: true } });
    if (!barbershop) throw new AppError('Salão não encontrado', 404);

    const metric = await prisma.activationMetric.create({
      data: {
        barbershopId,
        event,
        metadata: metadata ?? undefined,
      },
    });

    return metric;
  }
}
