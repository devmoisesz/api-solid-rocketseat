import { PrismaUserRepository } from "@/repositories/prisma-repository/prisma-user.repository";
import { RegisterUseCase } from "../use.cases.register";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}