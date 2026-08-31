/** Arrow overlay size — ~1.5× a typical 16–22px OS pointer. */
export const CURSOR_ARROW_WIDTH = 28;
export const CURSOR_ARROW_HEIGHT = 36;

/** Visual tip of the white outline, in SVG user units / CSS pixels. */
export const CURSOR_HOTSPOT_X = 1.15;
export const CURSOR_HOTSPOT_Y = 0.2;

/** Glow orb diameter (CSS px) before hover scale. */
export const CURSOR_GLOW_SIZE = 42;
export const CURSOR_GLOW_SIZE_HOVER = 55;

/** Place the glow on the arrow body, not on the tip. */
export const CURSOR_GLOW_OFFSET_X = 8;
export const CURSOR_GLOW_OFFSET_Y = 14;

export const CURSOR_GLOW_LAVENDER = "#C9B8FF";
export const CURSOR_GLOW_ICE = "#A8D8FF";
export const CURSOR_GLOW_OPACITY = 0.35;
export const CURSOR_GLOW_OPACITY_HOVER = 0.5;

export const CUSTOM_CURSOR_HTML_ATTR = "data-custom-cursor";

export const CUSTOM_CURSOR_INTERACTIVE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not(:disabled)",
  "[role='button']",
  "[role='link']",
  "[role='menuitem']",
  "summary",
  "input:not(:disabled):not([type='hidden'])",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  "label[for]",
  "[contenteditable='true']",
  "[data-cursor='interactive']",
].join(",");
