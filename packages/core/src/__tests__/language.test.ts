import { describe, it, expect } from "vitest";
import { inferLanguage, toEnCompatLanguage } from "../utils/language.js";

describe("inferLanguage", () => {
  it("infers en for Latin-dominant briefs", () => {
    expect(inferLanguage("A detective investigates a murder in 1920s London.")).toBe("en");
  });

  it("infers zh for Chinese briefs", () => {
    expect(inferLanguage("一个修仙者重生回到宗门入门那年。")).toBe("zh");
  });

  it("stays zh when CJK dominates despite an English name", () => {
    expect(inferLanguage("主角叫 Jack，一部都市重生爽文。")).toBe("zh");
  });

  it("treats incidental CJK in an English brief as en", () => {
    expect(inferLanguage("A xianxia (修仙) progression story for Royal Road.")).toBe("en");
  });

  it("defaults to zh for empty or missing input", () => {
    expect(inferLanguage("")).toBe("zh");
    expect(inferLanguage(undefined)).toBe("zh");
    expect(inferLanguage(null)).toBe("zh");
  });

  it("infers vi for Vietnamese briefs with diacritics", () => {
    expect(inferLanguage("Một đêm mưa, cô gái trẻ tìm thấy cuốn nhật ký cũ của mẹ.")).toBe("vi");
    expect(inferLanguage("Truyện ngôn tình đô thị, nữ chính trả thù sau khi phát hiện sự thật.")).toBe("vi");
  });

  it("prefers vi over generic en when Vietnamese diacritics are present", () => {
    expect(inferLanguage("Cô ấy là một bác sĩ ở Hà Nội, chuyên về tim mạch.")).toBe("vi");
  });
});

describe("toEnCompatLanguage", () => {
  it("maps vi and en to en, zh to zh", () => {
    expect(toEnCompatLanguage("vi")).toBe("en");
    expect(toEnCompatLanguage("en")).toBe("en");
    expect(toEnCompatLanguage("zh")).toBe("zh");
    expect(toEnCompatLanguage(undefined)).toBe("zh");
  });
});
