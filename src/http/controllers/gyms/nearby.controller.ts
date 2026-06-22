import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms.use.case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class GymsNearbyController {
    constructor(
        
    ){
        
    }

    async nearby(request: FastifyRequest, reply: FastifyReply){
        const nearbyGymsQuerySchema = z.object({
            latitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 90
            }),
            longitude: z.coerce.number().refine(value => {
                return Math.abs(value) <= 100
            }),
        })

        const fetchNearbyGymUseCase = makeFetchNearbyGymsUseCase()

        const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)
        const { gyms } = await fetchNearbyGymUseCase.execute({
            userLatitude: latitude,
            userLongitude: longitude
        })
        return reply.status(200).send({
            gyms
        })   
    }
}