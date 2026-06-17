import { FastifyReply, FastifyRequest } from 'fastify';
import { Role } from '../../generated/prisma/enums';

export function requireRole(role: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      return reply.code(403).send({ message: 'Forbidden' });
    }
  };
}

enum LOG_TYPE {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

export function serverLog(message: string, type: LOG_TYPE = LOG_TYPE.ERROR) {
  console.log(`${type}: ${message}`);
}
