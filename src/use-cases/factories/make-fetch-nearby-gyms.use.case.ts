import { PrismaGymsRepository } from "@/repositories/prisma-repository/prisma-gyms.repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const UseCase = new FetchNearbyGymsUseCase(gymsRepository)

    return UseCase
}