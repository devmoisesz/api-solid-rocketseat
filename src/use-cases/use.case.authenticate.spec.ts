import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { expect, describe, it } from 'vitest'
import { AuthenticateUseCase } from './use.case.authenticate'
import { hash } from 'bcryptjs'
import { AppError } from '@/middleware/AppError'

describe('Authenticate Use Case', () => {
    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const user = await authenticateUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        expect(() => authenticateUseCase.execute({
            email: 'johndoe@example.com',
            password: '123456',
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => 
            authenticateUseCase.execute({
                email: 'johndoe@example.com',
                password: '123456123',
        })
    ).rejects.toBeInstanceOf(AppError)
    })
})