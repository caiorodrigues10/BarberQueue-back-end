import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '@/libs/prismaClient';
import { getRedisConnection } from '@/shared/infra/queue/redisConnection';

function hoursAgo(h: number): Date {
  return new Date(Date.now() - h * 3600_000);
}
function minutesAgo(m: number): Date {
  return new Date(Date.now() - m * 60_000);
}

export async function getMonitoringDashboard(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const barbershopId = (request.user as any).barbershopId;

  const [pendingPayments, pendingFiados, deadJobs, recentErrors] =
    await Promise.all([
      prisma.payment.count({
        where: {
          barbershopId,
          status: 'pending',
          createdAt: { lt: hoursAgo(24) },
        },
      }),
      prisma.fiado.count({
        where: {
          barbershopId,
          status: { in: ['PENDING', 'PARTIAL'] },
        },
      }),
      getRedisConnection()
        .zrange('bull:jobs:completed', '0', '-1')
        .catch(() => [] as string[]),
      prisma.errorLog.count({
        where: {
          path: { startsWith: '/api' },
          createdAt: { gte: minutesAgo(60) },
        },
      }),
    ]);

  return reply.send({
    pendingPayments,
    pendingFiados,
    deadJobs,
    recentErrors,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
