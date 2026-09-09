import { FastifyInstance } from 'fastify';
import { authenticate } from '@/shared/infra/http/middlewares/authenticate';
import { authorize } from '@/shared/infra/http/middlewares/authorize';
import { checkSubscription } from '@/shared/infra/http/middlewares/checkSubscription';
import { checkDashboardAccess } from '@/shared/infra/http/middlewares/checkDashboardAccess';
import { setRlsContext } from '@/shared/infra/http/middlewares/setRlsContext';
import { AnalyticsController } from '../analyticsController';

export async function analyticsRoutes(app: FastifyInstance) {
  const controller = new AnalyticsController();

  const ownerRoles = ['MASTER_ADMIN', 'OWNER'];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  app.get(
    '/barbershops/:barbershopId/analytics/enhanced-forecast',
    { preHandler: ownerGuard },
    controller.enhancedForecast.bind(controller)
  );

  app.get(
    '/barbershops/:barbershopId/analytics/recommendations',
    { preHandler: ownerGuard },
    controller.recommendations.bind(controller)
  );

  app.post(
    '/barbershops/:barbershopId/analytics/recommendations/:id/dismiss',
    { preHandler: ownerGuard },
    controller.dismissRecommendation.bind(controller)
  );
}