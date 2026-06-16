import type { FastifyInstance } from "fastify";
import { RegisterController } from '../controllers/register.controller'
import { AuthenticateController } from "../controllers/authenticate.controller";

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController.registerUser)

    app.post('/authenticate', authenticateController.authenticate)
}