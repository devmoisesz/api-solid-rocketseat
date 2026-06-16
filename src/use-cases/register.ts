import { AppError } from '@/middleware/AppError'
import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user.repository'
import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest{
    name: string,
    email: string,
    password: string
}


export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({
        name, 
        email, 
        password
    }: RegisterUseCaseRequest){
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail) throw new AppError('E-mail already exists', 409)

        const password_hash = await hash(password, 6)


        return await this.usersRepository.create({
            name, 
            email, 
            password_hash
        })

    }
}