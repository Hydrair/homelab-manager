

import { FastifyInstance } from "fastify";
import { prisma, UserType } from "../lib/prisma";
import { requireRole } from "../lib/util";
import { authenticate } from "../plugins/auth";

type DeleteUserParams = {
  id: string;
};

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    return await prisma.user.findMany();
  });

  app.post("/users", async (request) => {
    const body = request.body as UserType

    return await prisma.user.create({ data: body });
  });

  app.delete<{
    Params: DeleteUserParams;
  }>(
    "/users/:id",
    {
      preHandler: [
        authenticate,
        requireRole("ADMIN"),
      ],
    },
    async (request) => {
      const id = Number(request.params.id);
      try {
        const response = await prisma.user.delete({ where: { id } })
        return response
      } catch (error) {
        throw error
      }
    }
  );
}