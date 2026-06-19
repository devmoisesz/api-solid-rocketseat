import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gym.repository'
import { Decimal } from '@prisma/client/runtime/library'
import { AppError } from '@/middleware/AppError'

let checkInsRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymRepository = new InMemoryGymsRepository()
        checkInUseCase = new CheckInUseCase(checkInsRepository, gymRepository)

        gymRepository.create({
            id: 'gym-01',
            gym_name: 'Fastify Gym',
            description: '',
            phone: '',
            latitude: -21.4723062,
            longitude: -48.3888482,
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {
        const { checkIn } = await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2001, 5, 12, 23, 0, 0))

        await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })

        await expect(() => checkInUseCase.execute ({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2001, 5, 12, 23, 0, 0))

        await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })

        vi.setSystemTime(new Date(2001, 5, 13, 23, 0, 0))


        const { checkIn } = await checkInUseCase.execute ({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -21.4723062,
            userLongitude: -48.3888482
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in on distant gym', async () => {
        gymRepository.items.push({
            id: 'gym-02',
            gym_name: 'Fastify Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-21.434561),
            longitude: new Decimal(-48.3590649),
        })

        await expect(() => checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: -27.2892052,
            userLongitude: -49.6401091
        })).rejects.toBeInstanceOf(AppError)
    })
})