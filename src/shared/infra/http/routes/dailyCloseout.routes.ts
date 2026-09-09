import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/authenticate";
import { authorize } from "../middlewares/authorize";
import { checkSubscription } from "../middlewares/checkSubscription";
import { checkDashboardAccess } from "../middlewares/checkDashboardAccess";
import { setRlsContext } from "../middlewares/setRlsContext";
import { DailyCloseoutController } from "@/modules/financial/dailyCloseoutController";

export async function dailyCloseoutRoutes(app: FastifyInstance) {
  const controller = new DailyCloseoutController();

  const ownerRoles = ["MASTER_ADMIN", "OWNER"];
  const ownerGuard = [authenticate, authorize(ownerRoles), checkSubscription, checkDashboardAccess, setRlsContext];

  app.post(
    "/barbershops/:barbershopId/closeout",
    { preHandler: ownerGuard },
    controller.closeDay.bind(controller)
  );

  app.get(
    "/barbershops/:barbershopId/closeout",
    { preHandler: ownerGuard },
    controller.getCloseout.bind(controller)
  );
}
