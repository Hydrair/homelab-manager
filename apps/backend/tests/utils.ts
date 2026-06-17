import { prisma } from "../src/lib/prisma";
import { buildApp } from "../src/app";

export async function resetDb() {
  await prisma.service.deleteMany();
  await prisma.server.deleteMany();
  await prisma.user.deleteMany();
}


export function createTestApp() {
  return buildApp(false);
}

export async function createUser() {
  return prisma.user.create({
    data: {
      email: "user@test.de",
      passwordHash: "hash",
    },
  });
}

export async function createServer() {
  const user = await createUser()


  return prisma.server.create({
    data: {
      name: "Homelab",
      ipAddress: "123.123.345.345",
      description: "This is my homelab.",
      userId: user.id
    },
  });
}

export async function createService() {
  const user = await createUser()
  const server = await createServer()

  return prisma.service.create({
    data: {
      name: "Jellyfin",
      url: "123.412.555.111",
      port: 8096,
      serverId: server.id
    },
  });
}