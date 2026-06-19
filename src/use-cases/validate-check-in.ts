import { AppError } from "@/middleware/AppError";
import type { CheckInsRepository } from "@/repositories/check-ins.repository";
import type { GymsRepository } from "@/repositories/gym.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import type { CheckIn } from "@prisma/client";

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

        checkIn.validated_at = new Date()
        
        await this.checkInsRepository.save(checkIn)

        return {checkIn}
    }
}