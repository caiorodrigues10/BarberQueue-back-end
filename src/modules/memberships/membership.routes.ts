import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { MembershipController } from "./membershipController";

export async function membershipRoutes(app: FastifyInstance) {
  const controller = new MembershipController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // Plans
  app.get(
    "/barbershops/:barbershopId/membership-plans",
    { preHandler: ownerGuard },
    controller.listPlans.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/membership-plans",
    { preHandler: ownerGuard },
    controller.createPlan.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/membership-plans/:planId",
    { preHandler: ownerGuard },
    controller.updatePlan.bind(controller)
  );

  // Memberships
  app.get(
    "/barbershops/:barbershopId/client-memberships",
    { preHandler: ownerGuard },
    controller.listMemberships.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-memberships",
    { preHandler: ownerGuard },
    controller.createMembership.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/client-memberships/:id",
    { preHandler: ownerGuard },
    controller.getMembershipDetails.bind(controller)
  );

  // Membership actions
  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/activate",
    { preHandler: ownerGuard },
    controller.activateMembership.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/pause",
    { preHandler: ownerGuard },
    controller.pauseMembership.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/resume",
    { preHandler: ownerGuard },
    controller.resumeMembership.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/cancel",
    { preHandler: ownerGuard },
    controller.cancelMembership.bind(controller)
  );

  // Cycles
  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/cycles/:cycleId/payment",
    { preHandler: ownerGuard },
    controller.recordPayment.bind(controller)
  );

  // Benefits
  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/benefits/:benefitId/use",
    { preHandler: ownerGuard },
    controller.useBenefit.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-memberships/:id/benefits/:benefitId/reverse",
    { preHandler: ownerGuard },
    controller.reverseBenefit.bind(controller)
  );
}
