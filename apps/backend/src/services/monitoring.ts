import { prisma } from '../lib/prisma';
import { checkHTTP } from './healthCheck';

export async function runServerChecks() {
  const servers = await prisma.server.findMany();

  for (const server of servers) {
    const serverCheck = await checkHTTP(server.ipAddress);

    const res = await prisma.server.update({
      where: { id: server.id },
      data: {
        lastCheckAt: new Date(),
        status: serverCheck.status
      }
    });

    const res2 = await prisma.serverCheck.create({
      data: {
        status: serverCheck.status,
        responseMs: serverCheck.responseMs,
        serverId: server.id
      }
    });

    console.log(res, res2);
  }
}
