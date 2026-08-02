// Studio token plumbing. The CLI launches the browser with ?token=<随机令牌>,
// which doubles as an authentication secret for this local server: the SPA
// captures it once, stashes it in sessionStorage, and replays it on every API
// call (Authorization header) and SSE stream (?token= query param).

const TOKEN_KEY = "inkos-studio-token";

/** Extract ?token= from the URL on first load, persist, then scrub the URL. */
export function captureStudioToken(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  if (!token) return;
  sessionStorage.setItem(TOKEN_KEY, token);
  params.delete("token");
  const clean = params.toString();
  const qs = clean ? `?${clean}` : "";
  window.history.replaceState(null, "", `${window.location.pathname}${qs}${window.location.hash}`);
}

export function getStudioToken(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(TOKEN_KEY) ?? "";
}

/** Append ?token= to an EventSource URL when auth is active. */
export function withStudioToken(url: string): string {
  const token = getStudioToken();
  if (!token) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}token=${encodeURIComponent(token)}`;
}

/** Merge an Authorization header when auth is active. */
export function withAuthHeaders(headers: Headers): Headers {
  const token = getStudioToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
}
