import { prisma } from '../src/lib/prisma';
import { test, beforeAll } from 'vitest';

beforeAll(async () => {
  console.log('connecting');

  await prisma.$connect();

  console.log('connected');
});

test('db connection', async () => {
  console.time('db');
  console.log(process.env.DATABASE_URL);

  const result = await prisma.$queryRaw`SELECT 1`;

  console.timeEnd('db');

  console.log(result);
});
