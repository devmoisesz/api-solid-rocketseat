import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in.use.case'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export class ValidateCheckInsController {
    constructor(
        
    ){
        
    }

    async validate(request: FastifyRequest, reply: FastifyReply){
        const validateCheckInParamsSchema = z.object({
            checkInId: z.string().uuid()
        })


        const validateCheckInUseCase = makeValidateCheckInUseCase()
        
        const { checkInId } = validateCheckInParamsSchema.parse(request.params)
        await validateCheckInUseCase.execute({
           checkInId
        })

        return reply.status(204).send()   
    }
}