import { PrismaGymsRepository } from "@/repositories/prisma-repository/prisma-gyms.repository"
import { SearchGymsUseCase } from "../search.gyms"

export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new SearchGymsUseCase(gymsRepository)

    return UseCase
}