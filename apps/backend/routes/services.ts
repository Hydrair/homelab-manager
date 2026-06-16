

import { FastifyInstance } from "fastify";
import { prisma, ServiceType } from "../lib/prisma";

export async function serviceRoutes(app: FastifyInstance) {
  app.get("/services", async () => {
    return await prisma.user.findMany();
  });

  app.post("/services", async (request) => {
    const body = request.body as ServiceType

    return await prisma.service.create({ data: body });
  });
}