import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createServer,
  createService,
  createTestApp,
  resetDb
} from './utils';
import { prisma } from '../src/lib/prisma';
import { FastifyInstance } from 'fastify';

let app: FastifyInstance;

describe('Service API', () => {
  beforeEach(async () => {
    await resetDb();

    app = createTestApp();
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns all services', async () => {
    await createService();

    const res = await app.inject({
      method: 'GET',
      url: '/services'
    });

    expect(res.statusCode).toBe(200);

    const services = JSON.parse(res.body);

    expect(services).toHaveLength(1);
    expect(services[0].name).toBe('Jellyfin');
  });

  it('returns a service by id', async () => {
    const service = await createService();

    const res = await app.inject({
      method: 'GET',
      url: `/services/${service.id}`
    });

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);

    expect(body.id).toBe(service.id);
    expect(body.name).toBe('Jellyfin');
  });

  it('returns 404 for unknown service', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/services/99999'
    });

    expect(res.statusCode).toBe(404);
  });

  it('creates a service', async () => {
    const server = await createServer();

    const res = await app.inject({
      method: 'POST',
      url: '/services',
      payload: {
        name: 'Pi-Hole',
        url: '192.168.1.20',
        port: 1234,
        serverId: server.id
      }
    });

    expect(res.statusCode).toBe(201);

    const body = JSON.parse(res.body);

    expect(body.name).toBe('Pi-Hole');
  });

  it('updates a service', async () => {
    const service = await createService();

    const res = await app.inject({
      method: 'PATCH',
      url: `/services/${service.id}`,
      payload: {
        name: 'Updated NAS'
      }
    });

    expect(res.statusCode).toBe(200);

    const updated = await prisma.service.findUnique({
      where: {
        id: service.id
      }
    });

    expect(updated?.name).toBe('Updated NAS');
  });

  it('returns 404 when updating unknown service', async () => {
    const res = await app.inject({
      method: 'PATCH',
      url: '/services/99999',
      payload: {
        name: 'Updated'
      }
    });

    expect(res.statusCode).toBe(404);
  });

  it('deletes a service', async () => {
    const service = await createService();

    const res = await app.inject({
      method: 'DELETE',
      url: `/services/${service.id}`
    });

    expect(res.statusCode).toBe(200);

    const deleted = await prisma.service.findUnique({
      where: {
        id: service.id
      }
    });

    expect(deleted).toBeNull();
  });

  it('returns 404 when deleting unknown service', async () => {
    const res = await app.inject({
      method: 'DELETE',
      url: '/services/99999'
    });

    expect(res.statusCode).toBe(404);
  });
});
