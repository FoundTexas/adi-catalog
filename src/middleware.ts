// src/middleware.ts
import type { MiddlewareHandler } from "astro";
import { getTokenFromCookie, decodeJwtPayload } from "./lib/auth";

function extractRole(payload: any): "admin" | "user" {
  const raw =
    payload?.role ??
    payload?.user?.role ??
    payload?.roles?.[0] ??
    payload?.user?.roles?.[0] ??
    null;

  if (!raw) return "user";

  const s = String(raw).toLowerCase();
  return s.includes("admin") ? "admin" : "user";
}

function extractEmail(payload: any): string | undefined {
  const raw =
    payload?.email ??
    payload?.user?.email ??
    payload?.username ??
    payload?.sub ??
    undefined;

  return raw ? String(raw) : undefined;
}

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const path = ctx.url.pathname.toLowerCase();

  const isCheckoutReturn =
    path === "/checkout/success" ||
    path === "/checkout/pending" ||
    path === "/checkout/failure";

  const token = getTokenFromCookie(ctx.request.headers.get("cookie"));
  const payload = token ? decodeJwtPayload(token) : null;
  const role = extractRole(payload);
  const email = extractEmail(payload);

  if (payload) {
    ctx.locals.user = {
      id: payload?.sub ?? undefined,
      email,
      role,
    };
  } else {
    ctx.locals.user = null;
  }

  if (isCheckoutReturn) {
    return next();
  }

  const isAccountRoute = path.startsWith("/account");
  const isAdminRoute = path.startsWith("/admin");

  if (isAccountRoute && !token) {
    return ctx.redirect("/login?next=/account");
  }

  if (isAdminRoute && !token) {
    return ctx.redirect("/login?next=/admin/bulk");
  }

  if (isAdminRoute && role !== "admin") {
    return ctx.redirect("/login?next=/admin/bulk");
  }

  return next();
};