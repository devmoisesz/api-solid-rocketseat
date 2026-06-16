import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AppError } from '@/middleware/AppError'
import type { CheckInsRepository } from '@/repositories/check-ins.repository'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-repository'

let checkInsRepository: CheckInsRepository
let checkInUseCase: CheckInUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        checkInUseCase = new CheckInUseCase(checkInsRepository)
    })


    it('should be able to check in', async () => {

        const { checkIn } = await checkInUseCase.execute({
            gymId: 'gym-01',
            userId: 'user-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

})