// src/pages/api/session.json.ts
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

  if (!token) {
    return new Response(
      JSON.stringify({
        authenticated: false,
        debug: {
          hasCookieHeader: !!cookieHeader,
          cookieHeader,
          hasAdiToken: false,
        },
      }),
      {
        status: 200,
        headers,
      },
    );
  }

  const payload = decodeJwtPayload(token);

  if (!payload || isExpired(payload)) {
    return new Response(
      JSON.stringify({
        authenticated: false,
        debug: {
          hasCookieHeader: !!cookieHeader,
          hasAdiToken: true,
          tokenPreview: `${token.slice(0, 20)}...`,
          payloadValid: !!payload,
          expired: payload ? isExpired(payload) : null,
        },
      }),
      {
        status: 200,
        headers,
      },
    );
  }

  const role = extractRole(payload);
  const email = extractEmail(payload) ?? null;

  return new Response(
    JSON.stringify({
      authenticated: true,
      role,
      email,
      debug: {
        hasCookieHeader: !!cookieHeader,
        hasAdiToken: true,
      },
    }),
    {
      status: 200,
      headers,
    },
  );
};