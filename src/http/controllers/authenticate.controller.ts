import type { FastifyRequest, FastifyReply } from 'fastify'
import { AuthenticateUseCase } from '@/use-cases/use.case.authenticate'
import { z } from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user.repository'

export class AuthenticateController {
    constructor(
        
    ){
        
    }

    async authenticate(request: FastifyRequest, reply: FastifyReply){
        const registerBodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })

        try {
            
        } catch (error) {
            
        }
        const usersRepository = new PrismaUserRepository
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        const { email, password } = registerBodySchema.parse(request.body)
        const user = await authenticateUseCase.execute({
            email, 
            password
        })
        return reply.status(200).send()   
    }
}