// src/pages/api/session.json.ts
import type { APIRoute } from "astro";
import { decodeJwtPayload, extractEmail, extractRole, getCookieFromHeader, isExpired } from "../../lib/jwt";

export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const token = getCookieFromHeader(cookieHeader, "adi_token");

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = decodeJwtPayload(token);
  if (!payload || isExpired(payload)) {
    // No borramos cookies aquí (no tenemos Astro.cookies). Solo reportamos.
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const role = extractRole(payload);
  const email = extractEmail(payload);

  return new Response(JSON.stringify({ authenticated: true, role, email }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};