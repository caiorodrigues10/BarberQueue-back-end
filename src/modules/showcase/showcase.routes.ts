import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { ShowcaseController } from "./showcaseController";

export async function showcaseRoutes(app: FastifyInstance) {
  const controller = new ShowcaseController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // ─── Public ───────────────────────────────────────────────────────
  app.get(
    "/barbershops/:id/showcase",
    controller.listPublic.bind(controller)
  );

  app.get(
    "/barbershops/:id/showcase/:entryId",
    controller.getDetail.bind(controller)
  );

  // ─── Staff ────────────────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/showcase-entries",
    { preHandler: ownerGuard },
    controller.listStaff.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/showcase-entries",
    { preHandler: ownerGuard },
    controller.create.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/showcase-entries/:id",
    { preHandler: ownerGuard },
    controller.update.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/showcase-entries/:id/publish",
    { preHandler: ownerGuard },
    controller.publish.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/showcase-entries/:id/hide",
    { preHandler: ownerGuard },
    controller.hide.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/showcase-entries/:id",
    { preHandler: ownerGuard },
    controller.delete.bind(controller)
  );

  app.put(
    "/barbershops/:barbershopId/showcase-entries/order",
    { preHandler: ownerGuard },
    controller.reorder.bind(controller)
  );

  // ─── Analytics ────────────────────────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/showcase-events/:entryId",
    controller.recordEvent.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/showcase-analytics",
    { preHandler: ownerGuard },
    controller.getAnalytics.bind(controller)
  );
}
