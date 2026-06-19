import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymUseCase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        fetchNearbyGymUseCase = new FetchNearbyGymsUseCase(gymsRepository)

    })

    it('should be able to fetch nearby gyms', async () => {
        await gymsRepository.create({
            gym_name: 'Near Gym',
            description: null,
            phone: null,
            latitude: -21.4723062,
            longitude: -48.3888482
        })

        await gymsRepository.create({
            gym_name: 'Far Gym',
            description: null,
            phone: null,
            latitude: -27.0610928,
            longitude: -49.5229501
        })


        const { gyms } = await fetchNearbyGymUseCase.execute({
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([expect.objectContaining({gym_name: 'Near Gym'})])
    })
})