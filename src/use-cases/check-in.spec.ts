import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import type { CheckInsRepository } from '@/repositories/check-ins.repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-repository'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        checkInUseCase = new CheckInUseCase(checkInsRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should be able to check in', async () => {

        const { checkIn } = await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2001, 5, 12, 23, 0, 0))

        await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        await expect(() => checkInUseCase.execute ({
            gymId: 'gym-01',
            userId: 'user-01'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2001, 5, 12, 23, 0, 0))

        await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        vi.setSystemTime(new Date(2001, 5, 13, 23, 0, 0))


        const { checkIn } = await checkInUseCase.execute ({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})