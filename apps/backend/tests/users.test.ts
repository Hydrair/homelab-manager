import { describe, it, expect, beforeEach } from "vitest";
import { createTestApp } from "./utils/server";
import { resetDb } from "./utils/resetDB";
import { FastifyInstance } from "fastify";

let app: FastifyInstance

describe("User API", () => {
  beforeEach(async () => {
    await resetDb();

    app = createTestApp();
    await app.ready();
  });

  it("should return empty users list", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual([]);
  });


});