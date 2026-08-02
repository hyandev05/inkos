import { isAbsolute, relative, resolve } from "node:path";

export function safeChildPath(root: string, requestedPath: string): string {
  const resolvedRoot = resolve(root);
  const resolvedPath = resolve(resolvedRoot, requestedPath);
  const rel = relative(resolvedRoot, resolvedPath);
  if (rel === "" || (!rel.startsWith("..") && !isAbsolute(rel))) {
    return resolvedPath;
  }
  throw new Error(`Path traversal blocked: ${requestedPath}`);
}

/**
 * True when the resolved path points at project secrets or runtime internals:
 * anything under `.inkos/` (except `.inkos/uploads/*`, which is user-provided
 * material the agent may legitimately read) or any `.env` / `.env.*` file.
 * Callers that hand filesystem paths to untrusted content (agent file tools,
 * ingest) must reject these so secrets can never reach an LLM context or be
 * overwritten.
 */
export function isForbiddenSecretPath(projectRoot: string, resolvedPath: string): boolean {
  const rel = relative(resolve(projectRoot), resolve(resolvedPath)).replace(/\\/g, "/");
  if (rel === "" || rel.startsWith("..") || isAbsolute(rel)) {
    return false;
  }
  const parts = rel.split("/");
  if (parts[0] === ".inkos") {
    return parts[1] !== "uploads";
  }
  return parts.some((part) => part === ".env" || part.startsWith(".env."));
}
