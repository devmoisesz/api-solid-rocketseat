import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register.use.case'

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

        const registerUseCase = makeRegisterUseCase()

        const { name, email, password } = registerBodySchema.parse(request.body)
        const user = await registerUseCase.execute({
            name, 
            email, 
            password
        })
        return reply.status(201).send(user)   
    }
}