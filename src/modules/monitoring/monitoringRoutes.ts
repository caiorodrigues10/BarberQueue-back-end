import { FastifyInstance } from 'fastify';
import { authenticate } from '@/shared/infra/http/middlewares/authenticate';
import { authorize } from '@/shared/infra/http/middlewares/authorize';
import { checkSubscription } from '@/shared/infra/http/middlewares/checkSubscription';
import { setRlsContext } from '@/shared/infra/http/middlewares/setRlsContext';
import { getMonitoringDashboard } from './monitoringController';

export async function monitoringRoutes(app: FastifyInstance) {
  const ownerGuard = [
    authenticate,
    authorize(['MASTER_ADMIN', 'OWNER']),
    checkSubscription,
    setRlsContext,
  ];

  app.get(
    '/monitoring/dashboard',
    { preHandler: ownerGuard },
    getMonitoringDashboard,
  );
}
