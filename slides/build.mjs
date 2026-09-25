import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import assert from "node:assert/strict";
import pptxgen from "pptxgenjs";
import { deck, sections, sourceSections } from "./deck.mjs";
import { resolveDemoLinks, walkthroughNotes } from "./demo-links.mjs";

const directory = path.dirname(fileURLToPath(import.meta.url));
const repositoryUrl = "https://github.com/bodonnell-DePaul/webdev_week2";
const sourceUrl = `${repositoryUrl}/blob/main/README.md`;
const W = 1280;
const H = 720;
const palette = {
  paper: "F6F3EA", ink: "183B34", muted: "536B61", forest: "123B35",
  mint: "BCE8D2", orange: "B34F25", gold: "F4C780", white: "FFFFFF",
  code: "152B2A", codeInk: "F2F6EE", border: "D4DBD0", card: "FFFFFF",
  lavender: "CABAF3", grayGreen: "E5EDE2",
};
const font = { heading: "Trebuchet MS", body: "Calibri", code: "Consolas" };
const escape = text => String(text).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[c]);

function tokenize(line) {
  const expression = /(\/\/.*$|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:import|from|export|default|function|const|let|return|if|else|type|interface|extends|keyof|typeof|throw|new|async|await|try|catch|finally|undefined|null|true|false|as)\b|\b\d+\b)/g;
  const runs = [];
  let cursor = 0;
  for (const match of line.matchAll(expression)) {
    if (match.index > cursor) runs.push({ text: line.slice(cursor, match.index), color: palette.codeInk });
    const token = match[0];
    const color = token.startsWith("//") ? (/type error/i.test(token) ? palette.gold : "B4C9BC")
      : /^["'`]/.test(token) ? palette.gold
      : /^\d+$/.test(token) ? palette.mint : palette.lavender;
    runs.push({ text: token, color });
    cursor = match.index + token.length;
  }
  if (cursor < line.length) runs.push({ text: line.slice(cursor), color: palette.codeInk });
  return runs;
}

function sceneFor(slide, index, reference) {
  const elements = [];
  const dark = slide.layout === "hero" || slide.layout === "closing";
  const bg = dark ? palette.forest : palette.paper;
  const foreground = dark ? palette.paper : palette.ink;
  function rect(x, y, w, h, fill, options = {}) {
    elements.push({ type: "rect", x, y, w, h, fill, ...options });
  }
  function text(x, y, w, h, value, options = {}) {
    elements.push({
      type: "text", x, y, w, h, value, size: 27, color: foreground,
      font: font.body, lineHeight: 1.17, ...options,
    });
  }
  function label(x, y, w, value, color = palette.muted) {
    text(x, y, w, 26, value.toUpperCase(), { size: 18, bold: true, color, lineHeight: 1.1 });
  }
  function code(x, y, w, h, title, value, size = 23) {
    rect(x, y, w, h, palette.code, { radius: 10 });
    label(x + 24, y + 20, w - 48, title, palette.mint);
    const lines = value.split("\n");
    const lineHeight = size * 1.3;
    assert(lines.length * lineHeight <= h - 74, `Code too tall on slide ${index + 1}: ${slide.title}`);
    lines.forEach((line, row) => {
      assert(line.length * size * 0.61 < w - 46, `Code too wide on slide ${index + 1}: ${line}`);
      text(x + 24, y + 60 + row * lineHeight, w - 48, lineHeight + 2, line || " ", {
        size, font: font.code, color: palette.codeInk, lineHeight: 1.3,
        runs: tokenize(line), code: true, wrap: false,
      });
    });
  }
  function callout(value, fill = palette.grayGreen) {
    rect(64, 584, 1152, 66, fill, { radius: 8 });
    text(84, 599, 1112, 40, value, { size: 25, color: palette.ink });
  }
  function card(x, y, w, h, item, number) {
    rect(x, y, w, h, palette.card, { radius: 10, stroke: palette.border });
    label(x + 24, y + 20, w - 48, item.tag || String(number).padStart(2, "0"), palette.orange);
    text(x + 24, y + 57, w - 48, item.titleHeight || 75, item.title, {
      size: item.titleSize || 32, bold: true, font: font.heading,
    });
    text(x + 24, y + (item.bodyY || 145), w - 48, h - (item.bodyY || 145) - 18, item.body, {
      size: item.size || 26,
    });
  }
  function arrow(x, y, color = palette.orange) {
    arrowLine(x, y + 24, 44, 16, "right", color);
  }
  function arrowLine(x, y, w, h, direction = "right", color = palette.orange) {
    elements.push({ type: "arrow", x, y, w, h, direction, color });
  }
  function node(x, y, w, h, heading, detail, fill = palette.white) {
    rect(x, y, w, h, fill, { radius: 9, stroke: palette.border });
    text(x + 20, detail ? y + 20 : y + (h - 46) / 2, w - 40, detail ? 55 : 46, heading, {
      size: 29, font: font.heading, bold: true, color: palette.ink, align: detail ? "left" : "center",
    });
    if (detail) text(x + 20, y + 86, w - 40, h - 95, detail, { size: 25, color: palette.ink });
  }

  label(64, 38, 1040, `WEB DEVELOPMENT / WEEK 2 / ${sections[slide.section].label}`, dark ? palette.mint : palette.muted);
  if (!dark) {
    text(64, 88, 1152, 72, slide.title, { size: slide.titleSize || 48, font: font.heading, bold: true, role: "h2" });
    if (slide.subtitle) text(64, 165, 1152, 42, slide.subtitle, { size: 25, color: palette.muted });
  }

  if (slide.layout === "hero") {
    text(64, 132, 695, 205, "React +\nTypeScript", {
      size: 78, bold: true, font: font.heading, role: "h1", lineHeight: 1.08,
    });
    text(68, 340, 650, 100, slide.subtitle, { size: 34, color: palette.mint });
    text(68, 505, 600, 98, "Learn the concept. Read its source.\nOpen the exact working example.", { size: 27 });
    rect(812, 149, 404, 412, palette.paper, { radius: 12 });
    label(840, 177, 352, "FULL-REACT-DEMO", palette.muted);
    [
      ["01-02", "Components + props"],
      ["03-04", "State + events"],
      ["05-06", "Effects + custom hooks"],
      ["07-08", "Context + performance"],
      ["09-10", "useMemo + useReducer"],
    ].forEach(([number, topic], i) => {
      const y = 230 + i * 61;
      rect(838, y, 352, 49, i % 2 ? palette.paper : palette.grayGreen, { radius: 6 });
      text(849, y + 13, 66, 27, number, { size: 19, bold: true, color: palette.orange });
      text(927, y + 12, 251, 33, topic, { size: 23, color: palette.ink });
    });
    text(814, 587, 404, 34, "One app / ten interactive topics", { size: 22, color: palette.mint });
  } else if (slide.layout === "cards") {
    if (slide.cards.length === 4) {
      slide.cards.forEach((item, i) => card(64 + (i % 2) * 588, 230 + Math.floor(i / 2) * 205, 564, 181, {
        ...item, titleSize: item.titleSize || 29, titleHeight: 42, bodyY: 107, size: item.size || 25,
      }, i + 1));
    } else {
      const gap = 28;
      const width = (1152 - (slide.cards.length - 1) * gap) / slide.cards.length;
      slide.cards.forEach((item, i) => card(64 + i * (width + gap), 234, width, slide.takeaway ? 322 : 388, item, i + 1));
    }
    if (slide.takeaway) callout(slide.takeaway);
  } else if (slide.layout === "code") {
    const height = slide.takeaway ? 330 : 430;
    code(64, 222, slide.codeWidth || 748, height, slide.codeLabel || "TSX", slide.code, slide.codeSize || 23);
    const x = (slide.codeWidth || 748) + 96;
    const width = 1216 - x;
    const gap = height / slide.points.length;
    slide.points.forEach((point, i) => {
      label(x, 230 + i * gap, width, point.title, palette.orange);
      text(x, 266 + i * gap, width, gap - 41, point.body, { size: point.size || 26 });
    });
    if (slide.takeaway) callout(slide.takeaway);
  } else if (slide.layout === "compare") {
    slide.columns.forEach((column, i) => {
      const x = 64 + i * 588;
      label(x, 227, 564, column.label, i ? palette.forest : palette.orange);
      code(x, 267, 564, 220, column.codeLabel || "TSX", column.code, column.codeSize || 22);
      text(x + 2, 514, 560, 116, column.body, { size: 26 });
    });
  } else if (slide.layout === "flow") {
    const gap = 52;
    const width = (1152 - gap * (slide.steps.length - 1)) / slide.steps.length;
    slide.steps.forEach((step, i) => {
      const x = 64 + i * (width + gap);
      label(x, 248, width, step.tag || `STEP ${i + 1}`, palette.orange);
      node(x, 294, width, 220, step.title, step.body, i === slide.steps.length - 1 ? palette.grayGreen : palette.white);
      if (i < slide.steps.length - 1) arrow(x + width + 4, 372);
    });
    callout(slide.takeaway);
  } else if (slide.layout === "table") {
    const widths = slide.widths || [290, 410, 452];
    let y = 232;
    rect(64, y, 1152, 54, palette.forest, { radius: 4 });
    let x = 64;
    slide.headers.forEach((header, i) => {
      text(x + 18, y + 13, widths[i] - 36, 36, header, { size: 24, bold: true, color: palette.paper });
      x += widths[i];
    });
    y += 54;
    const rowHeight = slide.rowHeight || 88;
    slide.rows.forEach((row, rowIndex) => {
      rect(64, y, 1152, rowHeight - 2, rowIndex % 2 ? palette.paper : palette.white);
      x = 64;
      row.forEach((cell, column) => {
        text(x + 18, y + 10, widths[column] - 36, rowHeight - 20, cell, {
          size: slide.size || 25, bold: column === 0, color: column === 0 ? palette.ink : palette.muted,
          font: slide.codeColumns?.includes(column) ? font.code : font.body, valign: "middle",
        });
        x += widths[column];
      });
      y += rowHeight;
    });
    if (slide.takeaway) callout(slide.takeaway);
  } else if (slide.layout === "prompt") {
    rect(64, 230, 164, 320, palette.forest, { radius: 10 });
    text(82, 263, 128, 110, slide.badge || "?", { size: 76, font: font.heading, bold: true, color: palette.mint, align: "center" });
    text(84, 387, 124, 125, slide.promptLabel || "PREDICT\nDISCUSS\nEXPLAIN", { size: 23, bold: true, color: palette.paper, align: "center" });
    if (slide.code) code(258, 230, 568, 320, slide.codeLabel || "PREDICT THE RESULT", slide.code, slide.codeSize || 23);
    else text(266, 245, 550, 280, slide.question, { size: 37, font: font.heading, bold: true });
    label(864, 238, 352, slide.taskLabel || "YOUR TASK", palette.orange);
    text(864, 283, 352, 266, slide.task, { size: 28 });
    callout(slide.takeaway || "Make a prediction, discuss with a neighbor, then explain your reasoning.");
  } else if (slide.layout === "diagram") {
    if (slide.diagram === "composition") {
      node(435, 230, 410, 82, "ComponentsDemo", "", palette.grayGreen);
      rect(638, 312, 4, 48, palette.muted);
      rect(246, 357, 788, 4, palette.muted);
      [246, 638, 1030].forEach(x => rect(x, 360, 4, 24, palette.muted));
      node(64, 384, 368, 154, "Header", "A small local component");
      node(456, 384, 368, 154, "Inline content", "JSX in the parent");
      node(848, 384, 368, 154, "Footer", "A reusable year display");
      callout(slide.takeaway);
    } else if (slide.diagram === "ownership") {
      node(64, 256, 462, 230, "PropsDemo (parent)", "sampleUsers + event log\n\nAppend a log message.", palette.grayGreen);
      node(754, 256, 462, 230, "UserCard (child)", "user, onEdit, onDelete\n\nCall a callback prop.");
      text(541, 284, 198, 62, "props: user,\nonDelete", { size: 22, font: font.code, color: palette.ink, align: "center" });
      arrowLine(541, 354, 198, 16);
      arrowLine(541, 418, 198, 16, "left");
      text(541, 448, 198, 38, "onDelete(id)", { size: 22, font: font.code, color: palette.ink, align: "center" });
      callout(slide.takeaway);
    } else if (slide.diagram === "context") {
      label(64, 230, 540, "WITHOUT CONTEXT / COMPARISON", palette.orange);
      rect(200, 270, 260, 54, palette.white, { radius: 6, stroke: palette.border });
      text(215, 281, 230, 38, "Parent owns user", { size: 26, bold: true, align: "center" });
      arrowLine(322, 328, 16, 27, "down");
      text(353, 326, 142, 29, "user", { size: 21, font: font.code, color: palette.orange });
      rect(174, 359, 312, 54, palette.white, { radius: 6, stroke: palette.border });
      text(190, 371, 280, 36, "Panel forwards props", { size: 25, bold: true, align: "center" });
      rect(329, 413, 2, 22, palette.orange);
      rect(190, 433, 283, 2, palette.orange);
      text(500, 416, 104, 29, "user", { size: 20, font: font.code, color: palette.orange });
      arrowLine(182, 437, 16, 27, "down");
      arrowLine(465, 437, 16, 27, "down");
      node(64, 468, 252, 68, "LoginForm", "");
      node(342, 468, 262, 68, "UserProfile", "");
      label(650, 230, 566, "READING SHARED CONTEXT", palette.forest);
      rect(650, 265, 566, 289, palette.grayGreen, { radius: 12 });
      text(674, 282, 518, 42, "AuthProvider", { size: 30, bold: true, font: font.heading });
      rect(674, 338, 518, 188, palette.white, { radius: 8, stroke: palette.border });
      text(696, 351, 474, 36, "ContextDemo", { size: 26, bold: true, font: font.heading });
      text(696, 389, 474, 33, "useAuth() selects the login or profile view", { size: 22, color: palette.muted });
      rect(693, 434, 215, 70, palette.grayGreen, { radius: 6 });
      rect(951, 434, 221, 70, palette.grayGreen, { radius: 6 });
      text(705, 452, 191, 40, "LoginForm", { size: 26, bold: true, align: "center" });
      text(913, 455, 32, 32, "OR", { size: 18, bold: true, color: palette.orange, align: "center" });
      text(963, 452, 197, 40, "UserProfile", { size: 26, bold: true, align: "center" });
      callout(slide.takeaway);
    } else if (slide.diagram === "architecture") {
      rect(64, 226, 1152, 420, palette.white, { radius: 10, stroke: palette.orange });
      text(84, 238, 1108, 34, "ThemeProvider", { size: 24, bold: true, font: font.heading });
      rect(86, 278, 1108, 345, palette.grayGreen, { radius: 8 });
      text(108, 291, 1064, 36, "AuthProvider", { size: 25, bold: true, font: font.heading });
      rect(108, 337, 1064, 263, palette.white, { radius: 8, stroke: palette.border });
      text(128, 351, 1018, 39, "NotificationProvider", { size: 26, bold: true, font: font.heading });
      rect(132, 400, 1016, 177, palette.paper, { radius: 6, stroke: palette.border });
      text(152, 413, 966, 38, "AppContent / selected topic and browser URL", { size: 27, bold: true, font: font.heading });
      rect(152, 467, 268, 86, palette.grayGreen, { radius: 5 });
      text(170, 484, 232, 54, "Topic navigation", { size: 25, align: "center", bold: true });
      rect(444, 467, 682, 86, palette.grayGreen, { radius: 5 });
      text(462, 479, 646, 65, "One selected demo:\nStateDemo, ContextDemo, UseMemoDemo, ...", { size: 24, align: "center" });
    } else {
      throw new Error(`Unknown diagram: ${slide.diagram}`);
    }
  } else if (slide.layout === "closing") {
    text(64, 105, 1060, 174, slide.title, { size: 62, bold: true, font: font.heading, role: "h2" });
    text(68, 289, 920, 140, slide.subtitle, { size: 35, color: palette.mint });
    slide.questions.forEach((question, i) => {
      rect(70, 467 + i * 54, 30, 30, palette.mint, { radius: 4 });
      text(118, 464 + i * 54, 1036, 48, question, { size: 28 });
    });
    text(1010, 259, 178, 147, "{ }", { size: 97, font: font.code, color: palette.mint, align: "center" });
  } else {
    throw new Error(`Unknown layout: ${slide.layout}`);
  }

  const filename = reference.file.split("/").at(-1);
  text(64, 679, 597, 27, `SOURCE / ${reference.symbol} | ${filename}:${reference.startLine}`, {
    size: 17, color: dark ? palette.mint : palette.ink, bold: true,
    link: reference.sourceUrl, htmlLink: reference.sourceQuery, sourceSlide: index,
  });
  text(678, 679, 422, 27, `LIVE / ${reference.topicLabel} / ${reference.exampleLabel}`, {
    size: 17, color: dark ? palette.mint : palette.ink, bold: true, link: reference.liveUrl,
  });
  text(1118, 676, 98, 28, `${String(index + 1).padStart(2, "0")} / ${deck.length}`, {
    size: 18, color: dark ? palette.mint : palette.muted, align: "right",
  });
  for (const element of elements) {
    assert(element.x >= 0 && element.y >= 0 && element.x + element.w <= W + 0.01 &&
      element.y + element.h <= H + 0.01, `Element outside slide ${index + 1}: ${element.value || element.type}`);
  }
  return { bg, elements };
}

function elementHtml(element) {
  const position = `left:${element.x}px;top:${element.y}px;width:${element.w}px;height:${element.h}px;`;
  if (element.type === "arrow") {
    const { w, h, direction, color } = element;
    const down = direction === "down";
    const left = direction === "left";
    const stem = down ? `M${w / 2} 0 V${h - 8}` : left ? `M${w} ${h / 2} H8` : `M0 ${h / 2} H${w - 8}`;
    const head = down ? `0,${h - 9} ${w / 2},${h} ${w},${h - 9}`
      : left ? `9,0 0,${h / 2} 9,${h}` : `${w - 9},0 ${w},${h / 2} ${w - 9},${h}`;
    return `<svg aria-hidden="true" class="element" style="${position}" viewBox="0 0 ${w} ${h}"><path d="${stem}" fill="none" stroke="#${color}" stroke-width="2.5"/><polygon points="${head}" fill="#${color}"/></svg>`;
  }
  if (element.type === "rect") return `<div aria-hidden="true" class="element" style="${position}background:#${element.fill};border-radius:${element.radius || 0}px;${element.stroke ? `border:1px solid #${element.stroke};` : ""}"></div>`;
  const tag = element.role || (element.code ? "pre" : "p");
  const contents = element.runs
    ? element.runs.map(run => `<span style="color:#${run.color}">${escape(run.text)}</span>`).join("")
    : escape(element.value);
  const text = element.link ? `<a href="${escape(element.htmlLink || element.link)}"${element.sourceSlide === undefined
    ? ' target="_blank" rel="noopener"' : ` data-source-slide="${element.sourceSlide}"`}>${contents}</a>` : contents;
  const family = element.font === font.code
    ? "'Consolas','Liberation Mono','Courier New',monospace"
    : `'${element.font}','Segoe UI',Arial,sans-serif`;
  return `<${tag} class="element text${element.code ? " code-line" : ""}" style="${position}font-family:${family};font-size:${element.size}px;font-weight:${element.bold ? 700 : 400};line-height:${element.lineHeight};color:#${element.color};text-align:${element.align || "left"};${element.wrap === false ? "white-space:pre;" : ""}${element.valign === "middle" ? "display:flex;align-items:center;" : ""}">${text}</${tag}>`;
}

async function writeHtml(scenes, references) {
  const css = await readFile(path.join(directory, "theme.css"), "utf8");
  const player = await readFile(path.join(directory, "player.js"), "utf8");
  const metadata = deck.map((slide, index) => ({
    title: slide.title,
    notes: `${walkthroughNotes(references.links[index])}\n\nTEACHING NOTES\n${slide.notes}`,
    demo: references.links[index],
    sources: slide.sources.map(key => ({
      label: sourceSections[key].label,
      url: `${sourceUrl}#${sourceSections[key].anchor}`,
    })),
  }));
  const options = Object.entries(sections).map(([key, section]) => `<optgroup label="${escape(section.label)}">${
    deck.map((slide, index) => slide.section === key ? `<option value="${index}">${index + 1}. ${escape(slide.title)}</option>` : "").join("")
  }</optgroup>`).join("");
  const slides = scenes.map((scene, index) => `<section class="slide" id="slide-${index + 1}" aria-label="Slide ${index + 1}: ${escape(deck[index].title)}"${index ? " hidden" : ""} style="background:#${scene.bg}">
${scene.elements.map(elementHtml).join("\n")}
</section>`).join("\n");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="React and TypeScript concepts connected to exact full-react-demo source and live examples. Offline slides, source snapshots and instructor notes.">
<link rel="icon" href="data:,">
<title>React + TypeScript | Week 2 lecture</title>
<style>${css}</style>
<noscript><style>.player,.viewport,.stage-shell,.stage{display:block;height:auto;width:1280px;overflow:visible}.slide,.slide[hidden]{display:block!important;position:relative}.toolbar{display:none}</style></noscript>
</head>
<body>
<a class="skip-link" href="#viewport">Skip presentation controls</a>
<main class="player">
<nav class="toolbar" aria-label="Presentation controls">
<button id="previous" type="button" aria-label="Previous slide">Previous</button>
<span class="counter" id="counter">1 / ${deck.length}</span>
<button id="next" type="button" aria-label="Next slide">Next</button>
<label for="jump">Jump to slide</label><select id="jump">${options}</select>
<span class="spacer"></span>
<button id="open-source" type="button" aria-haspopup="dialog">Source</button>
<a id="open-demo" class="toolbar-link" target="_blank" rel="noopener">Live demo</a>
<button id="toggle-notes" type="button" aria-pressed="false" aria-controls="notes">Notes</button>
<button id="fullscreen" type="button">Fullscreen</button>
<button id="print" type="button">Print</button>
<button id="help-button" type="button" aria-haspopup="dialog">Help</button>
</nav>
<div id="viewport" class="viewport" tabindex="-1"><div id="stage-shell" class="stage-shell"><div id="stage" class="stage">${slides}</div></div></div>
<aside class="notes" id="notes" aria-labelledby="notes-title" tabindex="0" hidden><h2 id="notes-title"></h2><p id="notes-text"></p><p id="notes-sources"></p></aside>
<p id="notice" class="notice" role="status"></p>
</main>
<p class="sr-only" id="announcement" aria-live="polite" aria-atomic="true"></p>
<dialog id="help" aria-labelledby="help-title">
<h2 id="help-title">Presenting this lecture</h2>
<dl><dt>Arrow keys / Space</dt><dd>Next or previous slide</dd><dt>Page Up / Page Down</dt><dd>Previous / next slide</dd><dt>Home / End</dt><dd>First / last slide</dd><dt>C</dt><dd>Read the exact app source for this concept</dd><dt>D</dt><dd>Open the matching running example</dd><dt>N</dt><dd>Toggle instructor notes (visible to the audience)</dd><dt>F / Esc</dt><dd>Enter / exit fullscreen</dd><dt>?</dt><dd>Show this help</dd></dl>
<p>Every slide has Source and Live links. Source opens a readable snapshot of the actual app file, with the relevant lines selected. Live opens the exact topic and example in full-react-demo. Start the app at ${escape(references.appUrl)} before class.</p>
<p>The slides and source snapshots work offline. The running app needs its local server. PowerPoint's Source links also need this HTML deck served at ${escape(references.slidesUrl)}. Instructor notes give the action and expected result for every demo.</p>
<button id="close-help" type="button">Close help</button>
</dialog>
<dialog id="source-viewer" class="source-viewer" aria-labelledby="source-title">
<header class="source-header">
<h2 id="source-title"></h2>
<button id="close-source" type="button">Back to slide</button>
</header>
<p id="source-path" class="source-path"></p>
<nav class="source-actions" aria-label="Source view controls">
<a id="source-live" class="toolbar-link" target="_blank" rel="noopener">Run this example</a>
<button id="source-whole-file" type="button" aria-pressed="false">Show whole file</button>
<a id="source-github" target="_blank" rel="noopener">File on GitHub</a>
</nav>
<p id="source-cue"></p>
<p class="source-snapshot">Read-only snapshot of the local app at deck build time. Edit the named source file and rebuild the deck to refresh it; the GitHub copy may differ.</p>
<p class="source-scroll-hint">Scroll horizontally for long code lines.</p>
<div id="source-code" class="source-code" tabindex="0" aria-label="Application source with line numbers"></div>
</dialog>
<script id="lecture-data" type="application/json">${JSON.stringify(metadata).replace(/</g, "\\u003c")}</script>
<script id="source-files" type="application/json">${JSON.stringify(references.files).replace(/</g, "\\u003c")}</script>
<script>${player}</script>
</body>
</html>
`;
  await writeFile(path.join(directory, "index.html"), html);
}

async function writePowerPoint(scenes, references) {
  const presentation = new pptxgen();
  presentation.defineLayout({ name: "LECTURE", width: W / 96, height: H / 96 });
  presentation.layout = "LECTURE";
  presentation.author = "Web Development";
  presentation.subject = "React and TypeScript concepts linked to full-react-demo source and live examples";
  presentation.title = "Week 2: React and TypeScript";
  presentation.lang = "en-US";
  presentation.theme = { headFontFace: font.heading, bodyFontFace: font.body, lang: "en-US" };
  presentation.revision = "1";

  scenes.forEach((scene, index) => {
    const slide = presentation.addSlide();
    slide.background = { color: scene.bg };
    scene.elements.forEach((element, elementIndex) => {
      const position = { x: element.x / 96, y: element.y / 96, w: element.w / 96, h: element.h / 96 };
      const objectName = `slide-${index + 1}-${element.type}-${elementIndex}`;
      if (element.type === "arrow") {
        const down = element.direction === "down";
        slide.addShape(presentation.ShapeType.line, {
          x: (element.x + (down ? element.w / 2 : 0)) / 96,
          y: (element.y + (down ? 0 : element.h / 2)) / 96,
          w: down ? 0 : element.w / 96, h: down ? element.h / 96 : 0,
          objectName,
          line: {
            color: element.color, width: 1.875,
            beginArrowType: element.direction === "left" ? "triangle" : "none",
            endArrowType: element.direction === "left" ? "none" : "triangle",
          },
        });
      } else if (element.type === "rect") {
        slide.addShape(element.radius ? presentation.ShapeType.roundRect : presentation.ShapeType.rect, {
          ...position, objectName,
          rectRadius: element.radius ? element.radius / 96 : undefined,
          fill: { color: element.fill },
          line: { color: element.stroke || element.fill, width: element.stroke ? 0.75 : 0, transparency: element.stroke ? 0 : 100 },
        });
      } else {
        const contents = element.runs && element.runs.length
          ? element.runs.map(run => ({ text: run.text, options: { color: run.color } }))
          : element.value;
        slide.addText(contents, {
          ...position, objectName, fontFace: element.font, fontSize: element.size * 0.75,
          bold: element.bold || false, color: element.color, margin: 0, breakLine: false,
          valign: element.valign || "top", align: element.align || "left", wrap: element.wrap !== false,
          lineSpacing: element.size * element.lineHeight * 0.75, paraSpaceAfter: 0, paraSpaceBefore: 0,
          hyperlink: element.link ? { url: element.link } : undefined,
        });
      }
    });
    slide.addNotes(`${walkthroughNotes(references.links[index])}\n\nTEACHING NOTES\n${deck[index].notes}\n\nSOURCE NOTES\n${deck[index].sources.map(key =>
      `${sourceSections[key].label}: ${sourceUrl}#${sourceSections[key].anchor}`).join("\n")}`);
  });
  await presentation.writeFile({ fileName: path.join(directory, "week-2-react-typescript.pptx"), compression: true });
}

const readme = await readFile(path.join(directory, "..", "README.md"), "utf8");
for (const [index, slide] of deck.entries()) {
  assert(slide.title && slide.notes && slide.sources.length, `Missing content on slide ${index + 1}`);
  assert(sections[slide.section], `Unknown lecture section: ${slide.section}`);
  for (const key of slide.sources) {
    assert(sourceSections[key], `Unknown source section: ${key}`);
    assert(readme.includes(sourceSections[key].heading), `README heading missing: ${sourceSections[key].heading}`);
  }
}
const references = await resolveDemoLinks(deck, path.join(directory, ".."), {
  appUrl: process.env.LECTURE_APP_URL,
  slidesUrl: process.env.LECTURE_SLIDES_URL,
});
const scenes = deck.map((slide, index) => sceneFor(slide, index, references.links[index]));
await writeHtml(scenes, references);
await writePowerPoint(scenes, references);
console.log(`Created ${deck.length} matching slides: index.html and week-2-react-typescript.pptx`);
