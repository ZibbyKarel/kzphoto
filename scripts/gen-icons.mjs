/**
 * Generate raster icons from the real KZ logo (public/logo.png).
 *   - src/app/icon.png               (256, modern favicon, dark rounded bg)
 *   - src/app/apple-icon.png         (180, iOS touch icon, dark rounded bg)
 *   - src/app/favicon.ico            (48 PNG-in-ICO, legacy fallback, dark rounded bg)
 *   - src/app/(site)/[locale]/logo-mark.png  (512, transparent, for the OG image)
 *
 * The logo art is copper/cream on a transparent background, so the favicon/app
 * icons are composited onto a dark rounded tile — otherwise the cream letters
 * vanish on light browser tabs. The OG mark stays transparent (the OG canvas is
 * already dark). Run with: node scripts/gen-icons.mjs
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const p = (rel) => resolve(root, rel);
const SRC = p("public/logo.png");

/** Logo centred on a dark rounded tile at the given size. */
async function tile(size) {
  const radius = Math.round(size * 0.215);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
       <defs><radialGradient id="b" cx="50%" cy="40%" r="75%">
         <stop offset="0" stop-color="#16110d"/><stop offset="1" stop-color="#0c0a08"/>
       </radialGradient></defs>
       <rect width="${size}" height="${size}" rx="${radius}" fill="url(#b)"/>
     </svg>`,
  );
  const art = await sharp(SRC)
    .resize(Math.round(size * 0.82), Math.round(size * 0.82), { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  return sharp(bg).composite([{ input: art, gravity: "center" }]).png();
}

// 1. Modern favicon + iOS touch icon (dark rounded tiles).
await (await tile(256)).toFile(p("src/app/icon.png"));
await (await tile(180)).toFile(p("src/app/apple-icon.png"));

// 2. OG mark — transparent, the OG canvas is already dark.
await sharp(SRC)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(p("src/app/(site)/[locale]/logo-mark.png"));

// 3. favicon.ico — single 48×48 PNG wrapped in an ICO container (valid since IE11).
const fav = await (await tile(48)).toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
const entry = Buffer.alloc(16);
entry.writeUInt8(48, 0); // width
entry.writeUInt8(48, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(fav.length, 8); // size of PNG
entry.writeUInt32LE(22, 12); // offset (6 + 16)
await writeFile(p("src/app/favicon.ico"), Buffer.concat([header, entry, fav]));

console.log("✓ icon.png, apple-icon.png, favicon.ico, logo-mark.png generated from public/logo.png");
