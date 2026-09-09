import { FastifyInstance } from "fastify";
import { authenticate } from "@/shared/infra/http/middlewares/authenticate";
import { authorize } from "@/shared/infra/http/middlewares/authorize";
import { checkSubscription } from "@/shared/infra/http/middlewares/checkSubscription";
import { checkDashboardAccess } from "@/shared/infra/http/middlewares/checkDashboardAccess";
import { setRlsContext } from "@/shared/infra/http/middlewares/setRlsContext";
import { DepositController } from "./depositController";

export async function depositRoutes(app: FastifyInstance) {
  const controller = new DepositController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  app.get(
    "/barbershops/:barbershopId/deposit-policy",
    { preHandler: ownerGuard },
    controller.getDepositPolicy.bind(controller)
  );

  app.patch(
    "/barbershops/:barbershopId/deposit-policy",
    { preHandler: ownerGuard },
    controller.updateDepositPolicy.bind(controller)
  );

  app.get(
    "/appointments/:appointmentId/deposit",
    { preHandler: ownerGuard },
    controller.getAppointmentDeposit.bind(controller)
  );

  app.post(
    "/appointments/:appointmentId/deposit/confirm",
    { preHandler: ownerGuard },
    controller.confirmDeposit.bind(controller)
  );

  app.post(
    "/appointments/:appointmentId/deposit/waive",
    { preHandler: ownerGuard },
    controller.waiveDeposit.bind(controller)
  );

  app.post(
    "/appointments/:appointmentId/deposit/reject",
    { preHandler: ownerGuard },
    controller.rejectDeposit.bind(controller)
  );

  app.post(
    "/appointments/:appointmentId/deposit/refund",
    { preHandler: ownerGuard },
    controller.refundDeposit.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/appointment-deposits",
    { preHandler: ownerGuard },
    controller.listDeposits.bind(controller)
  );
}
