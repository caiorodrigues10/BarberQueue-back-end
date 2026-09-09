import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { CatalogController } from "./catalogController";

export async function catalogRoutes(app: FastifyInstance) {
  const controller = new CatalogController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // ─── Variations ─────────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/variations",
    { preHandler: ownerGuard },
    controller.listVariations.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/variations",
    { preHandler: ownerGuard },
    controller.createVariation.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/variations/:id",
    { preHandler: ownerGuard },
    controller.updateVariation.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/variations/:id",
    { preHandler: ownerGuard },
    controller.deleteVariation.bind(controller)
  );

  // ─── Addons ─────────────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/addons",
    { preHandler: ownerGuard },
    controller.listAddons.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/addons",
    { preHandler: ownerGuard },
    controller.createAddon.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/addons/:id",
    { preHandler: ownerGuard },
    controller.updateAddon.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/addons/:id",
    { preHandler: ownerGuard },
    controller.deleteAddon.bind(controller)
  );

  // ─── Combos ─────────────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/combos",
    { preHandler: ownerGuard },
    controller.listCombos.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/combos",
    { preHandler: ownerGuard },
    controller.createCombo.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/combos/:id",
    { preHandler: ownerGuard },
    controller.updateCombo.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/combos/:id",
    { preHandler: ownerGuard },
    controller.deleteCombo.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/combos/:comboId/items",
    { preHandler: ownerGuard },
    controller.addComboItem.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/combos/:comboId/items/:itemId",
    { preHandler: ownerGuard },
    controller.removeComboItem.bind(controller)
  );
}
