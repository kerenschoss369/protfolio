import { describe, expect, it } from "vitest";

import {
  filterMaterials,
  courseMaterials,
  getSchedule,
  summarizeSchedule,
} from "@/components/demos/academease/academease-data";

describe("academease demo data", () => {
  it("switches between two fictional schedules with different summaries", () => {
    const a = summarizeSchedule(getSchedule("A"));
    const b = summarizeSchedule(getSchedule("B"));
    expect(a.studyDays).toBe(4);
    expect(b.studyDays).toBe(4);
    expect(a.earliestStart).toBe("09:00");
    expect(b.earliestStart).toBe("08:00");
  });

  it("filters course materials and supports empty results", () => {
    expect(filterMaterials(courseMaterials, "exam")).toHaveLength(1);
    expect(filterMaterials(courseMaterials, "summary")).toHaveLength(1);
    expect(filterMaterials([], "practice")).toHaveLength(0);
    expect(filterMaterials(courseMaterials, "all")).toHaveLength(4);
  });
});
