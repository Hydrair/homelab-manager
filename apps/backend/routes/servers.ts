

import { FastifyInstance } from "fastify";
import { prisma, ServerType } from "../lib/prisma";

export async function serverRoutes(app: FastifyInstance) {
  app.get("/servers", async () => {
    return await prisma.user.findMany();
  });

  app.post("/servers", async (request) => {
    const body = request.body as ServerType

    return await prisma.server.create({ data: body });
  });
}