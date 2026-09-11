import { mkdir, writeFile } from "node:fs/promises";

const screenshotRoot = "docs/design-references/uidai-gov-in-7db8752c/en-7a4ba3ba";
const artifactRoot = "docs/research/uidai-gov-in-7db8752c/en-7a4ba3ba";
const targetUrl = process.argv[2] || "https://uidai.gov.in/en";
const screenshotPrefix = targetUrl.includes("localhost") ? "clone-" : "";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function putJson(url) {
  const res = await fetch(url, { method: "PUT" });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function newPage() {
  const tab = await putJson(`http://127.0.0.1:9222/json/new?${encodeURIComponent(targetUrl)}`);
  return connect(tab.webSocketDebuggerUrl);
}

function connect(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      data.error ? reject(new Error(JSON.stringify(data.error))) : resolve(data.result);
    }
  });
  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          const callId = ++id;
          ws.send(JSON.stringify({ id: callId, method, params }));
          return new Promise((resolveCall, rejectCall) => pending.set(callId, { resolve: resolveCall, reject: rejectCall }));
        },
        close() {
          ws.close();
        },
      });
    });
    ws.addEventListener("error", reject);
  });
}

async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function capture(client, name, width, height, fullPage = true) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });
  await wait(1200);
  let clip;
  if (fullPage) {
    const metrics = await client.send("Page.getLayoutMetrics");
    clip = {
      x: 0,
      y: 0,
      width: Math.ceil(metrics.cssContentSize.width),
      height: Math.ceil(metrics.cssContentSize.height),
      scale: 1,
    };
  }
  const png = await client.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip });
  await writeFile(`${screenshotRoot}/${screenshotPrefix}${name}.png`, Buffer.from(png.data, "base64"));
}

await mkdir(screenshotRoot, { recursive: true });
await mkdir(artifactRoot, { recursive: true });

const client = await newPage();
await client.send("Page.enable");
await client.send("Runtime.enable");
await client.send("Page.navigate", { url: targetUrl });
await wait(7000);

await capture(client, "desktop-fullpage", 1440, 1000, true);
await capture(client, "mobile-fullpage", 390, 900, true);

await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
await wait(1000);

const extracted = await evaluate(client, `(() => {
  const cssProps = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','backgroundColor','background','padding','margin','width','height','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','borderRadius','border','boxShadow','position','top','zIndex','opacity','transform','transition'];
  const styles = (el) => Object.fromEntries(cssProps.map((p) => [p, getComputedStyle(el)[p]]).filter(([,v]) => v && v !== 'normal' && v !== 'none' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)'));
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none';
  };
  const sections = [...document.querySelectorAll('header, nav, main > *, section, footer, .container, .moduletable, [class*=banner], [class*=service], [class*=footer]')]
    .filter(visible)
    .slice(0, 80)
    .map((el, i) => ({
      i,
      tag: el.tagName.toLowerCase(),
      id: el.id,
      className: String(el.className).slice(0, 220),
      rect: (() => { const r = el.getBoundingClientRect(); return { x:r.x, y:r.y + scrollY, width:r.width, height:r.height }; })(),
      text: el.innerText?.replace(/\s+/g, ' ').trim().slice(0, 1400),
      styles: styles(el),
      imageCount: el.querySelectorAll('img').length,
      linkCount: el.querySelectorAll('a').length,
    }));
  const assets = {
    images: [...document.images].map((img) => ({src: img.currentSrc || img.src, alt: img.alt, width: img.naturalWidth, height: img.naturalHeight, className: String(img.className)})),
    backgrounds: [...document.querySelectorAll('*')].map((el) => ({ bg: getComputedStyle(el).backgroundImage, tag: el.tagName, className: String(el.className).slice(0,120)})).filter((x) => x.bg && x.bg !== 'none'),
    favicons: [...document.querySelectorAll('link[rel*=icon]')].map((l) => ({ href: l.href, sizes: l.sizes?.toString() })),
    fonts: [...new Set([...document.querySelectorAll('body, h1, h2, h3, h4, p, a, button, li')].map((el) => getComputedStyle(el).fontFamily))],
    colors: [...new Set([...document.querySelectorAll('body, header, nav, main, section, footer, h1, h2, h3, p, a, button, li')].flatMap((el) => [getComputedStyle(el).color, getComputedStyle(el).backgroundColor]).filter(Boolean))].slice(0, 80),
  };
  return { title: document.title, url: location.href, bodyText: document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 12000), sections, assets, htmlClass: document.documentElement.className, bodyClass: document.body.className };
})()`);

if (!targetUrl.includes("localhost")) {
  await writeFile(`${artifactRoot}/EXTRACTION.json`, JSON.stringify(extracted, null, 2));
}

await evaluate(client, `window.scrollTo(0, 0);`);
await wait(500);
await capture(client, "viewport-top", 1440, 1000, false);
await evaluate(client, `window.scrollTo(0, Math.floor(document.body.scrollHeight * 0.33));`);
await wait(800);
await capture(client, "viewport-middle", 1440, 1000, false);
await evaluate(client, `window.scrollTo(0, Math.floor(document.body.scrollHeight * 0.66));`);
await wait(800);
await capture(client, "viewport-lower", 1440, 1000, false);
await evaluate(client, `window.scrollTo(0, document.body.scrollHeight);`);
await wait(800);
await capture(client, "viewport-footer", 1440, 1000, false);

client.close();
