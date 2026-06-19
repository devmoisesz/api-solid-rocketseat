import type { GymsRepository } from "@/repositories/gym.repository";
import type { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest{
    gym_name: string,
    description: string | null
    phone: string | null
    latitude: number
    longitude: number
}

interface CreateGymUseCaseResponse{
    gym: Gym
}


export class CreateGymUseCase {
    constructor(private gymsRepository: GymsRepository){}

    async execute({
        gym_name,
        description,
        phone,
        latitude,
        longitude
    }: CreateGymUseCaseRequest): Promise <CreateGymUseCaseResponse> {
        const gym = await this.gymsRepository.create({
            gym_name,
            description,
            phone,
            latitude,
            longitude
        })

        return { gym }
    }
}