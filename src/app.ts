import fastify from 'fastify'
import { appRoutes } from './http/routes/routes'
import { errorHandler } from './middleware/error-handler'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler(errorHandler)