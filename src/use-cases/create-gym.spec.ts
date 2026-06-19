import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create gym use case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymsRepository()
        createGymUseCase = new CreateGymUseCase(gymRepository)
    })


    it('should be able to get user profile', async () => {

        const { gym } = await createGymUseCase.execute({
            gym_name: 'Docker club',
            description: null,
            phone: null,
            latitude: -21.4723062,
            longitude: -48.3888482
        })


        expect(gym.id).toEqual(expect.any(String))
    })
})