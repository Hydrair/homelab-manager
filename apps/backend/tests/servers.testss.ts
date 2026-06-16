import { describe, it, expect } from "vitest";
import { buildApp } from "../src/app";

describe("User API", () => {
  it("should return empty users list", async () => {
    const app = buildApp();

    const res = await app.inject({
      method: "GET",
      url: "/users",
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual([]);
  });
});