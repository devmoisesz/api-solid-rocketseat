import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { AppError } from '@/middleware/AppError'

let checkInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate check-in Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it('should be able to validate the check in', async () => {
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym_id',
            user_id: 'user-01'
        })

        const { checkIn } = await validateCheckInUseCase.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0]?.validated_at).toEqual(expect.any(Date))
    })

    it('should not be able to validate an inexistent check in', async () => {
        await expect(() => validateCheckInUseCase.execute({
            checkInId: 'inexistent-check-in-id'
        })
        ).rejects.toBeInstanceOf(AppError)
    })
})