import type { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterUseCase } from '@/use-cases/use.cases.register'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'

export class RegisterController {
    constructor(
        
    ){
        
    }

    async registerUser(request: FastifyRequest, reply: FastifyReply){
        const registerBodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        const usersRepository = new PrismaUserRepository
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { name, email, password } = registerBodySchema.parse(request.body)
        const user = await registerUseCase.execute(
            name, 
            email, 
            password
        )
        return reply.status(201).send(user)   
    }
}