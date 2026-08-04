export type AcademEaseLanguage = "en" | "he";

export type ScheduleId = "A" | "B";

export type CourseMaterialKind = "exam" | "summary" | "qa" | "practice";

export type MaterialFilter = "all" | CourseMaterialKind;

export type ScheduleSlot = {
  id: string;
  dayKey: "sun" | "mon" | "tue" | "wed" | "thu";
  start: string;
  end: string;
  courseKey:
    "algorithms" | "databases" | "os" | "calculus" | "hci" | "networks";
};

export type CourseMaterial = {
  id: string;
  courseKey: "algorithms" | "databases" | "os" | "calculus";
  kind: CourseMaterialKind;
};

export const academeaseUiCopy = {
  en: {
    languageLabel: "Language",
    scheduleLabel: "Saved schedule",
    scheduleA: "Schedule A",
    scheduleB: "Schedule B",
    summaryLabel: "Comparison summary",
    studyDays: "Study days",
    earliestStart: "Earliest start",
    materialsLabel: "Course materials",
    filterLabel: "Filter materials",
    filters: {
      all: "All",
      exam: "Exams",
      summary: "Summaries",
      qa: "Questions and answers",
      practice: "Practice",
    } as Record<MaterialFilter, string>,
    emptyMaterials: "No materials match this filter.",
    fictionalNote: "Fictional academic data for portfolio demonstration only.",
    days: {
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
    },
    courses: {
      algorithms: "Algorithms",
      databases: "Databases",
      os: "Operating Systems",
      calculus: "Calculus",
      hci: "HCI",
      networks: "Networks",
    },
    materialTitles: {
      "algorithms-exam": "Algorithms — Past exam",
      "databases-summary": "Databases — Summary",
      "os-qa": "Operating Systems — Questions and answers",
      "calculus-practice": "Calculus — Practice sheet",
    } as Record<string, string>,
  },
  he: {
    languageLabel: "שפה",
    scheduleLabel: "מערכת שמורה",
    scheduleA: "מערכת א",
    scheduleB: "מערכת ב",
    summaryLabel: "סיכום השוואה",
    studyDays: "ימי לימוד",
    earliestStart: "התחלה מוקדמת",
    materialsLabel: "חומרי קורס",
    filterLabel: "סינון חומרים",
    filters: {
      all: "הכל",
      exam: "מבחנים",
      summary: "סיכומים",
      qa: "שאלות ותשובות",
      practice: "תרגול",
    } as Record<MaterialFilter, string>,
    emptyMaterials: "אין חומרים התואמים לסינון זה.",
    fictionalNote: "נתונים אקדמיים בדיוניים להדגמת תיק עבודות בלבד.",
    days: {
      sun: "א׳",
      mon: "ב׳",
      tue: "ג׳",
      wed: "ד׳",
      thu: "ה׳",
    },
    courses: {
      algorithms: "אלגוריתמים",
      databases: "מסדי נתונים",
      os: "מערכות הפעלה",
      calculus: "חשבון דיפרנציאלי",
      hci: "ממשק אדם־מחשב",
      networks: "רשתות",
    },
    materialTitles: {
      "algorithms-exam": "אלגוריתמים — מבחן קודם",
      "databases-summary": "מסדי נתונים — סיכום",
      "os-qa": "מערכות הפעלה — שאלות ותשובות",
      "calculus-practice": "חשבון דיפרנציאלי — דף תרגול",
    } as Record<string, string>,
  },
} as const;

export const scheduleA: readonly ScheduleSlot[] = [
  {
    id: "a-sun",
    dayKey: "sun",
    start: "10:00",
    end: "12:00",
    courseKey: "algorithms",
  },
  {
    id: "a-mon",
    dayKey: "mon",
    start: "12:00",
    end: "14:00",
    courseKey: "databases",
  },
  {
    id: "a-tue",
    dayKey: "tue",
    start: "09:00",
    end: "11:00",
    courseKey: "hci",
  },
  {
    id: "a-wed",
    dayKey: "wed",
    start: "14:00",
    end: "16:00",
    courseKey: "networks",
  },
] as const;

export const scheduleB: readonly ScheduleSlot[] = [
  {
    id: "b-sun",
    dayKey: "sun",
    start: "08:00",
    end: "10:00",
    courseKey: "calculus",
  },
  {
    id: "b-mon",
    dayKey: "mon",
    start: "11:00",
    end: "13:00",
    courseKey: "algorithms",
  },
  {
    id: "b-wed",
    dayKey: "wed",
    start: "10:00",
    end: "12:00",
    courseKey: "os",
  },
  {
    id: "b-thu",
    dayKey: "thu",
    start: "13:00",
    end: "15:00",
    courseKey: "databases",
  },
] as const;

export const courseMaterials: readonly CourseMaterial[] = [
  { id: "algorithms-exam", courseKey: "algorithms", kind: "exam" },
  { id: "databases-summary", courseKey: "databases", kind: "summary" },
  { id: "os-qa", courseKey: "os", kind: "qa" },
  { id: "calculus-practice", courseKey: "calculus", kind: "practice" },
] as const;

export const materialFilters: readonly MaterialFilter[] = [
  "all",
  "exam",
  "summary",
  "qa",
  "practice",
] as const;

export function getSchedule(id: ScheduleId): readonly ScheduleSlot[] {
  return id === "A" ? scheduleA : scheduleB;
}

export function summarizeSchedule(slots: readonly ScheduleSlot[]): {
  studyDays: number;
  earliestStart: string;
} {
  const days = new Set(slots.map((slot) => slot.dayKey));
  const earliest = [...slots].map((slot) => slot.start).sort()[0] ?? "—";
  return {
    studyDays: days.size,
    earliestStart: earliest,
  };
}

export function filterMaterials(
  materials: readonly CourseMaterial[],
  filter: MaterialFilter,
): readonly CourseMaterial[] {
  if (filter === "all") return materials;
  return materials.filter((item) => item.kind === filter);
}
