import type { APIRoute } from "astro";
import {
  decodeJwtPayload,
  extractEmail,
  extractRole,
  getCookieFromHeader,
  isExpired,
} from "../../lib/jwt";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const token = getCookieFromHeader(cookieHeader, "adi_token");

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  };

  let payload: Record<string, unknown> | null = null;
  let expired: boolean | null = null;
  let role: "admin" | "user" | null = null;
  let email: string | null = null;

  if (token) {
    payload = decodeJwtPayload(token);
    expired = payload ? isExpired(payload) : null;

    if (payload && !expired) {
      role = extractRole(payload);
      email = extractEmail(payload);
    }
  }

  return new Response(
    JSON.stringify(
      {
        authenticated: Boolean(token && payload && !expired),
        role,
        email,
        debug: {
          hasCookieHeader: Boolean(cookieHeader),
          cookieHeader,
          hasAdiToken: Boolean(token),
          tokenLength: token ? token.length : 0,
          tokenPreview: token ? `${token.slice(0, 40)}...` : null,
          payloadValid: Boolean(payload),
          payload,
          expired,
        },
      },
      null,
      2,
    ),
    {
      status: 200,
      headers,
    },
  );
};