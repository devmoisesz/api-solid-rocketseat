import { GetUserCheckInsHistoryUseCase } from "../get-user-check-ins-history";
import { PrismaCheckInsRepository } from "@/repositories/prisma-repository/prisma-check-ins.repository";

export function makeGetUserCheckInsHistoryUseCase(){
    const checksInsRepository = new PrismaCheckInsRepository()
    const UseCase = new GetUserCheckInsHistoryUseCase(checksInsRepository)

    return UseCase
}