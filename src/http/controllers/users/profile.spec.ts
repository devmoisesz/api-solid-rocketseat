import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from '@/app'

describe('Profile (e2e)', () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to get user profile', async () => {
        await request(app.server).post('/users').send({
            name: 'Fulano',
            email: 'fulano@example.com',
            password: '232323'
        })

        const login = await request(app.server).post('/authenticate').send({
            email: 'fulano@example.com',
            password: '232323'
        })

        const { token } = login.body

        const profileResponse = await request(app.server)
            .get('/me')
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(profileResponse.statusCode).toEqual(200)
        expect(profileResponse.body.user).toEqual(expect.objectContaining({
            email: 'fulano@example.com'
        }))
    })
})