# Full React + TypeScript Demo

An interactive classroom app with ten sections: components and TSX, props,
state and forms, events, effects, custom hooks, context, performance, useMemo,
and a useReducer shopping cart.

## Run locally

Use Node.js 24 and npm. From this folder:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5176 --strictPort
```

Open **http://127.0.0.1:5176/** in the integrated browser. This is the repository's
maintained classroom sample; no other sample app needs to be installed or run.

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4176 --strictPort
```

The app has no backend, API keys, or sibling workspace-package dependencies.
The Custom Hooks section fetches the bundled `public/users.json` fixture from
the same local server; it needs no external API. Other data is generated in
the app, and preferences and the demo login use browser local storage.

The authentication controls simulate roles for teaching; they are not
production authentication. The Props section's Edit/Delete buttons deliberately
log callback events rather than implement user-management operations.

## Lecture deep links

The slides use `#/<topic>/<example>` links to select a topic and scroll to the
matching demonstration card. That card is outlined and keyboard-focused.
Reloading a link preserves its destination, and browser Back/Forward follows
topic changes.

| Topic | Source component | Example URL fragment |
| --- | --- | --- |
| Components and TSX | `src/components/ComponentsDemo.tsx` | `#/components/expressions` |
| Props | `src/components/PropsDemo.tsx` | `#/props/callbacks` |
| State | `src/components/StateDemo.tsx` | `#/state/counter` |
| Events | `src/components/EventsDemo.tsx` | `#/events/form` |
| Effects | `src/components/EffectDemo.tsx` | `#/effects/timer` |
| Custom hooks | `src/components/CustomHooksDemo.tsx` | `#/hooks/fetch` |
| Context | `src/components/ContextDemo.tsx` | `#/context/auth` |
| Performance | `src/components/PerformanceDemo.tsx` | `#/performance/memo-child` |
| useMemo | `src/components/UseMemoDemo.tsx` | `#/usememo/products` |
| useReducer | `src/components/UseReducerDemo.tsx` | `#/usereducer/cart` |

For example, open **http://127.0.0.1:5176/#/state/counter** directly from a slide.
The complete example registry is `src/demo-topics.json`; each entry matches a
section ID in its component. `npm test` checks route parsing and those source
anchors using Node's built-in test runner. Keep the registry, section IDs, and
the slide's `demo` mapping aligned when adding examples.

## Source and local adjustments

Imported from
[Spring-2026-CSC360-Week2/demo/full-react-demo](https://github.com/bodonnell-DePaul/Spring-2026-CSC360-Week2/tree/7426728256fe25e4c49b9351f55147f22a110db3/demo/full-react-demo)
at commit `7426728256fe25e4c49b9351f55147f22a110db3`.
The upstream npm lockfile is retained.

Local compatibility and functional fixes:

- Use type-only `ReactNode` imports and a correctly typed generic-list key extractor.
- Count effect executions without scheduling another render from the counting
  effect; restore the document title when leaving the effects demo.
- Make the fetching example interactive using a bundled users fixture with
  loading, success, and error states.
- Give the browser tab a descriptive title.
- Add lecture deep links for every topic and example, including browser history
  and accessible focus on the selected demonstration.

The original Vite template documentation follows.

---

## React + TypeScript + Vite Template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
