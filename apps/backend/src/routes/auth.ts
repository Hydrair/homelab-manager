import { FastifyInstance } from "fastify";
import { prisma, UserType } from "../lib/prisma";
import argon2 from "argon2";
import { LoginData } from "../lib/types";
import { Role } from "../../generated/prisma/enums";
import { authenticate } from "../plugins/auth";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", async (request) => {
    const { email, password, role } = request.body as { email: string, password: string, role: Role }

    const user = await prisma.user.findUnique({ where: { email } })
    if (user) throw new Error("User exists");

    const hashed = await argon2.hash(password)
    return await prisma.user.create(
      { data: { email, passwordHash: hashed, role } }
    )
  });

  app.post("/auth/login", async (request, reply) => {
    const { email, password } = request.body as LoginData

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) throw new Error("User does not exist");

    try {
      if (await argon2.verify(user.passwordHash, password)) {
        const token = await reply.jwtSign({
          userId: user.id,
          role: user.role,
        });
        return { token }
      } else {
        reply.status(401)
        throw new Error("Password is wrong")
      }
    } catch (error) {
      throw error
    }
  });

  app.get(
    "/me",
    {
      preHandler: [authenticate],
    },
    async (request) => {
      return request.user
    }
  )

}