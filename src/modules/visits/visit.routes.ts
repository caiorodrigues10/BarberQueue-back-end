import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { VisitController } from "./visitController";

export async function visitRoutes(app: FastifyInstance) {
  const controller = new VisitController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // ─── Visits ─────────────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/visits",
    { preHandler: ownerGuard },
    controller.list.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/visits/:id",
    { preHandler: ownerGuard },
    controller.getDetail.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/visits",
    { preHandler: ownerGuard },
    controller.create.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/visits/:id/status",
    { preHandler: ownerGuard },
    controller.updateStatus.bind(controller)
  );

  // ─── Tab Items ──────────────────────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/visits/:id/items",
    { preHandler: ownerGuard },
    controller.addItem.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/visits/:id/items/:itemId/status",
    { preHandler: ownerGuard },
    controller.updateItemStatus.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/visits/:id/items/:itemId",
    { preHandler: ownerGuard },
    controller.removeItem.bind(controller)
  );

  // ─── Payments & Close ───────────────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/tabs/:tabId/payments",
    { preHandler: ownerGuard },
    controller.recordPayment.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/tabs/:tabId/close",
    { preHandler: ownerGuard },
    controller.closeTab.bind(controller)
  );
}
