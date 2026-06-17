import { FastifyInstance } from 'fastify';
import { runServerChecks } from '../services/monitoring';
import { RequestParams } from '../lib/types';
import { prisma } from '../lib/prisma';

export async function monitoringRoutes(app: FastifyInstance) {
  app.post('/monitoring/run', async () => {
    await runServerChecks();
    return { ok: true };
  });

  app.get<{
    Params: RequestParams;
  }>('/servers/:id/checks', async (request) => {
    const id = Number(request.params.id);
    return await prisma.serverCheck.findMany({
      where: { serverId: id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  });
}
