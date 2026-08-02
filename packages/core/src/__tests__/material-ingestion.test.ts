import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ingestMaterial } from "../materials/ingest.js";

describe("material ingestion", () => {
  let root: string;

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "inkos-material-ingest-"));
  });

  afterEach(async () => {
    await rm(root, { recursive: true, force: true });
  });

  it("archives a project text file as traceable markdown material", async () => {
    await writeFile(join(root, "brief.md"), "# Brief\n\n第一人称，县城冷库旧账。", "utf-8");

    const asset = await ingestMaterial(root, {
      sourceKind: "file",
      filePath: "brief.md",
      mimeType: "text/markdown",
      purpose: "worldbuilding",
    }, {
      now: () => new Date("2026-07-03T00:00:00.000Z"),
    });

    expect(asset.kind).toBe("text");
    expect(asset.markdownPath).toMatch(/^\.inkos\/materials\//);
    expect(asset.source).toBe("brief.md");
    expect(asset.excerpt).toContain("县城冷库旧账");
    const markdown = await readFile(join(root, asset.markdownPath), "utf-8");
    expect(markdown).toContain("## Metadata");
    expect(markdown).toContain("- purpose: worldbuilding");
    expect(markdown).toContain("第一人称，县城冷库旧账。");
    const manifest = JSON.parse(await readFile(join(root, asset.manifestPath), "utf-8")) as { markdownPath?: string };
    expect(manifest.markdownPath).toBe(asset.markdownPath);
  });

  it("extracts and archives HTML fetched from a URL", async () => {
    const fetchImpl = async () => new Response(
      "<html><head><title>旧账资料</title><style>x{}</style></head><body><h1>冷库流程</h1><script>bad()</script><p>入库单需要签字。</p></body></html>",
      { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
    );

    const asset = await ingestMaterial(root, {
      sourceKind: "url",
      url: "https://example.com/cold-storage",
      purpose: "research",
    }, {
      fetch: fetchImpl as typeof fetch,
      now: () => new Date("2026-07-03T00:00:00.000Z"),
    });

    expect(asset.kind).toBe("webpage");
    expect(asset.title).toBe("旧账资料");
    expect(asset.source).toBe("https://example.com/cold-storage");
    expect(asset.excerpt).toContain("入库单需要签字");
    expect(asset.excerpt).not.toContain("bad()");
  });

  it("rejects project secrets such as .inkos/secrets.json", async () => {
    await mkdir(join(root, ".inkos"), { recursive: true });
    await writeFile(join(root, ".inkos", "secrets.json"), "{\"apiKey\":\"top-secret\"}", "utf-8");

    await expect(ingestMaterial(root, {
      sourceKind: "file",
      filePath: ".inkos/secrets.json",
      mimeType: "application/json",
      purpose: "research",
    }, {
      now: () => new Date("2026-07-03T00:00:00.000Z"),
    })).rejects.toThrow(/cannot read project secrets/);
  });

  it("rejects .env files", async () => {
    await writeFile(join(root, ".env"), "API_KEY=top-secret", "utf-8");

    await expect(ingestMaterial(root, {
      sourceKind: "file",
      filePath: ".env",
      mimeType: "text/plain",
      purpose: "research",
    }, {
      now: () => new Date("2026-07-03T00:00:00.000Z"),
    })).rejects.toThrow(/cannot read project secrets/);
  });

  it("blocks URL ingestion of cloud metadata endpoints", async () => {
    const fetchImpl = vi.fn(async () => new Response("", { status: 200 }));

    await expect(ingestMaterial(root, {
      sourceKind: "url",
      url: "http://169.254.169.254/latest/meta-data/",
      purpose: "research",
    }, {
      fetch: fetchImpl as unknown as typeof fetch,
      now: () => new Date("2026-07-03T00:00:00.000Z"),
    })).rejects.toThrow(/metadata endpoint/);

    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
