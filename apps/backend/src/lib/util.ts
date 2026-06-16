import { Role } from "../../generated/prisma/enums";

export function requireRole(role: Role) {
  return async (request: any) => {
    if (request.user.role !== role) {
      throw new Error("Forbidden");
    }
  };
}