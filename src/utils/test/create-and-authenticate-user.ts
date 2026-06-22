import request from "supertest"
import type { FastifyInstance } from "fastify"

export async function createAndAuthenticateUser(app: FastifyInstance){
    await request(app.server).post('/users').send({
        name: 'Fulano',
        email: 'fulano@example.com',
        password: '232323'
    })


    const authResponse = await request(app.server).post('/authenticate').send({
        email: 'fulano@example.com',
        password: '232323'
    })

    const { token } = authResponse.body

    return {
        token
    }
}