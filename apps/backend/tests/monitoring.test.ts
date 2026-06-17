import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { checkHTTP } from '../src/services/healthCheck';
import { runServerChecks } from '../src/services/monitoring';
import { createServer, createTestApp, resetDb } from './utils';
import { prisma } from '../src/lib/prisma';
import { FastifyInstance } from 'fastify';

let app: FastifyInstance;

describe('Health Check', () => {
  beforeEach(async () => {
    await resetDb();

    app = createTestApp();
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it('returns ONLINE for successful response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true
      })
    );

    const result = await checkHTTP('http://localhost');

    expect(result.status).toBe('ONLINE');
  });

  it('returns OFFLINE when request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Connection refused'))
    );

    const result = await checkHTTP('http://localhost');

    expect(result.status).toBe('OFFLINE');
  });

  it('returns OFFLINE for http 500', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500
      })
    );

    const result = await checkHTTP('http://localhost');

    expect(result.status).toBe('OFFLINE');
  });

  it('updates server status to ONLINE', async () => {
    const server = await createServer();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true
      })
    );

    await runServerChecks();

    const updated = await prisma.server.findUnique({
      where: {
        id: server.id
      }
    });

    expect(updated?.status).toBe('ONLINE');
  });

  it('updates server status to OFFLINE', async () => {
    const server = await createServer();

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    await runServerChecks();

    const updated = await prisma.server.findUnique({
      where: {
        id: server.id
      }
    });

    expect(updated?.status).toBe('OFFLINE');
  });

  it('creates a history entry', async () => {
    const server = await createServer();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true
      })
    );

    await runServerChecks();

    const history = await prisma.serverCheck.findMany({
      where: {
        serverId: server.id
      }
    });

    expect(history).toHaveLength(1);
    expect(history[0].status).toBe('ONLINE');
  });

  it('updates lastCheckAt', async () => {
    const server = await createServer();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true
      })
    );

    await runServerChecks();

    const updated = await prisma.server.findUnique({
      where: {
        id: server.id
      }
    });

    expect(updated?.lastCheckAt).not.toBeNull();
  });

  it('checks all servers', async () => {
    await createServer();
    await createServer();

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true
      })
    );

    await runServerChecks();

    const checks = await prisma.serverCheck.findMany();

    expect(checks).toHaveLength(2);
  });
});
