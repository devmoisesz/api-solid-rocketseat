import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AppError } from '@/middleware/AppError'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let getProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        getProfileUseCase = new GetUserProfileUseCase(usersRepository)
    })


    it('should be able to get user profile', async () => {

        const cretedUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const user = await getProfileUseCase.execute({
            userId: cretedUser.id
        })

        expect(user.user.name).toEqual('John Doe')
    })

    it('should not be able to get user profile with wrong id', async () => {

        expect(() => getProfileUseCase.execute({
            userId: 'non-existing-id'
        })).rejects.toBeInstanceOf(AppError)
    })

})