import { FastifyInstance } from 'fastify';
import { prisma, ServiceType } from '../lib/prisma';
import { RequestParams, UpdateServiceBody } from '../lib/types';

export async function serviceRoutes(app: FastifyInstance) {
  app.get('/services', async () => {
    return await prisma.service.findMany();
  });

  app.get<{
    Params: RequestParams;
  }>('/services/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const service = await prisma.service.findUnique({ where: { id } });
    if (service) return service;
    reply.status(404);
    throw new Error(`There is no service with id ${id}.`);
  });

  app.post('/services', async (request, reply) => {
    const body = request.body as ServiceType;
    const service = await prisma.service.create({ data: body });

    reply.status(201);
    return service;
  });

  app.patch<{
    Params: RequestParams;
  }>('/services/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const updatedFields = request.body as UpdateServiceBody;

    try {
      const service = await prisma.service.update({
        where: { id },
        data: updatedFields
      });
      return service;
    } catch (error) {
      reply.status(404);
      throw new Error(`There is no service with id ${id}.`);
    }
  });

  app.delete<{
    Params: RequestParams;
  }>('/services/:id', async (request, reply) => {
    const id = Number(request.params.id);
    try {
      const response = await prisma.service.delete({ where: { id } });
      return response;
    } catch (error) {
      reply.status(404);
      throw new Error(`There is no service with id ${id}.`);
    }
  });
}
