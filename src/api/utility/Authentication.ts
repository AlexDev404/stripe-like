import { Request } from "express";

type AuthorizationToken = string | null;

// Get the header, return the token
function get_authorization(req: Request): AuthorizationToken {
  const authHeader = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.substring(7)
    : null;
  return authHeader ?? null;
}

export { get_authorization };
