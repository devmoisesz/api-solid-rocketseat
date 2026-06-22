import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate.use.case'

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
        const authenticateUseCase = makeAuthenticateUseCase()

        const { email, password } = registerBodySchema.parse(request.body)
        const {user} = await authenticateUseCase.execute({
            email, 
            password
        })

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: user.id
                }
            }
        )

        return reply.status(200).send({token})   
    }
}