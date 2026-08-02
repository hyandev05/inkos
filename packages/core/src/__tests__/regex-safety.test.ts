import { describe, expect, it } from "vitest";
import { assertSafeRegexPattern, splitChapters } from "../utils/chapter-splitter.js";

describe("assertSafeRegexPattern (ReDoS guard)", () => {
  it.each([
    "(a+)+$",
    "(a*)*",
    "(a|aa)+",
    "(?:ab|a)+",
    "((a)+)+",
    "(a|aa){1,}",
    "(?:[a-z]+|\\d+)+",
    "((ab|c)?)+",
  ])("rejects nested-unbounded-quantifier or quantified-alternation pattern %s", (pattern) => {
    expect(() => assertSafeRegexPattern(pattern)).toThrow(/unsafe/);
  });

  it.each([
    "第[一二三]章",
    "^#{0,2}\\s*第.+?章",
    "(chapter|Chapter)\\s+\\d+",
    "\\d{1,3}(?:\\.\\d+)?",
    "第(?:一|二|三)章",
    "(?:第\\d+章)?",
    "(a+)?",
    "(a{1,2})*",
  ])("allows plain linear pattern %s", (pattern) => {
    expect(() => assertSafeRegexPattern(pattern)).not.toThrow();
  });

  it("rejects oversized patterns", () => {
    expect(() => assertSafeRegexPattern("a".repeat(513))).toThrow(/too long/);
  });

  it("splitChapters applies the guard to caller-supplied patterns", () => {
    expect(() => splitChapters("正文".repeat(100), "(a+)+$")).toThrow(/unsafe/);
    const chapters = splitChapters("第1章 开头\n内容\n第2章 中段\n内容", "第[一二三四五六七八九十\\d]+章");
    expect(chapters.map((chapter) => chapter.title)).toEqual(["第1章", "第2章"]);
  });
});
