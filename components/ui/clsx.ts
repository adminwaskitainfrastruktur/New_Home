/** Minimal class joiner — swap for `clsx`/`tailwind-merge` if already in the codebase. */
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
