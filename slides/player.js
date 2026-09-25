(() => {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const metadata = JSON.parse(document.getElementById("lecture-data").textContent);
  const sourceFiles = JSON.parse(document.getElementById("source-files").textContent);
  const stage = document.getElementById("stage");
  const shell = document.getElementById("stage-shell");
  const viewport = document.getElementById("viewport");
  const jump = document.getElementById("jump");
  const previous = document.getElementById("previous");
  const next = document.getElementById("next");
  const counter = document.getElementById("counter");
  const notes = document.getElementById("notes");
  const notesButton = document.getElementById("toggle-notes");
  const help = document.getElementById("help");
  const notice = document.getElementById("notice");
  const sourceViewer = document.getElementById("source-viewer");
  const sourceCode = document.getElementById("source-code");
  const sourceWholeFile = document.getElementById("source-whole-file");
  let current = 0;
  let sourceIndex = 0;
  let wholeFile = false;

  function fit() {
    const style = getComputedStyle(viewport);
    const width = viewport.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    const height = viewport.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const scale = Math.max(0.05, Math.min(width / 1280, height / 720));
    shell.style.width = `${1280 * scale}px`;
    shell.style.height = `${720 * scale}px`;
    stage.style.transform = `scale(${scale})`;
  }

  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, position) => { slide.hidden = position !== current; });
    jump.value = String(current);
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    counter.textContent = `${current + 1} / ${slides.length}`;
    const data = metadata[current];
    document.getElementById("open-demo").href = data.demo.liveUrl;
    document.getElementById("open-demo").title = `${data.demo.topicLabel}: ${data.demo.exampleLabel}`;
    document.getElementById("open-source").title = `${data.demo.displayPath}, lines ${data.demo.startLine}-${data.demo.endLine}`;
    document.title = `${current + 1}. ${data.title} | React + TypeScript`;
    document.getElementById("announcement").textContent =
      `Slide ${current + 1} of ${slides.length}: ${data.title}`;
    document.getElementById("notes-title").textContent = `Instructor notes: ${data.title}`;
    document.getElementById("notes-text").textContent = data.notes;
    const sources = document.getElementById("notes-sources");
    sources.replaceChildren();
    data.sources.forEach((source, position) => {
      if (position) sources.append(document.createTextNode(" | "));
      const link = document.createElement("a");
      link.href = source.url;
      link.textContent = source.label;
      link.target = "_blank";
      link.rel = "noopener";
      sources.append(link);
    });
    fit();
  }

  function navigate(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (current !== target) location.hash = slides[target].id;
    show(target);
  }

  function readHash() {
    const index = slides.findIndex(slide => `#${slide.id}` === location.hash);
    show(index < 0 ? 0 : index);
    const requestedSource = new URL(location.href).searchParams.get("source");
    if (requestedSource) {
      const requestedIndex = slides.findIndex(slide => slide.id === requestedSource);
      if (requestedIndex >= 0) openSource(requestedIndex, false);
      else notice.textContent = "That source link was not found. Use Source on the current slide.";
    } else if (sourceViewer.open) sourceViewer.close();
  }

  function renderSource() {
    const reference = metadata[sourceIndex].demo;
    const lines = sourceFiles[reference.file].text.split("\n");
    const first = wholeFile ? 1 : reference.startLine;
    const last = wholeFile ? lines.length : reference.endLine;
    const fragment = document.createDocumentFragment();
    for (let number = first; number <= last; number++) {
      const row = document.createElement("div");
      row.className = "source-line";
      row.dataset.line = String(number);
      if (number >= reference.startLine && number <= reference.endLine) row.classList.add("source-selected");
      const lineNumber = document.createElement("span");
      lineNumber.className = "source-line-number";
      lineNumber.setAttribute("aria-hidden", "true");
      lineNumber.textContent = String(number);
      const code = document.createElement("code");
      code.textContent = lines[number - 1] || " ";
      row.append(lineNumber, code);
      fragment.append(row);
    }
    sourceCode.replaceChildren(fragment);
    sourceWholeFile.setAttribute("aria-pressed", String(wholeFile));
    sourceWholeFile.textContent = wholeFile ? "Show selected component" : "Show whole file";
    sourceCode.scrollTop = 0;
    sourceCode.scrollLeft = 0;
    if (wholeFile) {
      const selected = sourceCode.querySelector(".source-selected");
      if (selected) sourceCode.scrollTop += selected.getBoundingClientRect().top - sourceCode.getBoundingClientRect().top - 12;
    }
  }

  function openSource(index = current, updateUrl = true) {
    if (!Number.isInteger(index) || index < 0 || index >= metadata.length) {
      notice.textContent = "That source link is invalid.";
      return;
    }
    sourceIndex = index;
    wholeFile = false;
    const data = metadata[index];
    const reference = data.demo;
    show(index);
    document.getElementById("source-title").textContent = `${reference.symbol} / ${data.title}`;
    document.getElementById("source-path").textContent =
      `${reference.displayPath}  |  Lines ${reference.startLine}-${reference.endLine}`;
    document.getElementById("source-live").href = reference.liveUrl;
    document.getElementById("source-github").href = reference.githubUrl;
    document.getElementById("source-cue").textContent = `Try: ${reference.action}\nExpect: ${reference.expected}`;
    renderSource();
    if (!sourceViewer.open) sourceViewer.showModal();
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set("source", slides[index].id);
      url.hash = slides[index].id;
      history.pushState(null, "", url);
    }
  }

  function toggleNotes() {
    notes.hidden = !notes.hidden;
    notesButton.setAttribute("aria-pressed", String(!notes.hidden));
    fit();
  }

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else throw new Error("Fullscreen is not supported in this browser.");
      notice.textContent = "";
    } catch (error) {
      notice.textContent = error instanceof Error ? error.message : "The browser could not enter fullscreen.";
    }
  }

  previous.addEventListener("click", () => navigate(current - 1));
  next.addEventListener("click", () => navigate(current + 1));
  jump.addEventListener("change", () => navigate(Number(jump.value)));
  notesButton.addEventListener("click", toggleNotes);
  document.getElementById("fullscreen").addEventListener("click", fullscreen);
  document.getElementById("help-button").addEventListener("click", () => help.showModal());
  document.getElementById("close-help").addEventListener("click", () => help.close());
  document.getElementById("print").addEventListener("click", () => window.print());
  document.getElementById("open-source").addEventListener("click", () => openSource());
  document.getElementById("close-source").addEventListener("click", () => sourceViewer.close());
  sourceWholeFile.addEventListener("click", () => {
    wholeFile = !wholeFile;
    renderSource();
  });
  sourceViewer.addEventListener("close", () => {
    const url = new URL(location.href);
    url.searchParams.delete("source");
    history.replaceState(null, "", url);
  });
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element) || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const link = event.target.closest("a[data-source-slide]");
    if (!link) return;
    event.preventDefault();
    openSource(Number(link.dataset.sourceSlide));
  });
  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    viewport.focus();
  });
  document.addEventListener("fullscreenchange", () => {
    document.getElementById("fullscreen").textContent =
      document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
  });
  window.addEventListener("hashchange", readHash);
  window.addEventListener("popstate", readHash);
  window.addEventListener("keydown", event => {
    if (help.open || sourceViewer.open || event.altKey || event.ctrlKey || event.metaKey ||
        !(event.target instanceof Element) ||
        event.target.closest("button, a, input, textarea, select, [contenteditable]")) return;
    const key = event.key.toLowerCase();
    if (event.target.closest("#notes") &&
        ["arrowright", "arrowleft", "arrowup", "arrowdown", "pageup", "pagedown", "home", "end", " "].includes(key)) return;
    if (["arrowright", "arrowdown", "pagedown", " "].includes(key)) {
      event.preventDefault();
      navigate(current + (event.shiftKey && key === " " ? -1 : 1));
    } else if (["arrowleft", "arrowup", "pageup"].includes(key)) {
      event.preventDefault();
      navigate(current - 1);
    } else if (key === "home" || key === "end") {
      event.preventDefault();
      navigate(key === "home" ? 0 : slides.length - 1);
    } else if (key === "n") toggleNotes();
    else if (key === "c") openSource();
    else if (key === "d") document.getElementById("open-demo").click();
    else if (key === "f") fullscreen();
    else if (key === "?") help.showModal();
  });
  new ResizeObserver(fit).observe(viewport);
  readHash();
})();
