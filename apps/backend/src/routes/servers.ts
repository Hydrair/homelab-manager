

import { FastifyInstance } from "fastify";
import { prisma, ServerType } from "../lib/prisma";
import { RequestParams, UpdateServerBody } from "../lib/types";

export async function serverRoutes(app: FastifyInstance) {
  app.get("/servers", async () => {
    return await prisma.server.findMany();
  });

  app.get<{
    Params: RequestParams;
  }>("/servers/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const server = await prisma.server.findUnique({ where: { id } });
    if (server) return server
    reply.status(404)
    throw new Error(`There is no server with id ${id}.`)
  });

  app.post("/servers", async (request, reply) => {
    const body = request.body as ServerType
    const server = await prisma.server.create({ data: body });

    reply.status(201)
    return server

  });

  app.patch<{
    Params: RequestParams;
  }>("/servers/:id", async (request, reply) => {
    const id = Number(request.params.id);
    const updatedFields = request.body as UpdateServerBody

    try {
      const server = await prisma.server.update({
        where: { id },
        data: updatedFields
      });
      return server

    } catch (error) {
      reply.status(404)
      throw new Error(`There is no server with id ${id}.`)
    }
  });

  app.delete<{
    Params: RequestParams;
  }>(
    "/servers/:id",
    async (request, reply) => {
      const id = Number(request.params.id);
      try {
        const response = await prisma.server.delete({ where: { id } })
        return response
      } catch (error) {
        reply.status(404)
        throw new Error(`There is no server with id ${id}.`)
      }
    }
  );
}