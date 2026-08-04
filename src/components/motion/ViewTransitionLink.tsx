"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { cn } from "@/lib/cn";
import { navigateWithViewTransition } from "@/lib/view-transitions";

type ViewTransitionLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

/**
 * Client navigation wrapped in View Transitions when supported.
 * Falls back to normal Next.js navigation under reduced motion / unsupported browsers.
 */
export function ViewTransitionLink({
  href,
  children,
  className,
  replace,
  scroll,
  onNavigate,
  ...rest
}: ViewTransitionLinkProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotionPreference();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const url = typeof href === "string" ? href : href.pathname;
      if (!url || url.startsWith("http") || url.startsWith("mailto:")) {
        return;
      }

      event.preventDefault();
      onNavigate?.();

      navigateWithViewTransition(
        () => {
          if (replace) {
            router.replace(url, { scroll });
          } else {
            router.push(url, { scroll });
          }
        },
        { reducedMotion },
      );
    },
    [href, onNavigate, reducedMotion, replace, router, scroll],
  );

  return (
    <Link href={href} className={cn(className)} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
