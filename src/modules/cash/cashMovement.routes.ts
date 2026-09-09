import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { CashMovementController } from "./cashMovementController";

export async function cashMovementRoutes(app: FastifyInstance) {
  const controller = new CashMovementController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  app.post(
    "/barbershops/:barbershopId/cash/movements",
    { preHandler: ownerGuard },
    controller.registerMovement.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/cash/movements",
    { preHandler: ownerGuard },
    controller.listMovements.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/cash/summary",
    { preHandler: ownerGuard },
    controller.getDailySummary.bind(controller)
  );
}
