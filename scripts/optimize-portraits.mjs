import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const imagesDir = path.resolve("public/images");

async function writeWebp(inputPath, outputName, options) {
  if (!fs.existsSync(inputPath)) {
    console.warn(`skip missing source: ${inputPath}`);
    return;
  }

  await sharp(inputPath)
    .rotate()
    .resize(options.resize)
    .webp({ quality: 78 })
    .toFile(path.join(imagesDir, outputName));
}

async function optimize() {
  const fullbody = path.join(imagesDir, "fullbody.png");
  const about = path.join(imagesDir, "aboutme.png");
  const blink = path.join(imagesDir, "aboutme_blink.png");

  await writeWebp(fullbody, "fullbody.webp", {
    resize: {
      width: 1600,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    },
  });
  await writeWebp(about, "aboutme.webp", {
    resize: { width: 640, height: 640, fit: "cover" },
  });
  await writeWebp(blink, "aboutme_blink.webp", {
    resize: { width: 640, height: 640, fit: "cover" },
  });

  for (const file of ["fullbody.webp", "aboutme.webp", "aboutme_blink.webp"]) {
    const target = path.join(imagesDir, file);
    if (!fs.existsSync(target)) {
      continue;
    }
    const stat = fs.statSync(target);
    console.log(`${file}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

optimize().catch((error) => {
  console.error(error);
  process.exit(1);
});
