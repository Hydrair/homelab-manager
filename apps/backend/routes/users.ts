

import { FastifyInstance } from "fastify";
import { prisma, UserType } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    return await prisma.user.findMany();
  });

  app.post("/users", async (request) => {
    const body = request.body as UserType

    return await prisma.user.create({ data: body });
  });
}