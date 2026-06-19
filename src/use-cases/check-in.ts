import { AppError } from "@/middleware/AppError";
import type { CheckInsRepository } from "@/repositories/check-ins.repository";
import type { GymsRepository } from "@/repositories/gym.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import type { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse{
    checkIn: CheckIn
}


export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymRepository: GymsRepository
    ){}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if(!gym) throw new AppError('Resource not found', 400)

        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS) throw new AppError('Max-distance reached', 400)

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkInOnSameDate) throw new AppError('Max number of check-ins reached', 400)

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId 
        })

        return {checkIn}
    }
}