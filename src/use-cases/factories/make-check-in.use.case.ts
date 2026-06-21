import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRepository } from "@/repositories/prisma-repository/prisma-check-ins.repository";
import { PrismaGymsRepository } from "@/repositories/prisma-repository/prisma-gyms.repository";

export function makeCheckInUseCase(){
    const checkInsRepository = new PrismaCheckInsRepository()
    const gymsRepository = new PrismaGymsRepository()
    
    const UseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    return UseCase
}