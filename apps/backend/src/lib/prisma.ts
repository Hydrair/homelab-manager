import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import {
  PrismaClient,
  type User as UserType,
  type Server as ServerType,
  type Service as ServiceType
} from '../../generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: Number(process.env.DATABASE_PORT),
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5
});

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma, UserType, ServerType, ServiceType };
