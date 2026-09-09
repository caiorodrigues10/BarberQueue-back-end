import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { ResourceController } from "./resourceController";

export async function resourceRoutes(app: FastifyInstance) {
  const controller = new ResourceController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [
    authenticate,
    authorize(ownerRoles),
    checkSubscription,
    checkDashboardAccess,
    setRlsContext,
  ];

  // ─── Resource CRUD ─────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/resources",
    { preHandler: ownerGuard },
    controller.listResources.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/resources",
    { preHandler: ownerGuard },
    controller.createResource.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/resources/:id",
    { preHandler: ownerGuard },
    controller.getResource.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/resources/:id",
    { preHandler: ownerGuard },
    controller.updateResource.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/resources/:id",
    { preHandler: ownerGuard },
    controller.deleteResource.bind(controller)
  );

  // ─── Availability ──────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/resources/:id/availability",
    { preHandler: ownerGuard },
    controller.checkAvailability.bind(controller)
  );

  // ─── Bookings ──────────────────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/resource-bookings",
    { preHandler: ownerGuard },
    controller.listBookings.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/resources/:id/bookings",
    { preHandler: ownerGuard },
    controller.createBooking.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/resource-bookings/:bookingId",
    { preHandler: ownerGuard },
    controller.updateBooking.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/resource-bookings/:bookingId",
    { preHandler: ownerGuard },
    controller.cancelBooking.bind(controller)
  );
}
