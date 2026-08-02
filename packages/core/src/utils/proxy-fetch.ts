import { ProxyAgent } from "undici";
import { isIP } from "node:net";
import { lookup as dnsLookup } from "node:dns/promises";

type ProxyEnv = Record<string, string | undefined>;
type FetchInitWithDispatcher = RequestInit & { dispatcher?: unknown };

// Cloud provider metadata endpoints. These are never legitimate LLM API hosts;
// blocking them prevents SSRF from exfiltrating credentials via a
// user-supplied baseUrl or a model-directed URL fetch.
const METADATA_HOSTS = new Set([
  "169.254.169.254", // AWS / GCP / Azure / DigitalOcean
  "169.254.170.2", // AWS ECS
  "100.100.100.200", // Alibaba Cloud
  "100.100.100.61", // Aliyun v2
  "metadata.google.internal",
]);

export function assertNotMetadataEndpoint(url: string | URL): void {
  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return;
  }
  if (METADATA_HOSTS.has(hostname)) {
    throw new Error(`Blocked SSRF attempt to cloud metadata endpoint: ${hostname}`);
  }
}

// 私网/回环/链路本地/组播地址判定。agent 发起的 URL fetch（web_search、
// ingest_material url 模式）禁止访问这些目标，防止模型驱动的请求打到本机
// 服务（如 /api/v1/cover/secret）或内网。覆盖 IPv4-mapped IPv6 与 NAT64。
export function isPrivateNetworkAddress(address: string): boolean {
  const version = isIP(address);
  if (version === 4) {
    const [a, b] = address.split(".").map((part) => Number(part));
    return (
      a === 0 // 0.0.0.0/8 未指定
      || a === 10 // RFC1918
      || a === 127 // 回环
      || (a === 100 && b >= 64 && b <= 127) // CGNAT 100.64.0.0/10
      || (a === 169 && b === 254) // 链路本地（含云 metadata）
      || (a === 172 && b >= 16 && b <= 31) // RFC1918
      || (a === 192 && b === 168) // RFC1918
      || (a === 192 && b === 0) // IETF 保留
      || (a === 198 && (b === 18 || b === 19 || b === 51)) // 基准/保留
      || (a === 203 && b === 0) // 保留
      || a >= 224 // 组播 + 保留
    );
  }
  if (version === 6) {
    const lower = address.toLowerCase();
    if (lower === "::" || lower === "::1") return true;
    if (lower.startsWith("::ffff:")) {
      const embedded = lower.slice(7).split(".");
      if (embedded.length === 4) return isPrivateNetworkAddress(embedded.join("."));
      return true; // 非 IPv4 嵌入形式的 ::ffff:x —— 一律视为私网
    }
    return (
      lower.startsWith("fc") || lower.startsWith("fd") // ULA fc00::/7
      || lower.startsWith("fe8") || lower.startsWith("fe9")
      || lower.startsWith("fea") || lower.startsWith("feb") // 链路本地 fe80::/10
      || lower.startsWith("64:ff9b") // NAT64 前缀
      || lower.startsWith("2002:") // 6to4（可能映射私网）
    );
  }
  return false;
}

// 私网守卫：字面 IP 直接判定；域名则解析后按解析结果判定，堵住
// "127.0.0.1.nip.io" / 内部 DNS 名这类绕过。INKOS_AGENT_ALLOW_PRIVATE_URLS=1
// 显式放行（metadata 端点不受该开关影响，永远拒绝）。
export async function assertFetchUrlSafe(url: string | URL): Promise<void> {
  assertNotMetadataEndpoint(url);
  if (process.env.INKOS_AGENT_ALLOW_PRIVATE_URLS === "1") return;
  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return;
  }
  if (hostname.startsWith("[") && hostname.endsWith("]")) {
    hostname = hostname.slice(1, -1);
  }
  if (isIP(hostname)) {
    if (isPrivateNetworkAddress(hostname)) {
      throw new Error(`Blocked SSRF attempt to private network host: ${hostname}`);
    }
    return;
  }
  const addresses = await dnsLookup(hostname, { all: true }).catch(() => []);
  if (addresses.some((entry) => isPrivateNetworkAddress(entry.address))) {
    throw new Error(`Blocked SSRF attempt: ${hostname} resolves to a private address`);
  }
}

export function resolveProxyUrl(explicitProxyUrl?: string, env: ProxyEnv = process.env): string | undefined {
  const candidate = [
    explicitProxyUrl,
    env.INKOS_LLM_PROXY_URL,
    env.HTTPS_PROXY,
    env.https_proxy,
    env.HTTP_PROXY,
    env.http_proxy,
  ].find((value) => typeof value === "string" && value.trim().length > 0)?.trim();

  if (!candidate) return undefined;
  const parsed = new URL(candidate);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`Unsupported proxy protocol: ${parsed.protocol}`);
  }
  return candidate;
}

export function buildProxyFetchInit(
  init: RequestInit = {},
  explicitProxyUrl?: string,
  env: ProxyEnv = process.env,
): FetchInitWithDispatcher {
  const proxyUrl = resolveProxyUrl(explicitProxyUrl, env);
  if (!proxyUrl) return init;
  // undici 7 ProxyAgent's Dispatcher type no longer structurally matches the
  // undici-types 6.x bundled with @types/node; dispatcher is intentionally
  // untyped here (fetch accepts any dispatcher object).
  return {
    ...init,
    dispatcher: new ProxyAgent(proxyUrl) as unknown,
  } as FetchInitWithDispatcher;
}

export function fetchWithProxy(
  input: Parameters<typeof fetch>[0],
  init: RequestInit = {},
  explicitProxyUrl?: string,
  env: ProxyEnv = process.env,
): ReturnType<typeof fetch> {
  assertNotMetadataEndpoint(input as string | URL);
  return fetch(input, buildProxyFetchInit(init, explicitProxyUrl, env));
}
