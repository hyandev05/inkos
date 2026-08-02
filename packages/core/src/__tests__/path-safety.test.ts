import { describe, expect, it } from "vitest";
import { join, resolve } from "node:path";
import { isForbiddenSecretPath, safeChildPath } from "../utils/path-safety.js";

describe("path safety", () => {
  const root = resolve("/tmp/inkos/books");

  it("allows paths inside the root", () => {
    expect(safeChildPath(root, "book-a/story/book_rules.md"))
      .toBe(join(root, "book-a/story/book_rules.md"));
  });

  it("blocks parent traversal", () => {
    expect(() => safeChildPath(root, "../books2/secret.md"))
      .toThrow("Path traversal blocked");
  });

  it("blocks sibling-prefix bypasses", () => {
    expect(() => safeChildPath(root, "/tmp/inkos/books2/secret.md"))
      .toThrow("Path traversal blocked");
  });
});

describe("isForbiddenSecretPath", () => {
  const root = resolve("/tmp/inkos/books");

  it("allows normal project files", () => {
    expect(isForbiddenSecretPath(root, join(root, "book-a/story/book_rules.md"))).toBe(false);
  });

  it("blocks .inkos internals but allows user uploads", () => {
    expect(isForbiddenSecretPath(root, join(root, ".inkos/secrets.json"))).toBe(true);
    expect(isForbiddenSecretPath(root, join(root, ".inkos/runtime/session.json"))).toBe(true);
    expect(isForbiddenSecretPath(root, join(root, ".inkos/uploads/cover.png"))).toBe(false);
  });

  it("blocks .env files anywhere in the project", () => {
    expect(isForbiddenSecretPath(root, join(root, ".env"))).toBe(true);
    expect(isForbiddenSecretPath(root, join(root, "book-a/.env.local"))).toBe(true);
  });

  it("allows unrelated dotfiles", () => {
    expect(isForbiddenSecretPath(root, join(root, ".gitignore"))).toBe(false);
    expect(isForbiddenSecretPath(root, join(root, "book-a/.editorconfig"))).toBe(false);
  });
});
