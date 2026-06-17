import { FastifyInstance } from 'fastify';
import { prisma, UserType } from '../lib/prisma';
import { requireRole } from '../lib/util';
import { authenticate } from '../plugins/auth';
import { RequestParams } from '../lib/types';
import { Role } from '../../generated/prisma/enums';

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    return await prisma.user.findMany();
  });

  app.post('/users', async (request) => {
    const body = request.body as UserType;

    return await prisma.user.create({ data: body });
  });

  app.delete<{
    Params: RequestParams;
  }>(
    '/users/:id',
    {
      preHandler: [authenticate, requireRole(Role.ADMIN)]
    },
    async (request) => {
      const id = Number(request.params.id);

      return await prisma.user.delete({ where: { id } });
    }
  );
}
