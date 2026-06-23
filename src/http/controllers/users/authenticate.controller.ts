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

        const authenticateUseCase = makeAuthenticateUseCase()

        const { email, password } = registerBodySchema.parse(request.body)
        const {user} = await authenticateUseCase.execute({
            email, 
            password
        })

        const token = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            }
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/', // com '/' todas as rotas da api tem acesso ao cookie
                secure: true, // garante que o navegador envie um cookie apenas por meio de conexões criptografadas (HTTPS).
                sameSite: true, // Este cookie só é acessado pelo mesmo dominio
                httpOnly: true // o cookie só pode ser acessado pelo backend da app 
            })
            .status(200)
            .send({
                token
            })   
    }
}