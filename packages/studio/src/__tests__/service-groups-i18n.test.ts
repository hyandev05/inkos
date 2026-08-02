import { describe, it, expect, afterEach } from "vitest";
import { setAppLanguage } from "../lib/app-language";
import { getGroupDescription, getGroupLabel, getGroupShortLabel } from "../constants/service-groups";
import { getServiceQuickLinks } from "../components/ServiceQuickLinks";
import { localizeServiceLabel, serviceLabelTr } from "../constants/service-labels";

// 每条用例结束后恢复默认语言，避免污染其他测试。
afterEach(() => {
  setAppLanguage("zh");
});

describe("service-groups i18n", () => {
  it("默认（zh）返回中文标签", () => {
    expect(getGroupLabel("overseas")).toBe("海外原厂");
    expect(getGroupShortLabel("aggregator")).toBe("聚合");
    expect(getGroupDescription("aggregator")).toContain("聚合国内外主流模型");
    expect(getGroupDescription("overseas")).toBeNull();
  });

  it("切换到 en 后返回英文标签", () => {
    setAppLanguage("en");
    expect(getGroupLabel("overseas")).toBe("International providers");
    expect(getGroupShortLabel("aggregator")).toBe("Aggregator");
    expect(getGroupDescription("aggregator")).toContain("one API key");
  });

  it("切换到 vi 后返回越南语标签", () => {
    setAppLanguage("vi");
    expect(getGroupLabel("overseas")).toBe("Nhà cung cấp quốc tế");
    expect(getGroupShortLabel("aggregator")).toBe("Tổng hợp");
    expect(getGroupDescription("aggregator")).toContain("một API key");
    expect(getGroupLabel("codingPlan")).toBe("CodingPlan");
  });
});

describe("service quick links i18n", () => {
  it("默认（zh）返回中文标签，en 分支返回英文标签，href 不变", () => {
    const zhLinks = getServiceQuickLinks("kkaiapi");
    expect(zhLinks.map((l) => l.label)).toEqual(["官网", "API 文档", "模型/价格"]);

    setAppLanguage("en");
    const enLinks = getServiceQuickLinks("kkaiapi");
    expect(enLinks.map((l) => l.label)).toEqual(["Website", "API docs", "Models & pricing"]);
    expect(enLinks.map((l) => l.href)).toEqual(zhLinks.map((l) => l.href));
  });

  it("切换到 vi 后返回越南语链接标签，href 不变", () => {
    setAppLanguage("vi");
    const viLinks = getServiceQuickLinks("kkaiapi");
    expect(viLinks.map((l) => l.label)).toEqual(["Website", "Tài liệu API", "Mô hình & giá"]);
    expect(viLinks.map((l) => l.href)).toEqual([
      "https://kkaiapi.com/",
      "https://kkaiapi.com/docs",
      "https://kkaiapi.com/models",
    ]);
  });
});

describe("service label localization", () => {
  it("zh 分支返回服务商提供的原始 label（fallback）", () => {
    expect(localizeServiceLabel("siliconcloud", "硅基流动")).toBe("硅基流动");
    expect(localizeServiceLabel("baichuan", "百川智能")).toBe("百川智能");
    expect(localizeServiceLabel("custom:My", "My Service")).toBe("My Service");
  });

  it("en 分支返回英文 label", () => {
    setAppLanguage("en");
    expect(localizeServiceLabel("siliconcloud", "硅基流动")).toBe("SiliconFlow");
    expect(localizeServiceLabel("hunyuan", "腾讯混元")).toBe("Tencent Hunyuan");
    expect(localizeServiceLabel("unknown-service", "Original")).toBe("Original");
  });

  it("vi 分支返回越南语 label，未知服务保留 fallback", () => {
    setAppLanguage("vi");
    expect(localizeServiceLabel("siliconcloud", "硅基流动")).toBe("SiliconFlow");
    expect(localizeServiceLabel("baichuan", "百川智能")).toBe("Baichuan");
    expect(localizeServiceLabel("hunyuan", "腾讯混元")).toBe("Tencent Hunyuan");
    expect(localizeServiceLabel("custom:My", "My Service")).toBe("My Service");
  });

  it("serviceLabelTr 与 localizeServiceLabel 在 vi 下一致", () => {
    setAppLanguage("vi");
    expect(serviceLabelTr("zhipu", "智谱 GLM")).toBe("Zhipu GLM");
    expect(serviceLabelTr("ollama", "Ollama (本地)")).toBe("Ollama (cục bộ)");
  });
});
