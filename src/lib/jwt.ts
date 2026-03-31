export type JwtPayloadLike = {
  exp?: number;
  iat?: number;
  email?: string;
  username?: string;
  sub?: string;
  role?: string;
  roles?: string[];
  user?: {
    email?: string;
    username?: string;
    role?: string;
    roles?: string[];
  };
  [key: string]: unknown;
};

export function getCookieFromHeader(
  cookieHeader: string,
  name: string,
): string | null {
  if (!cookieHeader || !name) {
    return null;
  }

  const cookies = cookieHeader.split(";");

  for (const cookie of cookies) {
    const trimmed = cookie.trim();
    const eqIndex = trimmed.indexOf("=");

    if (eqIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex);
    const value = trimmed.slice(eqIndex + 1);

    if (key === name) {
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }

  return null;
}

export function decodeJwtPayload(token: string): JwtPayloadLike | null {
  try {
    const parts = String(token || "").split(".");

    if (parts.length !== 3) {
      return null;
    }

    const payloadBase64Url = parts[1];
    const base64 = payloadBase64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

    const json = Buffer.from(padded, "base64").toString("utf8");
    return JSON.parse(json) as JwtPayloadLike;
  } catch {
    return null;
  }
}

export function isExpired(payload: JwtPayloadLike | null): boolean {
  if (!payload?.exp) {
    return false;
  }

  const nowSec = Math.floor(Date.now() / 1000);
  return Number(payload.exp) <= nowSec;
}

export function extractRole(
  payload: JwtPayloadLike | null,
): "admin" | "user" {
  const raw =
    payload?.role ??
    payload?.user?.role ??
    payload?.roles?.[0] ??
    payload?.user?.roles?.[0] ??
    null;

  if (!raw) {
    return "user";
  }

  const value = String(raw).toLowerCase();
  return value.includes("admin") ? "admin" : "user";
}

export function extractEmail(payload: JwtPayloadLike | null): string | null {
  const raw =
    payload?.email ??
    payload?.user?.email ??
    payload?.username ??
    payload?.user?.username ??
    payload?.sub ??
    null;

  return raw ? String(raw) : null;
}