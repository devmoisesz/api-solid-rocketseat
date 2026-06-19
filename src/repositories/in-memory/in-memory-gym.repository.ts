import { Prisma, type Gym } from "@prisma/client";
import type { GymsRepository } from "../gym.repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository{
    public items: Gym[] = []


    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            gym_name: data.gym_name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date
        }

        this.items.push(gym)
        
        return gym
    }

    async findById(id: string) {
        const gym = this.items.find((item) => item.id === id)

        if(!gym) return null

        this.items.push(gym)

        return gym
    }

    async searchMany(query: string, page: number) {
        return this.items.filter((item) => item.gym_name.includes(query))
            .slice((page -1) * 20, page * 20)
    }
}