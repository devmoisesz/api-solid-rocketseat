import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in.use.case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class CreateCheckInsController {
    constructor(
        
    ){
        
    }

    async create(request: FastifyRequest, reply: FastifyReply){
        const createCheckInParamsSchema = z.object({
            gymId: z.string().uuid()
        })

        const createCheckInBodySchema = z.object({
            latitude: z.number().refine(value => {
                return Math.abs(value) <= 90
            }),
            longitude: z.number().refine(value => {
                return Math.abs(value) <= 100
            }),

        })

        const createCheckInsUseCase = makeCheckInUseCase()
        
        const { gymId } = createCheckInParamsSchema.parse(request.params)
        const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
        await createCheckInsUseCase.execute({
           gymId,
           userId: request.user.sub,
           userLatitude: latitude,
           userLongitude: longitude
        })

        return reply.status(201).send()   
    }
}