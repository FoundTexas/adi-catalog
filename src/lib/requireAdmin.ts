// src/lib/requireAdmin.ts
import type { AstroGlobal } from "astro";
import { decodeJwtPayload, extractEmail, extractRole, getCookieFromHeader, isExpired } from "./jwt";

export type RequireAdminResult =
  | { ok: true; token: string; payload: any; email: string | null; role: "admin" }
  | { ok: false; reason: "no_token" | "bad_token" | "expired" | "not_admin" };

export function logoutCookies(Astro: AstroGlobal, isProd = import.meta.env.PROD) {
  Astro.cookies.delete("adi_token", { path: "/", secure: isProd, sameSite: "lax" });
  Astro.cookies.delete("adi_user", { path: "/", secure: isProd, sameSite: "lax" });
}

export function requireAdmin(Astro: AstroGlobal): RequireAdminResult {
  const cookieHeader = Astro.request.headers.get("cookie");
  const token = getCookieFromHeader(cookieHeader, "adi_token");

  if (!token) return { ok: false, reason: "no_token" };

  const payload = decodeJwtPayload(token);
  if (!payload) return { ok: false, reason: "bad_token" };

  if (isExpired(payload)) return { ok: false, reason: "expired" };

  const role = extractRole(payload);
  if (role !== "admin") return { ok: false, reason: "not_admin" };

  const email = extractEmail(payload);

  return { ok: true, token, payload, email, role: "admin" };
}