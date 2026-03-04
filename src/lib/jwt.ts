// src/lib/jwt.ts
export type JwtPayload = Record<string, any> & {
  exp?: number;
  email?: string;
  sub?: number | string;
  role?: string;
  roles?: string[];
  user?: {
    email?: string;
    role?: string;
    roles?: string[];
    [k: string]: any;
  };
};

function base64UrlToJson(b64url: string): any | null {
  try {
    const pad = "=".repeat((4 - (b64url.length % 4)) % 4);
    const b64 = (b64url + pad).replace(/-/g, "+").replace(/_/g, "/");

    const json =
      typeof atob === "function"
        ? atob(b64)
        : Buffer.from(b64, "base64").toString("utf8");

    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    return base64UrlToJson(parts[1]) as JwtPayload | null;
  } catch {
    return null;
  }
}

export function extractEmail(payload: JwtPayload | null): string | null {
  if (!payload) return null;
  return payload.email ?? payload.user?.email ?? null;
}

export function extractRole(payload: JwtPayload | null): "admin" | "user" {
  if (!payload) return "user";

  const raw =
    payload.role ??
    payload.user?.role ??
    payload.roles?.[0] ??
    payload.user?.roles?.[0] ??
    null;

  if (!raw) return "user";
  const s = String(raw).toLowerCase();
  return s.includes("admin") ? "admin" : "user";
}

export function isExpired(payload: JwtPayload | null, nowSec = Math.floor(Date.now() / 1000)): boolean {
  if (!payload?.exp) return false; // si no hay exp, no asumimos expirado
  return Number(payload.exp) <= nowSec;
}

/**
 * Lee una cookie de un header cookie "a=b; c=d"
 */
export function getCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}