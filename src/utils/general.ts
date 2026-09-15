const imageModules = import.meta.glob('/src/assets/images/*', { eager: true, import: 'default' })

/**
 * Resolves a project image filename to its bundled asset URL.
 *
 * WHY: Vite processes images at build time through its module system — hashing
 * filenames for cache-busting and optimising output. A plain string from a JSON
 * file bypasses that pipeline entirely, so you can't just use the string as an
 * <img> src and expect Vite to handle it. This function bridges the gap by
 * looking up the filename in a pre-built map of all eagerly-imported images.
 *
 * HOW: `import.meta.glob` is a Vite-specific API. At build time, Vite scans
 * the glob pattern, finds every matching file, and replaces the call with a
 * static map of { path: module }. With `eager: true`, the modules are resolved
 * immediately (no dynamic import needed at runtime). The resulting map is keyed
 * by the full root-relative path, so we construct that key from the filename.
 *
 * ALTERNATIVE: Move project images to the `public/` folder instead. Files
 * there are served as-is at the root URL with no processing, so a filename like
 * "conexia.png" in public/images/ becomes "/images/conexia.png" directly usable
 * as an <img> src — no imports, no map, no utility needed. The trade-off is
 * that public/ assets are NOT content-hashed, so browsers may cache stale
 * versions after an update unless you bust the cache manually.
 *
 * @example
 * // projects.json stores just the filename:
 * // { "image": "conexia.png" }
 *
 * const url = resolveProjectImage("conexia.png")
 * // → "/assets/conexia-Dh3k9xQz.png" (hashed at build time)
 *
 * <img src={resolveProjectImage(project.image) ?? undefined} />
 */
export function resolveProjectImage(filename: string | null): string | null {
  if (!filename) return null
  return (imageModules[`/src/assets/images/${filename}`] as string) ?? null
}
