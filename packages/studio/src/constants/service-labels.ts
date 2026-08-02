import { getAppLanguage, tr } from "../lib/app-language";

// Provider label localization. The core provider bank (packages/core) returns a
// single hard-coded label per service — mostly Chinese — that is shared by the
// CLI, TUI, and Studio. Instead of mutating core (which would leak Vietnamese
// into Chinese/English CLI output), Studio maps each service id to a
// zh/en/vi label and overrides the display at render time based on the current
// app language. Falling back to the server-provided label keeps unknown /
// custom services untouched.
const SERVICE_LABELS: Record<string, { zh: string; en: string; vi: string }> = {
    ai360: { zh: "360 智脑", en: "360 AI", vi: "360 AI" },
    anthropic: { zh: "Anthropic", en: "Anthropic", vi: "Anthropic" },
    astronCodingPlan: {
        zh: "讯飞星辰 Astron Coding Plan",
        en: "iFlytek Xingchen Astron Coding Plan",
        vi: "iFlytek Xingchen Astron Coding Plan",
    },
    baichuan: { zh: "百川智能", en: "Baichuan", vi: "Baichuan" },
    bailian: { zh: "百炼 (通义千问)", en: "Bailian (Qwen)", vi: "Bailian (Qwen)" },
    bailianCodingPlan: { zh: "百炼 Coding Plan", en: "Bailian Coding Plan", vi: "Bailian Coding Plan" },
    custom: { zh: "自定义端点", en: "Custom endpoint", vi: "Điểm cuối tùy chỉnh" },
    deepseek: { zh: "DeepSeek", en: "DeepSeek", vi: "DeepSeek" },
    giteeai: { zh: "Gitee AI", en: "Gitee AI", vi: "Gitee AI" },
    githubCopilot: { zh: "GitHub Copilot", en: "GitHub Copilot", vi: "GitHub Copilot" },
    glmCodingPlan: { zh: "GLM Coding Plan", en: "GLM Coding Plan", vi: "GLM Coding Plan" },
    google: { zh: "Google Gemini", en: "Google Gemini", vi: "Google Gemini" },
    hunyuan: { zh: "腾讯混元", en: "Tencent Hunyuan", vi: "Tencent Hunyuan" },
    infiniai: { zh: "无问芯穹 InfiniAI", en: "InfiniAI", vi: "InfiniAI" },
    internlm: { zh: "书生浦语 (InternLM)", en: "InternLM", vi: "InternLM" },
    kimicode: { zh: "Kimi Code", en: "Kimi Code", vi: "Kimi Code" },
    kimiCodingPlan: { zh: "Kimi Coding Plan", en: "Kimi Coding Plan", vi: "Kimi Coding Plan" },
    kkaiapi: { zh: "kkaiapi", en: "kkaiapi", vi: "kkaiapi" },
    lmstudio: { zh: "LM Studio (本地)", en: "LM Studio (local)", vi: "LM Studio (cục bộ)" },
    longcat: { zh: "美团 LongCat", en: "Meituan LongCat", vi: "Meituan LongCat" },
    minimax: { zh: "MiniMax", en: "MiniMax", vi: "MiniMax" },
    minimaxCodingPlan: { zh: "MiniMax Coding Plan", en: "MiniMax Coding Plan", vi: "MiniMax Coding Plan" },
    mistral: { zh: "Mistral AI", en: "Mistral AI", vi: "Mistral AI" },
    modelscope: { zh: "魔搭社区 ModelScope", en: "ModelScope", vi: "ModelScope" },
    moonshot: { zh: "Moonshot (Kimi)", en: "Moonshot (Kimi)", vi: "Moonshot (Kimi)" },
    newapi: { zh: "New API (中转网关)", en: "New API (relay)", vi: "New API (cổng trung chuyển)" },
    ollama: { zh: "Ollama (本地)", en: "Ollama (local)", vi: "Ollama (cục bộ)" },
    openai: { zh: "OpenAI", en: "OpenAI", vi: "OpenAI" },
    opencodeCodingPlan: { zh: "OpenCode Coding Plan", en: "OpenCode Coding Plan", vi: "OpenCode Coding Plan" },
    openrouter: { zh: "OpenRouter", en: "OpenRouter", vi: "OpenRouter" },
    ppio: { zh: "PPIO", en: "PPIO", vi: "PPIO" },
    qiniu: { zh: "七牛云 AI", en: "Qiniu AI", vi: "Qiniu AI" },
    sensenova: { zh: "商汤日日新", en: "SenseNova", vi: "SenseNova" },
    siliconcloud: { zh: "硅基流动", en: "SiliconFlow", vi: "SiliconFlow" },
    spark: { zh: "讯飞星火", en: "iFlytek Spark", vi: "iFlytek Spark" },
    stepfun: { zh: "阶跃星辰", en: "StepFun", vi: "StepFun" },
    tencentcloud: { zh: "腾讯云 (lkeap)", en: "Tencent Cloud (lkeap)", vi: "Tencent Cloud (lkeap)" },
    volcengine: { zh: "火山引擎 (豆包)", en: "Volcengine (Doubao)", vi: "Volcengine (Doubao)" },
    volcengineCodingPlan: { zh: "火山 Coding Plan", en: "Volcengine Coding Plan", vi: "Volcengine Coding Plan" },
    wenxin: { zh: "文心一言 (千帆)", en: "ERNIE (Qianfan)", vi: "ERNIE (Qianfan)" },
    xai: { zh: "xAI (Grok)", en: "xAI (Grok)", vi: "xAI (Grok)" },
    xiaomimimo: { zh: "小米 MiMo", en: "Xiaomi MiMo", vi: "Xiaomi MiMo" },
    zeroone: { zh: "零一万物 (01.AI)", en: "01.AI", vi: "01.AI" },
    zhipu: { zh: "智谱 GLM", en: "Zhipu GLM", vi: "Zhipu GLM" },
};

/**
 * Resolve a localized label for a provider service id.
 * - vi → Vietnamese label
 * - en → English label
 * - zh (or anything else) → the original server-provided label, so Chinese
 *   users see exactly what core returns and custom/unknown services keep their
 *   user-defined name.
 */
export function localizeServiceLabel(serviceId: string, fallbackLabel: string): string {
    const entry = SERVICE_LABELS[serviceId];
    if (!entry) return fallbackLabel;
    const lang = getAppLanguage();
    if (lang === "vi") return entry.vi;
    if (lang === "en") return entry.en;
    return fallbackLabel;
}

/**
 * Same as localizeServiceLabel but via tr() for call sites that pass a
 * zh/en pair directly (kept for symmetry with other tr() usage).
 */
export function serviceLabelTr(serviceId: string, fallbackLabel: string): string {
    const entry = SERVICE_LABELS[serviceId];
    if (!entry) return fallbackLabel;
    return tr(entry.zh, entry.en, entry.vi);
}
