import { AppError } from "@/middleware/AppError";
import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface GetUserProfileUseCaseRequest{
    userId: string
}

interface GetUserProfileUseCaseResponse{
    user: User
}


export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({
        userId
    }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) throw new AppError('Resource not found', 400)

        return {user}
    }
}