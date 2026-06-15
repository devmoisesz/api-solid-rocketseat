import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './use.cases.register'
import { compare } from 'bcryptjs'
import { AppError } from '@/middleware/AppError'

describe('Register Use Case', () => {
    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const user = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const user = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'johedoe@example.com'

        const user = await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})
