import dotenv from "dotenv";
import { prisma } from "../src/lib/prisma"

dotenv.config({
  path: ".env.test",
});

export async function setup() {
  // wait for DB
  await prisma.$connect();
}