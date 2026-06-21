import { AppError } from "@/middleware/AppError";
import type { CheckInsRepository } from "@/repositories/check-ins.repository";
import type { GymsRepository } from "@/repositories/gym.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import type { CheckIn } from "@prisma/client";
import dayjs from "dayjs";

interface ValidateCheckInUseCaseRequest{
    checkInId: string
}

interface ValidateCheckInUseCaseResponse{
    checkIn: CheckIn
}


export class ValidateCheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ){}

    async execute({ 
        checkInId
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if(!checkIn) throw new AppError('Resource not found', 400)


        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        )

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new AppError(
                'The check-in can only be validated until 20 minutes of its creation.', 
                400
            )
        }

        checkIn.validated_at = new Date()
        
        await this.checkInsRepository.save(checkIn)

        return {checkIn}
    }
}