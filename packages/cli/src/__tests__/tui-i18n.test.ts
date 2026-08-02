import { describe, expect, it } from "vitest";
import { formatModeLabel, getTuiCopy, normalizeStageLabel, resolveTuiLocale } from "../tui/i18n.js";

describe("tui i18n", () => {
  it("defaults to Chinese and supports explicit English override", () => {
    expect(resolveTuiLocale({})).toBe("zh-CN");
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "en" })).toBe("en");
    expect(resolveTuiLocale({ LANG: "en_US.UTF-8" })).toBe("en");
    expect(resolveTuiLocale({}, "en")).toBe("en");
  });

  it("supports Vietnamese via env and project language", () => {
    expect(resolveTuiLocale({ INKOS_TUI_LOCALE: "vi" })).toBe("vi");
    expect(resolveTuiLocale({ LANG: "vi_VN.UTF-8" })).toBe("vi");
    expect(resolveTuiLocale({}, "vi")).toBe("vi");
  });

  it("normalizes activity labels for Vietnamese chrome", () => {
    const copy = getTuiCopy("vi");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("đang viết");
    expect(normalizeStageLabel("waiting_human", copy)).toBe("chờ quyết định của bạn");
    expect(normalizeStageLabel("idle", copy)).toBe("Sẵn sàng");
    expect(formatModeLabel("semi", copy)).toBe("bán tự động");
    expect(copy.composer.placeholder).toContain("InkOS");
  });

  it("normalizes common activity labels for Chinese chrome", () => {
    const copy = getTuiCopy("zh-CN");
    expect(normalizeStageLabel("writing chapter", copy)).toBe("写作中");
    expect(normalizeStageLabel("thinking ...", copy)).toBe("思考中");
    expect(normalizeStageLabel("idle", copy)).toBe("就绪");
    expect(normalizeStageLabel("waiting_human", copy)).toBe("等待你的决定");
    expect(normalizeStageLabel("completed", copy)).toBe("已完成");
    expect(formatModeLabel("semi", copy)).toBe("半自动");
    expect(formatModeLabel("auto", copy)).toBe("自动");
  });
});
