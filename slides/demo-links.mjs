import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

function baseUrl(value, label) {
  const url = new URL(value);
  assert(["http:", "https:"].includes(url.protocol), `${label} must use HTTP or HTTPS`);
  assert(!url.username && !url.password, `${label} must not contain credentials`);
  url.search = "";
  url.hash = "";
  return url;
}

export async function resolveDemoLinks(deck, repositoryDirectory, options = {}) {
  const appDirectory = path.join(repositoryDirectory, "full-react-demo");
  const topics = JSON.parse(await readFile(path.join(appDirectory, "src", "demo-topics.json"), "utf8"));
  const appBase = baseUrl(options.appUrl || "http://127.0.0.1:5176/", "App URL");
  const slidesBase = baseUrl(options.slidesUrl || "http://127.0.0.1:8765/", "Slides URL");
  const files = {};
  async function sourceFile(filename) {
    assert(typeof filename === "string" && filename.length > 0, "A source filename is required");
    const segments = filename.split(/[\\/]/);
    assert(segments.every(segment => segment && segment !== "." && segment !== ".." && !segment.includes(":")),
      `Invalid source path: ${filename}`);
    const normalized = segments.join("/");
    if (!Object.hasOwn(files, normalized)) {
      const text = (await readFile(path.join(appDirectory, ...segments), "utf8")).replace(/\r\n/g, "\n");
      files[normalized] = { text, sha256: createHash("sha256").update(text).digest("hex") };
    }
    return { filename: normalized, ...files[normalized] };
  }

  const links = [];
  for (const [index, slide] of deck.entries()) {
    const reference = slide.demo;
    const prefix = `Slide ${index + 1} (${slide.title})`;
    assert(reference, `${prefix} needs an app/source mapping`);
    const { tab, example, symbol, start, endBefore, action, expected } = reference;
    assert(Object.hasOwn(topics, tab), `${prefix}: unknown topic ${tab}`);
    assert(Object.hasOwn(topics[tab].examples, example), `${prefix}: unknown example ${tab}/${example}`);
    assert(symbol && start && action && expected, `${prefix}: incomplete demonstration cues`);
    const component = await sourceFile(topics[tab].file);
    const sectionId = `${tab}-${example}`;
    assert.equal(component.text.split(`id="${sectionId}"`).length - 1, 1,
      `${prefix}: the live example must exist exactly once in ${component.filename}`);

    const source = await sourceFile(reference.file);
    const offset = source.text.indexOf(start);
    assert(offset >= 0, `${prefix}: source start not found in ${source.filename}: ${start}`);
    assert.equal(source.text.indexOf(start, offset + start.length), -1,
      `${prefix}: source start is ambiguous in ${source.filename}: ${start}`);
    const startLine = source.text.slice(0, offset).split("\n").length;
    let endLine = source.text.trimEnd().split("\n").length;
    if (endBefore) {
      const endOffset = source.text.indexOf(endBefore, offset + start.length);
      assert(endOffset >= 0, `${prefix}: source end not found after the start: ${endBefore}`);
      endLine = source.text.slice(0, endOffset).split("\n").length - 1;
    }
    assert(endLine >= startLine, `${prefix}: invalid highlighted source range`);
    const slideId = `slide-${index + 1}`;
    const sourceQuery = `?source=${slideId}#${slideId}`;
    links.push({
      tab, example, sectionId, symbol, action, expected,
      topicLabel: topics[tab].label,
      exampleLabel: topics[tab].examples[example],
      file: source.filename,
      displayPath: `full-react-demo\\${source.filename.replaceAll("/", "\\")}`,
      startLine, endLine, sha256: source.sha256,
      sourceQuery,
      sourceUrl: new URL(sourceQuery, slidesBase).href,
      liveUrl: new URL(`#/${tab}/${example}`, appBase).href,
      githubUrl: `https://github.com/bodonnell-DePaul/webdev_week2/blob/main/full-react-demo/${source.filename}`,
    });
  }
  return { links, files, topics, appUrl: appBase.href, slidesUrl: slidesBase.href };
}

export function walkthroughNotes(reference) {
  return `CONCEPT -> SOURCE -> RUNNING EXAMPLE
Source: ${reference.displayPath}
Focus: ${reference.symbol}, lines ${reference.startLine}-${reference.endLine}
Open the source view: ${reference.sourceUrl}
Open the live example: ${reference.liveUrl}
Topic: ${reference.topicLabel} / ${reference.exampleLabel}
Do: ${reference.action}
Expect: ${reference.expected}

The source viewer contains an exact snapshot from the current local app at deck build time.
Edit the actual source file, then rebuild the deck to refresh its snapshot and line references.`;
}
