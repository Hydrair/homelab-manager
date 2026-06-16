import { prisma } from "../../src/lib/prisma";

export async function resetDb() {
  await prisma.service.deleteMany();
  await prisma.server.deleteMany();
  await prisma.user.deleteMany();
}