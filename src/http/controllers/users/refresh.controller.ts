import type { FastifyRequest, FastifyReply } from 'fastify'

export class RefreshController {
    constructor(
        
    ){
        
    }

    async refresh(request: FastifyRequest, reply: FastifyReply){
        //Valida e decodifica o token exclusivamente dos cookies da requisição e ignorando headers ou corpo.
        await request.jwtVerify({ onlyCookie: true }) 

        const { role } = request.user

        const token = await reply.jwtSign(
            {role},
            {
                sign: {
                    sub: request.user.sub
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {role},
            {
                sign: {
                    sub: request.user.sub,
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