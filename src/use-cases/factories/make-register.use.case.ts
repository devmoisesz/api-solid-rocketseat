import { PrismaUserRepository } from "@/repositories/prisma-repository/prisma-user.repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const usersRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}