export type WritingLanguage = "zh" | "en" | "vi";

/**
 * Collapse a writing language to the two branches the legacy prompt helpers
 * support ("zh" | "en"). Vietnamese is Latin-script, so it maps to "en" for
 * those helpers; call sites that own a dedicated Vietnamese override (writer
 * prompt, architect foundation, agent system prompt) should NOT use this and
 * instead pass "vi" through so their override block applies.
 */
export function toEnCompatLanguage(language: WritingLanguage | undefined): "zh" | "en" {
  return language === "en" || language === "vi" ? "en" : "zh";
}

// Vietnamese-specific diacritic letters. Plain Latin text (e.g. "A detective")
// stays "en"; text carrying Vietnamese tone marks / đ/ư/ơ etc. resolves to "vi".
const VIETNAMESE_RE =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđĐ]/;

/**
 * Infer the writing language from a free-text brief/premise when the user did not set one explicitly.
 *
 * Conservative by design: defaults to "zh" (preserving prior behaviour for Chinese users), then
 * "vi" when the text carries Vietnamese diacritics, and "en" only when the text is clearly
 * Latin-dominant without Vietnamese markers. A Chinese brief that mentions an English name or term
 * still resolves to "zh"; incidental CJK inside an otherwise English brief resolves to "en".
 */
export function inferLanguage(text?: string | null): WritingLanguage {
  const t = text ?? "";
  const cjk = (t.match(/[一-鿿]/g) ?? []).length;
  const latin = (t.match(/[A-Za-zÀ-ỹ]/g) ?? []).length;
  // Vietnamese diacritics are a strong signal; even mixed text with a couple of
  // tone marks should prefer "vi" over the generic Latin → "en" fallback.
  if (VIETNAMESE_RE.test(t)) return "vi";
  if (cjk === 0 && latin > 0) return "en";
  if (latin > 0 && cjk * 4 < latin) return "en";
  return "zh";
}
