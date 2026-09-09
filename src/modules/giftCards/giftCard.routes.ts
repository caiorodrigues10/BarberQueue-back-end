import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { GiftCardController } from "./giftCardController";

export async function giftCardRoutes(app: FastifyInstance) {
  const controller = new GiftCardController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // ─── Staff (owner guard) ─────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/gift-cards",
    { preHandler: ownerGuard },
    controller.purchase.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/gift-cards",
    { preHandler: ownerGuard },
    controller.list.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/gift-cards/lookup",
    { preHandler: ownerGuard },
    controller.lookupByCode.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/gift-cards/:id",
    { preHandler: ownerGuard },
    controller.getById.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/gift-cards/:id/redeem",
    { preHandler: ownerGuard },
    controller.redeem.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/gift-cards/:id/cancel",
    { preHandler: ownerGuard },
    controller.cancel.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/gift-cards/:id/usages",
    { preHandler: ownerGuard },
    controller.getUsages.bind(controller)
  );
}
