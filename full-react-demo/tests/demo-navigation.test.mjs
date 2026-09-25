import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import topics from '../src/demo-topics.json' with { type: 'json' };
import {
  demoHash, demoSectionId, demoTabs, isDemoTabId, parseDemoHash,
} from '../src/demo-navigation.ts';

test('all ten topics have stable, round-tripping links', () => {
  assert.equal(demoTabs.length, 10);
  for (const { id } of demoTabs) {
    assert.ok(isDemoTabId(id));
    const route = parseDemoHash(demoHash(id));
    assert.deepEqual(route, { tab: id, example: null, problem: null });
    assert.equal(demoSectionId(route), null);
  }
});

test('every example points to one section in its real component', async () => {
  const ids = new Set();
  for (const [tab, topic] of Object.entries(topics)) {
    const code = await readFile(new URL(`../${topic.file}`, import.meta.url), 'utf8');
    for (const example of Object.keys(topic.examples)) {
      const route = parseDemoHash(demoHash(tab, example));
      const id = `${tab}-${example}`;
      assert.deepEqual(route, { tab, example, problem: null });
      assert.equal(demoSectionId(route), id);
      assert.ok(!ids.has(id));
      ids.add(id);
      assert.equal(code.split(`id="${id}"`).length - 1, 1, `Missing or repeated section: ${id}`);
    }
  }
});

test('empty and ordinary document fragments preserve the initial topic', () => {
  for (const hash of ['', '#', '#/', '#home', '#about']) {
    assert.deepEqual(parseDemoHash(hash), { tab: 'components', example: null, problem: null });
  }
});

test('malformed links report a problem without crashing the application', () => {
  for (const hash of ['#/missing', '#/state/counter/extra', '#/%zz', '#/__proto__/constructor']) {
    const route = parseDemoHash(hash);
    assert.equal(route.tab, 'components');
    assert.equal(route.example, null);
    assert.ok(route.problem);
  }
  assert.deepEqual(parseDemoHash('#/state/missing'), {
    tab: 'state',
    example: null,
    problem: 'This example was not found. Showing the selected topic.',
  });
  assert.throws(() => demoHash('state', 'missing'), /Unknown example/);
});

test('encoded valid links resolve to the same target', () => {
  assert.deepEqual(parseDemoHash('#/%73tate/%63ounter'), parseDemoHash('#/state/counter'));
  assert.deepEqual(parseDemoHash('#/state/'), parseDemoHash('#/state'));
});
