import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authenticateClient } from "@/shared/infra/http/middlewares/authenticateClient";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { ClientPortalController } from "./clientPortalController";

export async function clientPortalRoutes(app: FastifyInstance) {
  const controller = new ClientPortalController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const staffRoles = ["MASTER_ADMIN", "OWNER", "MANAGER", "PROFESSIONAL"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];
  const staffGuard = [authenticate, authorize(staffRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  // ─── Public: OTP Auth ────────────────────────────────────────
  app.post(
    "/client/portal/request-otp",
    controller.requestOtp.bind(controller)
  );

  app.post(
    "/client/portal/verify-otp",
    controller.verifyOtp.bind(controller)
  );

  // ─── Authenticated: Client Portal ────────────────────────────
  app.get(
    "/client/portal/my-links",
    { preHandler: [authenticateClient] },
    controller.listMyLinks.bind(controller)
  );

  app.get(
    "/client/portal/my-care-instructions",
    { preHandler: [authenticateClient] },
    controller.listMyCareInstructions.bind(controller)
  );

  app.post(
    "/client/portal/request-link",
    { preHandler: [authenticateClient] },
    controller.requestLink.bind(controller)
  );

  // ─── Staff: Link Management ──────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/client-links",
    { preHandler: ownerGuard },
    controller.listAllLinks.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/client-links/pending",
    { preHandler: ownerGuard },
    controller.listPendingLinks.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-links/:linkId/confirm",
    { preHandler: staffGuard },
    controller.confirmLink.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-links/:linkId/reject",
    { preHandler: staffGuard },
    controller.rejectLink.bind(controller)
  );

  app.post(
    "/barbershops/:barbershopId/client-links/:linkId/revoke",
    { preHandler: ownerGuard },
    controller.revokeLink.bind(controller)
  );

  // ─── Staff: Care Templates ───────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/care-templates",
    { preHandler: ownerGuard },
    controller.createCareTemplate.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/care-templates",
    { preHandler: staffGuard },
    controller.listCareTemplates.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/care-templates/:id",
    { preHandler: ownerGuard },
    controller.updateCareTemplate.bind(controller)
  );

  app.delete(
    "/barbershops/:barbershopId/care-templates/:id",
    { preHandler: ownerGuard },
    controller.deleteCareTemplate.bind(controller)
  );

  // ─── Staff: Care Instructions ────────────────────────────────
  app.post(
    "/barbershops/:barbershopId/care-instructions",
    { preHandler: staffGuard },
    controller.sendCareInstruction.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/care-instructions",
    { preHandler: staffGuard },
    controller.listCareInstructions.bind(controller)
  );

  app.patch(
    "/care-instructions/:id/read",
    { preHandler: [authenticateClient] },
    controller.markCareInstructionRead.bind(controller)
  );

  // ─── Staff: Portal Dashboard ─────────────────────────────────
  app.get(
    "/barbershops/:barbershopId/client-portal/dashboard",
    { preHandler: ownerGuard },
    controller.getPortalDashboard.bind(controller)
  );
}
