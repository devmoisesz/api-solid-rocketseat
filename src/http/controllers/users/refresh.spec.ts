import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able to refresh a token', async () => {
        await request(app.server).post('/users').send({
            name: 'Fulano',
            email: 'fulano@example.com',
            password: '232323'
        })

        const authResponse = await request(app.server).post('/authenticate').send({
            email: 'fulano@example.com',
            password: '232323'
        })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies!)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})