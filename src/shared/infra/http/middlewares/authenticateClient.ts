import { FastifyRequest, FastifyReply } from "fastify";
import { compare } from "bcryptjs";
import { AppError } from "@/shared/errors/AppError";
import { prisma } from "@/libs/prismaClient";

/** Extract Bearer token from Authorization header. */
function extractBearerToken(authorization: string | undefined): string | null {
  if (!authorization) return null;
  const [scheme, token, ...rest] = authorization.trim().split(/\s+/);
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token || rest.length > 0) {
    return null;
  }
  return token;
}

/**
 * Client Portal authentication middleware.
 * Validates plain-text access token against client_sessions.accessTokenHash.
 * Sets request.user with type: "client" to distinguish from staff users.
 */
export async function authenticateClient(
  request: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token ausente", 401);
  }

  const token = extractBearerToken(authHeader);
  if (!token) {
    throw new AppError("Token mal formatado", 401);
  }

  // Find active sessions and compare token against accessTokenHash
  const sessions = await prisma.clientSession.findMany({
    where: { revokedAt: null },
  });

  let matchedSession = null;
  for (const session of sessions) {
    const valid = await compare(token, session.accessTokenHash);
    if (valid) {
      matchedSession = session;
      break;
    }
  }

  if (!matchedSession) {
    throw new AppError("Token inválido ou sessão expirada", 401);
  }

  if (new Date() > matchedSession.expiresAt) {
    throw new AppError("Sessão expirada", 401);
  }

  request.user = {
    id: matchedSession.identityId,
    role: "CLIENT",
    identityId: matchedSession.identityId,
  } as any;
}
