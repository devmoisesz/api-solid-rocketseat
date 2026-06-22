import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { SearchGymsController } from "./search.controller";
import { GymsNearbyController } from "./nearby.controller";
import { CreateGymsController } from "./create.controller";

const searchGymsController = new SearchGymsController()
const nearbyGymsController = new GymsNearbyController()
const createGymsController = new CreateGymsController()

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/gyms/search', searchGymsController.search)
    app.get('/gyms/nearby', nearbyGymsController.nearby)

    app.post('/gyms', createGymsController.create)
}