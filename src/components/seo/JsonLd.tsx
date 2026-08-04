type JsonLdProps = {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
};

/**
 * Emits JSON-LD. Data is built from verified portfolio content only —
 * never interpolate untrusted user HTML.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload.length === 1 ? payload[0] : payload),
      }}
    />
  );
}
