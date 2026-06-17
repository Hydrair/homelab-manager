import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createServer, createTestApp, createUser, resetDb } from "./utils";
import { prisma } from "../src/lib/prisma";
import { FastifyInstance } from "fastify";

let app: FastifyInstance

describe("Server API", () => {

  beforeEach(async () => {
    await resetDb();

    app = createTestApp();
    await app.ready();
  });

  afterEach(async () => {
    await app.close();
  });

  it("returns all servers", async () => {
    await createServer();

    const res = await app.inject({
      method: "GET",
      url: "/servers",
    });

    expect(res.statusCode).toBe(200);

    const servers = JSON.parse(res.body);

    expect(servers).toHaveLength(1);
    expect(servers[0].name).toBe("Homelab");
  });

  it("returns a server by id", async () => {
    const server = await createServer();

    const res = await app.inject({
      method: "GET",
      url: `/servers/${server.id}`,
    });

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);

    expect(body.id).toBe(server.id);
    expect(body.name).toBe("Homelab");
  });

  it("returns 404 for unknown server", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/servers/99999",
    });

    expect(res.statusCode).toBe(404);
  });

  it("creates a server", async () => {
    const user = await createUser();

    const res = await app.inject({
      method: "POST",
      url: "/servers",
      payload: {
        name: "Pi-Hole",
        ipAddress: "192.168.1.20",
        description: "DNS Server",
        userId: user.id,
      },
    });

    expect(res.statusCode).toBe(201);

    const body = JSON.parse(res.body);

    expect(body.name).toBe("Pi-Hole");
  });

  it("updates a server", async () => {
    const server = await createServer();

    const res = await app.inject({
      method: "PATCH",
      url: `/servers/${server.id}`,
      payload: {
        name: "Updated NAS",
      },
    });

    expect(res.statusCode).toBe(200);

    const updated = await prisma.server.findUnique({
      where: {
        id: server.id,
      },
    });

    expect(updated?.name).toBe("Updated NAS");
  });

  it("returns 404 when updating unknown server", async () => {
    const res = await app.inject({
      method: "PATCH",
      url: "/servers/99999",
      payload: {
        name: "Updated",
      },
    });

    expect(res.statusCode).toBe(404);
  });

  it("deletes a server", async () => {
    const server = await createServer();

    const res = await app.inject({
      method: "DELETE",
      url: `/servers/${server.id}`,
    });

    expect(res.statusCode).toBe(200);

    const deleted = await prisma.server.findUnique({
      where: {
        id: server.id,
      },
    });

    expect(deleted).toBeNull();
  });

  it("returns 404 when deleting unknown server", async () => {
    const res = await app.inject({
      method: "DELETE",
      url: "/servers/99999",
    });

    expect(res.statusCode).toBe(404);
  });
})