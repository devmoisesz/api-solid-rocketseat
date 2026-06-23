import request from "supertest"
import type { FastifyInstance } from "fastify"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false){
    await prisma.user.create({
        data: {
            name: 'Fulano',
            email: 'fulano@example.com',
            password_hash: await hash('232323', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER',
        }
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

