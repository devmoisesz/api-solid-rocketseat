import type { FastifyRequest, FastifyReply } from "fastify"
import { AppError } from "./AppError"

export async function errorHandler(
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    })
  }

  return reply.status(500).send({
    message: 'Erro interno do servidor',
    })
}