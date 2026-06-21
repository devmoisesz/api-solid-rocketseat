import type { FastifyInstance } from "fastify";
import { RegisterController } from '../controllers/register.controller'
import { AuthenticateController } from "../controllers/authenticate.controller";
import { ProfileController } from "../controllers/profile.controller";
import { verifyJWT } from "../middlewares/verify-jwt";

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()
const profileController = new ProfileController

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController.registerUser)
    app.post('/authenticate', authenticateController.authenticate)

    // Authenticated

    app.get('/me', { onRequest: [verifyJWT]},  profileController.profile)

}