import { AppError } from '@/middleware/AppError'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user.repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute(name: string, email: string, password: string) {
        const prismaUserRepository = new PrismaUserRepository()
        const userWithSameEmail = await prismaUserRepository.findByEmail(email)

        if(userWithSameEmail) throw new AppError('E-mail already exists', 409)

        const password_hash = await hash(password, 6)


        await prismaUserRepository.create({name, email, password_hash})
    }
}