import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { SearchGymsUseCase } from './search.gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        searchGymsUseCase = new SearchGymsUseCase(gymsRepository)

    })

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            gym_name: 'Docker club',
            description: null,
            phone: null,
            latitude: -21.4723062,
            longitude: -48.3888482
        })

        await gymsRepository.create({
            gym_name: 'Docker Compose club',
            description: null,
            phone: null,
            latitude: -21.4723062,
            longitude: -48.3888482
        })


        const { gyms } = await searchGymsUseCase.execute({
            query: 'Docker club',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({gym_name: 'Docker club'}),
        ])
    })

    it('should be able to fetch paginated gym search', async () => {
        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
              gym_name: `Docker Compose Gym ${i}`,
              description: null,
              phone: null,
              latitude: -21.4723062,
              longitude: -48.3888482
            })
        }


        const { gyms } = await searchGymsUseCase.execute({
            query: 'Docker Compose',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({gym_name: 'Docker Compose Gym 21'}),
            expect.objectContaining({gym_name: 'Docker Compose Gym 22'})
        ])
    })
})