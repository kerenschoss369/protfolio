import Link from "next/link";
import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Page not found",
    description:
      "The requested page was not found. Return home or browse selected work by Keren Schoss.",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl tracking-tight">Page not found</h1>
      <p className="max-w-xl text-[var(--muted)]">
        The page you requested does not exist. Return home or browse selected
        work.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-[var(--accent)] px-4 text-[var(--accent-contrast)]"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] px-4"
        >
          Work
        </Link>
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-md border border-[var(--border-strong)] px-4"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
