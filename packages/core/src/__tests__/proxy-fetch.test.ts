import { afterEach, describe, expect, it, vi } from "vitest";

const proxyAgentMock = vi.fn((url: string) => ({ kind: "proxy-agent", url }));

vi.mock("undici", () => ({
  ProxyAgent: proxyAgentMock,
}));

describe("proxy fetch helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("prefers explicit llm proxyUrl over environment proxy variables", async () => {
    const { fetchWithProxy, resolveProxyUrl } = await import("../utils/proxy-fetch.js");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const env = {
      INKOS_LLM_PROXY_URL: "http://inkos-env-proxy:9910",
      HTTPS_PROXY: "http://standard-proxy:9910",
    };

    expect(resolveProxyUrl("http://explicit-proxy:9910", env)).toBe("http://explicit-proxy:9910");
    await fetchWithProxy("https://api.example/v1/chat/completions", { method: "POST" }, "http://explicit-proxy:9910", env);

    expect(proxyAgentMock).toHaveBeenCalledWith("http://explicit-proxy:9910");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        dispatcher: { kind: "proxy-agent", url: "http://explicit-proxy:9910" },
      }),
    );
  });

  it("uses INKOS_LLM_PROXY_URL before standard HTTPS_PROXY/HTTP_PROXY env vars", async () => {
    const { fetchWithProxy, resolveProxyUrl } = await import("../utils/proxy-fetch.js");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const env = {
      INKOS_LLM_PROXY_URL: "http://inkos-proxy:9910",
      HTTPS_PROXY: "http://standard-proxy:9910",
      HTTP_PROXY: "http://http-proxy:9910",
    };

    expect(resolveProxyUrl(undefined, env)).toBe("http://inkos-proxy:9910");
    await fetchWithProxy("https://api.example/v1/models", {}, undefined, env);

    expect(proxyAgentMock).toHaveBeenCalledWith("http://inkos-proxy:9910");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example/v1/models",
      expect.objectContaining({
        dispatcher: { kind: "proxy-agent", url: "http://inkos-proxy:9910" },
      }),
    );
  });

  it("does not attach a dispatcher when no proxy is configured", async () => {
    const { fetchWithProxy, resolveProxyUrl } = await import("../utils/proxy-fetch.js");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    expect(resolveProxyUrl(undefined, {})).toBeUndefined();
    await fetchWithProxy("https://api.example/v1/models", { headers: { Authorization: "Bearer test" } }, undefined, {});

    expect(proxyAgentMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.example/v1/models",
      { headers: { Authorization: "Bearer test" } },
    );
  });

  it.each([
    ["169.254.169.254", "http://169.254.169.254/latest/meta-data/"],
    ["169.254.170.2", "http://169.254.170.2/credentials"],
    ["100.100.100.200", "http://100.100.100.200/latest/meta-data/"],
    ["metadata.google.internal", "http://metadata.google.internal/computeMetadata/v1/"],
  ])("blocks SSRF to the %s metadata endpoint", async (_, url) => {
    const { fetchWithProxy } = await import("../utils/proxy-fetch.js");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    expect(() => fetchWithProxy(url, {}, undefined, {})).toThrow(/metadata endpoint/);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("allows ordinary private LAN hosts used by local LLMs", async () => {
    const { fetchWithProxy } = await import("../utils/proxy-fetch.js");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    await fetchWithProxy("http://127.0.0.1:11434/v1/models", {}, undefined, {});
    expect(fetchMock).toHaveBeenCalled();
  });

  it.each([
    ["loopback IPv4", "http://127.0.0.1:4567/api/v1/cover/secret/openai"],
    ["RFC1918 IPv4", "http://10.0.0.5/private"],
    ["RFC1918 172.16-31", "http://172.16.4.9/private"],
    ["RFC1918 192.168", "http://192.168.1.1/private"],
    ["link-local IPv4", "http://169.254.5.5/private"],
    ["CGNAT", "http://100.64.0.1/private"],
    ["loopback IPv6", "http://[::1]:4567/api/v1/cover/secret/openai"],
    ["IPv4-mapped IPv6", "http://[::ffff:127.0.0.1]:4567/private"],
    ["ULA IPv6", "http://[fd00::1]/private"],
  ])("blocks agent fetches to %s", async (_, url) => {
    const { assertFetchUrlSafe } = await import("../utils/proxy-fetch.js");

    await expect(assertFetchUrlSafe(url)).rejects.toThrow(/private network/);
  });

  it("allows public hosts when resolving through DNS", async () => {
    const { assertFetchUrlSafe } = await import("../utils/proxy-fetch.js");
    await expect(assertFetchUrlSafe("https://api.openai.com/v1/models")).resolves.toBeUndefined();
  });

  it("honours INKOS_AGENT_ALLOW_PRIVATE_URLS=1 while still blocking metadata endpoints", async () => {
    process.env.INKOS_AGENT_ALLOW_PRIVATE_URLS = "1";
    try {
      const { assertFetchUrlSafe } = await import("../utils/proxy-fetch.js");
      await expect(assertFetchUrlSafe("http://127.0.0.1:4567/api/v1/cover/secret/openai")).resolves.toBeUndefined();
      await expect(assertFetchUrlSafe("http://169.254.169.254/latest/meta-data/")).rejects.toThrow(/metadata endpoint/);
    } finally {
      delete process.env.INKOS_AGENT_ALLOW_PRIVATE_URLS;
    }
  });
});
