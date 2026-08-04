import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";
import { createPageMetadata, getSiteUrlOrNull } from "@/lib/metadata";
import {
  DEVELOPMENT_ONLY_ROUTES,
  getPublicSitemapPaths,
  isDevelopmentOnlyRoute,
} from "@/lib/site-routes";
import {
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
  buildProjectJsonLd,
} from "@/lib/structured-data";

describe("createPageMetadata", () => {
  it("omits canonical and metadataBase when siteUrl is unconfigured", () => {
    expect(getSiteUrlOrNull()).toBeNull();
    const metadata = createPageMetadata({
      title: "About",
      path: "/about",
    });

    expect(metadata.title).toBe("About — Keren Schoss");
    expect(metadata.alternates?.canonical).toBeUndefined();
    expect(metadata.metadataBase).toBeUndefined();
    expect(metadata.openGraph?.url).toBeUndefined();
  });

  it("never invents example.com or localhost canonicals", () => {
    const metadata = createPageMetadata({ path: "/work" });
    const serialized = JSON.stringify(metadata);
    expect(serialized).not.toMatch(/example\.com/i);
    expect(serialized).not.toMatch(/localhost/i);
  });
});

describe("site routes", () => {
  it("includes public routes and every case-study slug", () => {
    const paths = getPublicSitemapPaths();
    expect(paths).toEqual(
      expect.arrayContaining([
        "/",
        "/work",
        "/about",
        "/contact",
        "/work/clinical-follow-up-detector",
        "/work/academease",
        "/work/realtime-gpt-cli",
        "/work/taptap-avengers",
        "/work/overthewire-bandit",
        "/work/atlas-research",
      ]),
    );
    expect(paths).toHaveLength(4 + projects.length);
  });

  it("excludes development-only routes", () => {
    const paths = getPublicSitemapPaths();
    for (const route of DEVELOPMENT_ONLY_ROUTES) {
      expect(paths).not.toContain(route);
      expect(isDevelopmentOnlyRoute(route)).toBe(true);
    }
  });
});

describe("structured data", () => {
  it("builds Person JSON-LD with configured social links and no fake images", () => {
    const person = buildPersonJsonLd();
    expect(person["@type"]).toBe("Person");
    expect(person.name).toBe("Keren Schoss");
    expect(person.jobTitle).toBe("Frontend & Full-Stack Developer");
    expect(person.sameAs).toEqual([
      "https://github.com/kerenschoss369",
      "https://www.linkedin.com/in/kerenschoss/",
    ]);
    expect(person.url).toBeUndefined();
    expect(person.image).toBeUndefined();
    expect(JSON.stringify(person)).not.toMatch(/example\.com/i);
  });

  it("omits repository URLs when unconfigured and avoids open-source claim", () => {
    const project = projects.find((item) => item.slug === "academease");
    expect(project).toBeDefined();
    const jsonLd = buildProjectJsonLd(project!);
    expect(jsonLd["@type"]).toBe("CreativeWork");
    expect(jsonLd.codeRepository).toBeUndefined();
    expect(JSON.stringify(jsonLd)).not.toMatch(/github\.com/i);
  });

  it("keeps clinical structured data as a demonstration, not a medical device", () => {
    const project = projects.find(
      (item) => item.slug === "clinical-follow-up-detector",
    );
    expect(project).toBeDefined();
    const jsonLd = buildProjectJsonLd(project!);
    const serialized = JSON.stringify(jsonLd);
    expect(serialized).toMatch(/Demonstration system only/i);
    expect(serialized).toMatch(/not clinically validated/i);
    expect(serialized.toLowerCase()).not.toContain("medical device");
    expect(serialized.toLowerCase()).not.toContain("fda");
    expect(jsonLd["@type"]).toBe("SoftwareSourceCode");
    expect(jsonLd.codeRepository).toBe(
      "https://github.com/kerenschoss369/clinical-follow-up-detector",
    );
  });

  it("builds breadcrumbs matching visible work navigation", () => {
    const crumbs = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: "AcademEase", path: "/work/academease" },
    ]);
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    const items = crumbs.itemListElement as Array<{ name: string }>;
    expect(items.map((item) => item.name)).toEqual([
      "Home",
      "Work",
      "AcademEase",
    ]);
  });
});
