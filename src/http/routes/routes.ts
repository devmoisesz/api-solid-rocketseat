import type { FastifyInstance } from "fastify";
import { RegisterController } from '../controllers/register.controller'
import { RegisterUseCase } from "@/use-cases/use.cases.register";


const registerController = new RegisterController()

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController.registerUser)
}