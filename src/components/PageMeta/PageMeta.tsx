const BASE_URL   = 'https://quickair.app';
const DEFAULT_IMG = `${BASE_URL}/og-image.png`;
const DEFAULT_DESC =
  "QuickAir is Nigeria's fastest flight booking platform for travel agencies. " +
  'Search, compare, and book domestic flights instantly with real-time availability.';

interface PageMetaProps {
  /** Full browser-tab title — e.g. "QuickAir | Book Flights" */
  title: string;
  description?: string;
  /** Absolute canonical URL — defaults to current origin + pathname */
  canonical?: string;
  /** Absolute URL of the OG share image */
  image?: string;
  /** Set true for auth and dashboard pages — adds noindex, nofollow */
  noIndex?: boolean;
  /** Schema.org JSON-LD object(s) — rendered as application/ld+json */
  jsonLd?: object | object[];
}

/**
 * React 19 document-metadata component.
 * <title>, <meta>, and <link> elements are automatically hoisted to <head>.
 * No external library required.
 */
const PageMeta = ({
  title,
  description = DEFAULT_DESC,
  canonical,
  image = DEFAULT_IMG,
  noIndex = false,
  jsonLd,
}: PageMetaProps) => {
  const url =
    canonical ??
    (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}`
      : BASE_URL);

  return (
    <>
      {/* ── Primary ── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow'}
      />
      <link rel="canonical" href={url} />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content="QuickAir" />
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── Structured data ── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </>
  );
};

export default PageMeta;
