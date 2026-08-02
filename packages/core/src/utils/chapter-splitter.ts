export interface SplitChapter {
  readonly title: string;
  readonly content: string;
}

const MAX_SPLIT_PATTERN_LENGTH = 512;

// 带嵌套无界量词或带量词的交替分支的正则可能触发指数级回溯（ReDoS，如
// (a+)+$、(a|aa)+），用户/模型可控的分割正则必须先过这道闸。启发式保守拒绝：
// 1. 分组内含无界量词（+、*、{m,}）且分组本身又被无界量词修饰；(a+)+、(a*)*
// 2. 分组内含交替且分组被无界量词修饰；(a|aa)+ 两个分支可能匹配同一前缀
// 有界量词（?、{2,4}）不会导致指数回溯，放行：(a+)?、(?:第\d+章)? 安全。
export function assertSafeRegexPattern(pattern: string): void {
  if (pattern.length > MAX_SPLIT_PATTERN_LENGTH) {
    throw new Error(`Split regex pattern is too long (max ${MAX_SPLIT_PATTERN_LENGTH} chars)`);
  }
  // 逐字符扫描：跟踪每个分组内是否出现无界量词/交替，并在分组被无界量词
  // 修饰时判定危险。跳过 \x 转义与 [字符类]。
  let depth = 0;
  const unboundedInside: boolean[] = [];
  const alternationInside: boolean[] = [];
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    if (ch === "\\") {
      i++;
      continue;
    }
    if (ch === "[") {
      while (i < pattern.length && pattern[i] !== "]") i++;
      continue;
    }
    if (ch === "(") {
      depth++;
      unboundedInside[depth] = false;
      alternationInside[depth] = false;
      continue;
    }
    if (ch === ")") {
      if (depth === 0) continue;
      const next = pattern[i + 1];
      let unboundedNext = next === "+" || next === "*";
      if (next === "{") {
        const end = pattern.indexOf("}", i + 1);
        if (end !== -1) unboundedNext = /^\d+\s*,\s*$/.test(pattern.slice(i + 2, end));
      }
      if (unboundedNext && (unboundedInside[depth] || alternationInside[depth])) {
        throw new Error("Split regex pattern is unsafe: nested unbounded quantifiers or quantified alternation are not allowed");
      }
      const childUnsafe = unboundedInside[depth] || alternationInside[depth] || unboundedNext;
      depth--;
      if (depth > 0 && childUnsafe) unboundedInside[depth] = true;
      continue;
    }
    if (depth > 0 && (ch === "+" || ch === "*")) {
      unboundedInside[depth] = true;
      continue;
    }
    if (depth > 0 && ch === "{") {
      const end = pattern.indexOf("}", i);
      if (end !== -1) {
        const range = pattern.slice(i + 1, end);
        if (range.endsWith(",") || /,\s*$/.test(range)) unboundedInside[depth] = true;
        i = end;
      }
      continue;
    }
    if (depth > 0 && ch === "|") {
      alternationInside[depth] = true;
    }
  }
}

/**
 * Split a single text file into chapters by matching title lines.
 *
 * Default pattern matches:
 * - "第一章 xxxx" / "第1章 xxxx"
 * - "第一回 xxxx" / "第1回 xxxx"
 * - "# 第1章 xxxx" / "## 第23章 xxxx"
 * - "CHAPTER I." / "CHAPTER II."
 *
 * Each match marks the start of a new chapter. Content between matches
 * belongs to the preceding chapter.
 */
export function splitChapters(
  text: string,
  pattern?: string,
): ReadonlyArray<SplitChapter> {
  const defaultPattern = /^#{0,2}\s*(?:第[零〇○Ｏ０一二三四五六七八九十百千万\d]+(?:章|回)(?:[:：]|\s+)?\s*(.*)|Chapter\s+(?:\d+|[IVXLCDM]+)(?:\.|:|\s+)?\s*(.*))/i;
  if (pattern) {
    assertSafeRegexPattern(pattern);
  }
  const regex = pattern ? new RegExp(pattern, "m") : defaultPattern;

  const lines = text.split("\n");
  const chapters: Array<{ title: string; startLine: number }> = [];

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i]!.match(regex);
    if (match) {
      chapters.push({
        title: (match[1] ?? match[2] ?? "").trim(),
        startLine: i,
      });
    }
  }

  if (chapters.length === 0) {
    return [];
  }

  const result: SplitChapter[] = [];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i]!;
    const nextStart = i + 1 < chapters.length ? chapters[i + 1]!.startLine : lines.length;

    // Content starts after the title line
    const contentLines = lines.slice(chapter.startLine + 1, nextStart);
    const content = stripTrailingLicense(contentLines.join("\n")).trim();

    result.push({
      title: chapter.title || inferFallbackTitle(lines[chapter.startLine] ?? "", i + 1),
      content,
    });
  }

  return result;
}

function stripTrailingLicense(content: string): string {
  const trailerMatch = content.match(/^\s*Project Gutenberg(?:™|\(TM\))?.*$/im);
  if (!trailerMatch || trailerMatch.index === undefined) {
    return content;
  }

  return content.slice(0, trailerMatch.index).trimEnd();
}

function inferFallbackTitle(headingLine: string, chapterNumber: number): string {
  if (/chapter\s+(?:\d+|[ivxlcdm]+)/i.test(headingLine)) {
    return `Chapter ${chapterNumber}`;
  }

  if (/第[零一二三四五六七八九十百千万\d]+回/.test(headingLine)) {
    return `第${chapterNumber}回`;
  }

  return `第${chapterNumber}章`;
}
