import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const artifact = "docs/research/uidai-gov-in-7db8752c/en-7a4ba3ba/EXTRACTION.json";
const outDir = "public/sites/uidai-gov-in-7db8752c/en-7a4ba3ba";
const manifestPath = "docs/research/uidai-gov-in-7db8752c/en-7a4ba3ba/ASSET_MANIFEST.json";

function filenameFor(url, index) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname) || `asset-${index}`;
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "-");
  return `${String(index).padStart(2, "0")}-${safe}`;
}

const data = JSON.parse(await readFile(artifact, "utf8"));
const urls = [...new Set([
  ...data.assets.images.map((item) => item.src),
  ...data.assets.backgrounds.map((item) => item.bg.match(/url\("?(.*?)"?\)/)?.[1]).filter(Boolean),
  ...data.assets.favicons.map((item) => item.href),
])].filter(Boolean);

await mkdir(outDir, { recursive: true });
const manifest = [];

for (let i = 0; i < urls.length; i += 1) {
  const url = urls[i];
  const fileName = filenameFor(url, i + 1);
  const output = `${outDir}/${fileName}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(output, bytes);
    manifest.push({ url, fileName, publicPath: `/sites/uidai-gov-in-7db8752c/en-7a4ba3ba/${fileName}`, bytes: bytes.length });
  } catch (error) {
    manifest.push({ url, fileName, error: String(error) });
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
