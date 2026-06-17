import '@fastify/jwt';
import { Role } from '../../generated/prisma/enums';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      role: Role;
    };
  }
}
