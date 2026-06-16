import Fastify, { FastifyRequest } from "fastify";
import { userRoutes } from "./routes/users";
import { serverRoutes } from "./routes/servers";
import { serviceRoutes } from "./routes/services";
import { authRoutes } from "./routes/auth";
import JWT from "@fastify/jwt";

const env = {
  JWT_SECRET: process.env.JWT_SECRET ?? (() => {
    throw new Error("JWT_SECRET is missing");
  })(),
};

export function buildApp(enableLogs: boolean = true) {
  const app = Fastify({
    logger: enableLogs
  })

  app.register(JWT, {
    secret: env.JWT_SECRET
  })

  app.register(userRoutes)
  app.register(serverRoutes)
  app.register(serviceRoutes)
  app.register(authRoutes)

  app.decorate("authenticate", async (request: FastifyRequest,) => {
    await request.jwtVerify();
  })

  return app;
}