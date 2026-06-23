import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { CreateCheckInsController } from "./create.controller";
import { ValidateCheckInsController } from "./validate.controller";
import { HistoryCheckInsController } from "./history.controller";
import { MetricsCheckInsController } from "./metrics.controller";
import { verifyUserRole } from "@/http/middlewares/verify-user-role";

const createCheckInController = new CreateCheckInsController()
const validateCheckInsController = new ValidateCheckInsController()
const historyCheckInsController = new HistoryCheckInsController()
const metricsCheckInsController = new MetricsCheckInsController()

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.get('/check-ins/history', historyCheckInsController.history)
    app.get('/check-ins/metrics', metricsCheckInsController.metrics)

    app.post('/gyms/:gymId/check-ins', createCheckInController.create)
    app.patch(
        '/check-ins/:checkInId/validate', 
        {onRequest: [verifyUserRole('ADMIN')]}, 
        validateCheckInsController.validate
    )
}