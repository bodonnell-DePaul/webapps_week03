import test from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { deck } from "./deck.mjs";
import { resolveDemoLinks, walkthroughNotes } from "./demo-links.mjs";

const repository = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

test("every slide connects to real source, a live section and a reproducible demonstration", async () => {
  const { links, files, topics } = await resolveDemoLinks(deck, repository);
  assert.equal(links.length, deck.length);
  assert.equal(new Set(links.map(link => link.tab)).size, Object.keys(topics).length);
  for (const link of links) {
    assert.ok(files[link.file].text.length);
    assert.ok(link.endLine >= link.startLine);
    assert.equal(new URL(link.liveUrl).hash, `#/${link.tab}/${link.example}`);
    assert.match(link.sourceUrl, /\?source=slide-\d+#slide-\d+$/);
    assert.match(walkthroughNotes(link), /Do: .+\nExpect: .+/);
  }
});

test("lecture content no longer refers to the retired applications", () => {
  assert.doesNotMatch(JSON.stringify(deck), /my-react-app|react_calculator|react-calculator|week2_demo/);
});

test("incorrect source mappings fail instead of generating broken lecture links", async () => {
  const first = deck[0];
  await assert.rejects(resolveDemoLinks([{ ...first, demo: { ...first.demo, tab: "missing" } }], repository),
    /unknown topic/);
  await assert.rejects(resolveDemoLinks([{ ...first, demo: { ...first.demo, example: "missing" } }], repository),
    /unknown example/);
  await assert.rejects(resolveDemoLinks([{ ...first, demo: { ...first.demo, start: "nonexistent-source-marker" } }], repository),
    /source start not found/);
  await assert.rejects(resolveDemoLinks([{ ...first, demo: { ...first.demo, file: "../README.md" } }], repository),
    /Invalid source path/);
});

test("lecture links support different local ports or a hosted path", async () => {
  const { links } = await resolveDemoLinks(deck, repository, {
    appUrl: "https://example.test/demo/",
    slidesUrl: "http://127.0.0.1:9000/slides/index.html",
  });
  assert.ok(links.every(link => link.liveUrl.startsWith("https://example.test/demo/#/")));
  assert.ok(links.every(link => link.sourceUrl.startsWith("http://127.0.0.1:9000/slides/index.html?source=")));
  await assert.rejects(resolveDemoLinks(deck, repository, { appUrl: "javascript:alert(1)" }), /HTTP or HTTPS/);
});
