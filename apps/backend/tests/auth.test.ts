import { describe, it, expect, beforeEach } from "vitest";
import { createTestApp } from "./utils/server";
import { resetDb } from "./utils/resetDB";
import { FastifyInstance } from "fastify";
import { Role } from "../generated/prisma/enums";

let app: FastifyInstance

describe("Auth - register", () => {
  beforeEach(async () => {
    await resetDb();

    app = createTestApp();
    await app.ready();
  });

  it("creates a new user", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/auth/register",
      body: {
        email: "test@test.de",
        password: "secret123",
      },
    });

    expect(res.statusCode).toBe(200);
  });

  it("rejects duplicate email", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "dup@test.de",
        password: "secret",
      },
    });

    const res = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "dup@test.de",
        password: "secret",
      },
    });

    expect(res.statusCode).toBe(500);
  });

  it("logs user in and returns token", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "login@test.de",
        password: "secret",
      },
    });

    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "login@test.de",
        password: "secret",
      },
    });

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);

    expect(body.token).toBeDefined();
  });

  it("rejects wrong password", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "wrong@test.de",
        password: "secret",
      },
    });

    const res = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "wrong@test.de",
        password: "wrongpass",
      },
    });

    expect(res.statusCode).toBe(401);
  });

  it("blocks access to /me without token", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/me",
    });

    expect(res.statusCode).toBe(401);
  });

  it("allows access to /me with token", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "me@test.de",
        password: "secret",
      },
    });

    const login = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "me@test.de",
        password: "secret",
      },
    });

    const { token } = JSON.parse(login.body);

    const res = await app.inject({
      method: "GET",
      url: "/me",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(res.statusCode).toBe(200);
  });

  it("should delete user when admin", async () => {
    const register = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "me@test.de",
        password: "secret",
        role: Role.ADMIN
      },
    });

    const user = JSON.parse(register.body)

    const resWithoutLogin = await app.inject({
      method: "DELETE",
      url: `/users/${user.id}`,
    });

    expect(resWithoutLogin.statusCode).toBe(401)

    const login = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "me@test.de",
        password: "secret",
      },
    });

    const { token } = JSON.parse(login.body);

    const res = await app.inject({
      method: "DELETE",
      url: `/users/${user.id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    expect(res.statusCode).toBe(200);

    const users = await app.inject({
      method: "GET",
      url: "/users",
    });

    expect(users.statusCode).toBe(200);
    expect(JSON.parse(users.body)).toEqual([]);
  });
});




