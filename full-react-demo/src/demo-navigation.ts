import topics from './demo-topics.json' with { type: 'json' };

export type DemoTabId = keyof typeof topics;

export interface DemoRoute {
  tab: DemoTabId;
  example: string | null;
  problem: string | null;
}

export function isDemoTabId(value: string): value is DemoTabId {
  return Object.hasOwn(topics, value);
}

export const demoTabs = Object.entries(topics).map(([id, topic]) => {
  if (!isDemoTabId(id)) throw new Error(`Unknown demo topic: ${id}`);
  return { id, label: topic.label };
});

export function demoHash(tab: DemoTabId, example?: string): string {
  if (example && !Object.hasOwn(topics[tab].examples, example)) {
    throw new Error(`Unknown example "${example}" in "${tab}"`);
  }
  return `#/${tab}${example ? `/${example}` : ''}`;
}

export function parseDemoHash(hash: string): DemoRoute {
  const home: DemoRoute = { tab: 'components', example: null, problem: null };
  if (!hash.startsWith('#/') || hash === '#/') return home;

  let parts: string[];
  try {
    parts = hash.slice(2).split('/').map(decodeURIComponent);
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    return { ...home, problem: 'This demo link contains an invalid URL escape.' };
  }
  const [tab, example] = parts;
  if (parts.length > 2 || !isDemoTabId(tab)) {
    return { ...home, problem: 'This demo topic was not found. Choose a topic above.' };
  }
  if (example && !Object.hasOwn(topics[tab].examples, example)) {
    return { tab, example: null, problem: 'This example was not found. Showing the selected topic.' };
  }
  return { tab, example: example || null, problem: null };
}

export function demoSectionId(route: DemoRoute): string | null {
  return route.example ? `${route.tab}-${route.example}` : null;
}
