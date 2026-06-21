import type { FastifyRequest, FastifyReply } from 'fastify'

export class ProfileController {
    constructor(
        
    ){
        
    }

    async profile(request: FastifyRequest, reply: FastifyReply){
        await request.jwtVerify()
        
        return reply.status(200).send()   
    }
}