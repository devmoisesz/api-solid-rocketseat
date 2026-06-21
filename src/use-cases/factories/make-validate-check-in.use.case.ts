import { PrismaCheckInsRepository } from "@/repositories/prisma-repository/prisma-check-ins.repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

export function makeValidateCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const UseCase = new ValidateCheckInUseCase(checkInsRepository)

    return UseCase
}