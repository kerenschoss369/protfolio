# Portrait cutout notes

## Assets

- **Original:** `public/about/keren-schoss-original.jpg` (copied from `public/keren-schoss-original.jpeg`; original preserved)
- **Cutout:** `public/about/keren-schoss-cutout.webp` (preferred) and `public/about/keren-schoss-cutout.png`
- **Processing:** local only (`@imgly/background-removal-node` + `rembg` u2net) — development step, not a production dependency

## Source limits

The supplied original is **400×400**. The published cutout is upscaled 2× for large displays; fine hair detail and edge smoothness are limited by that source resolution.

## Edges that may still need manual refinement

- Fine flyaway strands along the crown and left silhouette
- Soft semi-transparent hair over the left shoulder
- Possible faint residual from out-of-focus neon geometry in the source upper-right
- Knit sleeve edges against mid-tone page backgrounds
- Soft fringe / halo risk on dark theme where the original gray wall contaminated edges

No facial structure, clothing, color, pose, or body proportions were altered.
