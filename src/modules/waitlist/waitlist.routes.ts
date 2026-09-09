import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { WaitlistController } from "./waitlistController";

export async function waitlistRoutes(app: FastifyInstance) {
  const controller = new WaitlistController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // Internal APIs
  app.get(
    "/barbershops/:barbershopId/waitlist",
    { preHandler: ownerGuard },
    controller.listEntries.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/waitlist",
    { preHandler: ownerGuard },
    controller.createEntry.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/waitlist/:id",
    { preHandler: ownerGuard },
    controller.updateEntry.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/waitlist/:id",
    { preHandler: ownerGuard },
    controller.deleteEntry.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/waitlist/:id/offer",
    { preHandler: ownerGuard },
    controller.offerSlot.bind(controller)
  );

  // Public APIs (no auth required)
  app.post(
    "/appointments/waitlist/public",
    controller.publicCreateEntry.bind(controller)
  );

  app.get(
    "/appointments/waitlist/public/offer",
    controller.getOfferByToken.bind(controller)
  );

  app.post(
    "/appointments/waitlist/public/accept",
    controller.acceptOffer.bind(controller)
  );

  app.post(
    "/appointments/waitlist/public/decline",
    controller.declineOffer.bind(controller)
  );
}
