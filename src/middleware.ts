// src/middleware.ts
import type { MiddlewareHandler } from "astro";
import { getTokenFromCookie, decodeJwtPayload } from "./lib/auth";

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  const path = ctx.url.pathname.toLowerCase();

  const isCheckoutReturn =
    path === "/checkout/success" ||
    path === "/checkout/pending" ||
    path === "/checkout/failure";

  const token = getTokenFromCookie(ctx.request.headers.get("cookie"));
  const payload = token ? decodeJwtPayload(token) : null;

  const role =
    payload?.role ||
    payload?.user?.role ||
    payload?.roles?.[0] ||
    "user";

  if (payload) {
    ctx.locals.user = {
      id: payload.sub,
      email: payload.email,
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

  if (isAdminRoute && role !== "admin") {
    return ctx.redirect("/");
  }

  return next();
};