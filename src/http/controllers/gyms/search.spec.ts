import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search  Gym (e2e)', () => {
    beforeAll(async() => {
        await app.ready()
    })

    afterAll(async() => {
        await app.close()
    })

    it('should be able search gyms by name', async () => {
        const { token } = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                gym_name: 'Node Gym',
                description: null,
                phone: null,
                latitude: -21.4723062,
                longitude: -48.3888482
            })


        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                gym_name: 'Java Gym',
                description: null,
                phone: null,
                latitude: -21.4723062,
                longitude: -48.3888482
            })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                query: 'Node'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                gym_name: 'Node Gym'
            })
        ])

    })
})