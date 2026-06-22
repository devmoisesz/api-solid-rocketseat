import type { FastifyInstance } from "fastify";
import { RegisterController } from '@/http/controllers/users/register.controller'
import { AuthenticateController } from "../users/authenticate.controller";
import { ProfileController } from "../users/profile.controller";
import { verifyJWT } from "../../middlewares/verify-jwt";

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()
const profileController = new ProfileController

export async function usersRoutes(app: FastifyInstance) {
    app.post('/users', registerController.registerUser)
    app.post('/authenticate', authenticateController.authenticate)

    // Authenticated
    app.get('/me', { onRequest: [verifyJWT]},  profileController.profile)
    
}