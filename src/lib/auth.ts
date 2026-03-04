export function getTokenFromCookie(cookieHeader: string | null | undefined) {
  if (!cookieHeader) return null;
  const m = cookieHeader.match(/(?:^|;\s*)adi_token=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

function base64UrlToBase64(input: string) {
  let s = input.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4 !== 0) s += "=";
  return s;
}

export function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = base64UrlToBase64(parts[1]);
    const json = Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}