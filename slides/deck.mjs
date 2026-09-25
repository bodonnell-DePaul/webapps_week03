export const sections = {
  orientation: { label: "00 / One app, ten topics" },
  components: { label: "01 / Components and TSX" },
  interaction: { label: "02 / Props, state and events" },
  hooks: { label: "03 / Effects and custom hooks" },
  context: { label: "04 / Shared state" },
  application: { label: "05 / Performance and reducers" },
  practice: { label: "06 / Practice and synthesis" },
};

export const sourceSections = {
  intro: { label: "Introduction to React", heading: "## Introduction to React", anchor: "introduction-to-react" },
  setup: { label: "Development environment", heading: "## Setting Up Your Development Environment", anchor: "setting-up-your-development-environment" },
  components: { label: "Understanding components", heading: "## Understanding Components", anchor: "understanding-components" },
  props: { label: "Props and state", heading: "## Working with Props and State", anchor: "working-with-props-and-state" },
  types: { label: "Advanced TypeScript", heading: "### Advanced TypeScript Concepts Explained", anchor: "advanced-typescript-concepts-explained" },
  events: { label: "Event handling", heading: "## Event Handling in React", anchor: "event-handling-in-react" },
  hooks: { label: "Hooks deep dive", heading: "## React Hooks Deep Dive", anchor: "react-hooks-deep-dive" },
  context: { label: "Context API", heading: "## Context API for State Management", anchor: "context-api-for-state-management" },
  quality: { label: "Best practices", heading: "## Best Practices and Code Quality", anchor: "best-practices-and-code-quality" },
  samples: { label: "Application components", heading: "## Sample Application Components", anchor: "sample-application-components" },
  application: { label: "Application integration", heading: "## Building Towards a Complete Application", anchor: "building-towards-a-complete-application" },
};

const componentFiles = {
  components: "ComponentsDemo",
  props: "PropsDemo",
  state: "StateDemo",
  events: "EventsDemo",
  effects: "EffectDemo",
  hooks: "CustomHooksDemo",
  context: "ContextDemo",
  performance: "PerformanceDemo",
  usememo: "UseMemoDemo",
  usereducer: "UseReducerDemo",
};

const targets = {
  app: {
    tab: "components", example: "expressions", file: "src/App.tsx",
    symbol: "AppContent", start: "const AppContent:", endBefore: "const App:",
    action: "Open Components & TSX, then locate the Curly Braces card.",
    expected: "The active tab displays Alice, age 28, next year 29, grade A and ALICE.",
  },
  entry: {
    tab: "components", example: "composition", file: "src/main.tsx",
    symbol: "createRoot", start: "createRoot(document.getElementById('root')!)",
    action: "Open the app and select Components & TSX; find Component Composition.",
    expected: "One mounted app contains the tab bar and the Header/content/Footer example.",
  },
  providers: {
    tab: "context", example: "theme", file: "src/App.tsx",
    symbol: "App", start: "const App:", endBefore: "export default App;",
    action: "In Context API, toggle the theme, visit State, then return to Context API.",
    expected: "The app keeps the selected theme across tab changes because the provider stays mounted.",
  },
  expressions: {
    tab: "components", example: "expressions", symbol: "ComponentsDemo",
    start: "const ComponentsDemo:", endBefore: "      {/* --- Component composition --- */}",
    action: "Read each rendered line in Components & TSX → Curly Braces.",
    expected: "The expressions display Alice, 28, Logged In, 29, A and ALICE.",
  },
  composition: {
    tab: "components", example: "composition", symbol: "Header / Footer",
    start: "const Header:", endBefore: "// ---------- Main Demo ----------",
    action: "Locate Component Composition in Components & TSX and compare its three visible parts.",
    expected: "The Header sits above an inline content area; Footer shows the current year below it.",
  },
  lists: {
    tab: "components", example: "lists", symbol: "items.map",
    start: "      {/* --- Array rendering with .map() --- */}",
    endBefore: "      {/* --- Fragment demo --- */}",
    action: "In Array Rendering, click + Add Feature once.",
    expected: "One list item is appended; on a fresh mount it is Feature-5.",
  },
  fragments: {
    tab: "components", example: "fragments", symbol: "Fragment",
    start: "      {/* --- Fragment demo --- */}",
    endBefore: "      {/* --- What would happen without --- */}",
    action: "Inspect the two green paragraphs in the Fragments card with browser Elements.",
    expected: "Both paragraphs are siblings; the fragment adds no wrapping DOM element.",
  },
  defaults: {
    tab: "props", example: "defaults", symbol: "Greeting",
    start: "interface GreetingProps", endBefore: "// ----- UserCard with callback props -----",
    action: "Compare Alice, Bob and Charlie in Props → Basic Props with Defaults.",
    expected: "Alice is 25 with a VIP badge; Bob is 30 without it; Charlie is 18 without it.",
  },
  callbacks: {
    tab: "props", example: "callbacks", symbol: "UserCard",
    start: "interface UserCardProps", endBefore: "// ----- GenericList — advanced generic props -----",
    action: "In Callback Props, clear the log if present, click Alice's Edit, then Bob's Delete.",
    expected: "The log records Edit clicked for Alice and Delete clicked for user #2; all three cards remain.",
  },
  genericList: {
    tab: "props", example: "generic-list", symbol: "GenericList",
    start: "interface ListProps<T>", endBefore: "// ----- Main demo -----",
    action: "Compare the populated and empty lists in Props → Generic List Component.",
    expected: "The first list shows three names and emails; the empty list says Nothing here yet!",
  },
  counter: {
    tab: "state", example: "counter", symbol: "Counter",
    start: "const Counter:", endBefore: "// ---------- Array State ----------",
    action: "In State → Counter, click Reset, set Step to 3, then click + 3 once.",
    expected: "The count is 3; clicking − 3 returns it to 0.",
  },
  arrays: {
    tab: "state", example: "arrays", symbol: "ArrayState",
    start: "const ArrayState:", endBefore: "// ---------- Form with Validation ----------",
    action: "In Array State, enter Pear, click Add, then remove Pear with its adjacent × button.",
    expected: "Pear is appended, the input clears, and removing it leaves the other items unchanged.",
  },
  form: {
    tab: "state", example: "form", symbol: "FormState",
    start: "const FormState:", endBefore: "// ---------- Main demo ----------",
    action: "In Complex Form State, reset if needed and submit blank fields. Then enter Ada, Lovelace, ada@example.com and age 18; submit again.",
    expected: "The first submit shows four field errors; the second shows the submitted values and a Reset button.",
  },
  mouse: {
    tab: "events", example: "mouse", symbol: "handleClick",
    start: "  const handleClick =", endBefore: "  // Keyboard event",
    action: "In Events → Mouse Events, click Click Me once and double-click Double-Click Me.",
    expected: "Click Me's count increases by one; the Event Log records both interactions.",
  },
  keyboard: {
    tab: "events", example: "keyboard", symbol: "handleKeyDown",
    start: "  const handleKeyDown =", endBefore: "  // Form submit with preventDefault",
    action: "Type React into Keyboard Events, press a non-Enter key, then press Enter.",
    expected: "Only Enter adds a keyboard log entry containing the input's current value.",
  },
  eventForm: {
    tab: "events", example: "form", symbol: "handleFormSubmit",
    start: "  const handleFormSubmit =", endBefore: "  // onChange for live tracking",
    action: "In Form Submit, type hello and click Submit; look at Event Log.",
    expected: "A Form submitted with: \"hello\" entry appears without a document reload.",
  },
  preventDefault: {
    tab: "events", example: "prevent-default", symbol: "handleLinkClick",
    start: "  const handleLinkClick =", endBefore: "      <h2>4.",
    action: "Click the navigation-prevented link, then right-click the adjacent custom-menu box.",
    expected: "The app stays on the page and logs both interceptions; the box suppresses the browser menu but does not render a replacement menu.",
  },
  eventLog: {
    tab: "events", example: "event-log", symbol: "log",
    start: "  const log =", endBefore: "  // Mouse events",
    action: "Click Clear in Event Log, click Click Me twice, then type React in Keyboard Events and press Enter.",
    expected: "Three timestamped entries appear, newest first, with Enter at the top.",
  },
  everyRender: {
    tab: "effects", example: "every-render", symbol: "effectRunCount",
    start: "  // ----- Effect: runs every render", endBefore: "  // ----- Effect: runs when count changes",
    action: "Observe the effect-run count, click +1 in the Dependency Array card, then read the effect-run count again.",
    expected: "The displayed effect count increases after the committed update; the initial count may include Strict Mode checks.",
  },
  dependencies: {
    tab: "effects", example: "dependencies", symbol: "document.title effect",
    start: "  // ----- Effect: runs when count changes", endBefore: "  // ----- Effect: window resize",
    action: "In useEffect → Dependency Array, click +1 and inspect the browser tab title.",
    expected: "The visible count and the Count: … | React Demo browser title agree.",
  },
  resize: {
    tab: "effects", example: "resize", symbol: "resize effect",
    start: "  // ----- Effect: window resize", endBefore: "  // ----- Effect: interval timer",
    action: "Resize the browser while viewing useEffect → Resize Listener with Cleanup.",
    expected: "Window width updates to the current viewport width in pixels.",
  },
  timer: {
    tab: "effects", example: "timer", symbol: "timer effect",
    start: "  // ----- Effect: interval timer", endBefore: "      <h2>5.",
    action: "Click Reset, then Start; wait for at least two ticks, click Stop, wait again, and finally click Reset.",
    expected: "Seconds increase while running, stay fixed after Stop, and return to 0 after Reset.",
  },
  storage: {
    tab: "hooks", example: "storage", file: "src/hooks/useLocalStorage.ts",
    symbol: "useLocalStorage", start: "export function useLocalStorage<T>",
    action: "In Custom Hooks → Persistent State, enter Ada and reload the page on the same app origin.",
    expected: "With browser storage available, the input and Stored value restore Ada after reload.",
  },
  dimensions: {
    tab: "hooks", example: "dimensions", file: "src/hooks/useWindowDimensions.ts",
    symbol: "useWindowDimensions", start: "export function useWindowDimensions()",
    action: "Resize the browser to widths around 1000, 800 and 500 pixels in Custom Hooks → Responsive Hook.",
    expected: "Width and height update; the bar is green, then amber, then red.",
  },
  fetch: {
    tab: "hooks", example: "fetch", symbol: "CustomHooksDemo",
    start: "const CustomHooksDemo:", endBefore: "export default CustomHooksDemo;",
    action: "Open Custom Hooks → Generic Data Fetching and wait for the bundled /users.json request.",
    expected: "The loading message is replaced by the local sample users' names and emails; no external API is needed.",
  },
  auth: {
    tab: "context", example: "auth", symbol: "LoginForm / UserProfile",
    start: "const LoginForm:", endBefore: "// ---------- Theme toggler ----------",
    action: "In Context API → Auth, log out if needed, click Admin, inspect the profile, then click Logout.",
    expected: "Admin Alice and the admin badge appear; Logout restores the role buttons. Notifications report both actions.",
  },
  theme: {
    tab: "context", example: "theme", file: "src/context/ThemeContext.tsx",
    symbol: "ThemeProvider", start: "export const ThemeProvider:", endBefore: "export const useTheme =",
    action: "In Context API → Theme Context, click the Dark or Light toggle once.",
    expected: "Current theme changes and the app's colors switch with it.",
  },
  notifications: {
    tab: "context", example: "notifications", file: "src/context/NotificationContext.tsx",
    symbol: "NotificationProvider", start: "export const NotificationProvider:", endBefore: "export const useNotifications =",
    action: "Click Success and wait about three seconds. Click Info and dismiss that message with ×.",
    expected: "Success auto-dismisses; Info can be removed manually. The rendered toast list is in this Context card.",
  },
  memoChild: {
    tab: "performance", example: "memo-child", symbol: "ExpensiveChild",
    start: "const ExpensiveChild =", endBefore: "  // Expensive computation cached with useMemo",
    action: "In Performance, click Increment Parent, then click React inside ExpensiveChild.",
    expected: "Parent count increases and Last clicked becomes React; with stable props, the displayed child render count normally stays unchanged.",
  },
  calculation: {
    tab: "performance", example: "calculation", symbol: "fibonacci",
    start: "  const fibonacci = useMemo", endBefore: "      <h2>8.",
    action: "On a fresh Performance tab, click Increment Parent twice, then click TypeScript in the child list.",
    expected: "The calculation shows Fibonacci of 2 = 1; changing Last clicked leaves that result unchanged.",
  },
  fibonacci: {
    tab: "usememo", example: "fibonacci", symbol: "fibResult",
    start: "  const fibResult = useMemo", endBefore: "  // --- Product filtering demo ---",
    action: "In useMemo → Fibonacci, set the input to 20, note the result and elapsed value, then increment the unrelated counter.",
    expected: "The result is 6765. The counter changes while the displayed last-calculation time stays the same, not necessarily zero.",
  },
  products: {
    tab: "usememo", example: "products", symbol: "filteredProducts",
    start: "  const [searchTerm, setSearchTerm]", endBefore: "      <h2>9.",
    action: "In Filtered Product List, search Electronics, choose Sort by Price, and check In stock only.",
    expected: "Wireless Mouse ($49.99) precedes Mechanical Keyboard ($129.99); the stats show 2 products, $89.99 average, and 2 in stock.",
  },
  reducerOverview: {
    tab: "usereducer", example: "overview", symbol: "CartAction",
    start: "interface CartItem", endBefore: "// ---------- Reducer ----------",
    action: "Read Why useReducer?, then add React Fundamentals Book from Product Catalog.",
    expected: "One ADD_ITEM action creates or increments that product's cart row and updates the cart count.",
  },
  catalog: {
    tab: "usereducer", example: "catalog", symbol: "cartReducer",
    start: "function cartReducer(", endBefore: "// ---------- Sample catalog ----------",
    action: "Show and clear the cart if needed, then click Add to Cart for React Fundamentals Book twice.",
    expected: "One book row has quantity 2; the cart shows 2 items and a $59.98 total.",
  },
  cart: {
    tab: "usereducer", example: "cart", symbol: "UseReducerDemo",
    start: "const UseReducerDemo:", endBefore: "export default UseReducerDemo;",
    action: "Show and clear the cart if needed. Add one book, click its − button, then add it again and toggle Hide Cart / Show Cart.",
    expected: "Reducing quantity to zero removes the row. Hiding and showing the cart preserves the newly added item.",
  },
};

function demo(key, overrides = {}) {
  const target = targets[key];
  if (!target) throw new Error(`Unknown demo target: ${key}`);
  const resolved = {
    file: `src/components/${componentFiles[target.tab]}.tsx`,
    ...target,
    ...overrides,
  };
  if (resolved.endBefore === undefined) delete resolved.endBefore;
  return resolved;
}

const slides = [
  {
    title: "React + TypeScript",
    section: "orientation", layout: "hero",
    subtitle: "Concept → source → live UI\nOne app, ten connected topics",
    sources: ["intro", "application"],
    demo: demo("app"),
    notes: `Use full-react-demo as the lecture's spine. The ten tabs are Components & TSX, Props, State, Events, useEffect, Custom Hooks, Context API, Performance, useMemo and useReducer.
Start with the visible classroom app, not a proposed feature. In AppContent, trace the active tab to the actual demo component. Each slide's Source link opens an embedded, read-only snapshot of the app's source at build time; Live and Run this example open the matching tab and card. Rebuild the slides after changing application code to refresh that snapshot.
Projected snippets are focused excerpts, sometimes reflowed for readability. Comparisons, thought experiments and proposed improvements are explicitly labeled; they are not claims about the running implementation. The README remains supplementary reading.`,
  },
  {
    title: "Make the same round trip every time",
    section: "orientation", layout: "cards",
    subtitle: "Explain a concept, locate its owner, then test one visible prediction.",
    cards: [
      { tag: "CONCEPT", title: "Name the responsibility", body: "Rendering, state, a contract or an effect?" },
      { tag: "SOURCE", title: "Find the actual symbol", body: "Follow Source to the highlighted implementation." },
      { tag: "LIVE", title: "Perform one action", body: "Follow Live to the matching tab and card." },
      { tag: "EXPLAIN", title: "Account for the result", body: "Which input changed? What stayed the same?" },
    ],
    sources: ["intro", "components", "application"],
    demo: demo("app", {
      tab: "state", example: "counter",
      action: "Open State → Counter, reset it, set Step to 1, and click + 1 once.",
      expected: "The counter becomes 1 without a document reload; AppContent still shows the State tab.",
    }),
    notes: `Students should be able to read a component, explain an update, choose an owner and identify an external system. The Source and Live links keep those outcomes anchored to one working app.
AppContent chooses the active demo. StateDemo supplies the Counter that we will inspect in detail. First locate that branch, then perform the counter interaction and ask what changed.
Tabs show independent teaching examples, not stages of one shared data pipeline. In particular, the product filter and shopping cart use different catalogs.`,
  },
  {
    title: "Describe the UI; React updates the page",
    section: "orientation", layout: "flow",
    subtitle: "A render calculates UI from the current props, state and context.",
    steps: [
      { title: "Event", body: "Click the\nCounter's +\nbutton." },
      { title: "State", body: "Queue a new\ncount using\nsetCount." },
      { title: "Render", body: "Call Counter\nwith its next\nstate snapshot." },
      { title: "Commit", body: "Update the\nnumber on\nthe page." },
    ],
    takeaway: "A render is not a page reload, and it need not change every DOM node.",
    sources: ["intro", "props"],
    demo: demo("counter"),
    notes: `Trace the actual Counter: the click handler calls setCount(prev => prev + step), React calculates the next UI, and the displayed number changes.
Rendering must stay pure. Network requests and storage writes do not belong in the render calculation. Initial mounting, parent updates and context updates can also cause renders without a click.
React's reconciliation is not a promise that a virtual DOM makes every program faster. Keep the explanation about state snapshots and observable DOM updates.`,
  },
  {
    title: "TypeScript checks contracts, not reality",
    section: "orientation", layout: "cards",
    subtitle: "The app's User model describes a value; it does not authenticate anyone.",
    cards: [
      { tag: "SHAPE", title: "Required and optional", body: "id, name and email\nare required.\navatar is optional." },
      { tag: "CHOICES", title: "A role union", body: "Only admin, user\nor guest is valid\nin typed code." },
      { tag: "BOUNDARY", title: "Validate real data", body: "JSON and saved values\nstill need runtime\nvalidation." },
    ],
    takeaway: "Types disappear at runtime. A client-side role is not an authorization check.",
    sources: ["intro", "types", "quality"],
    demo: demo("auth", {
      file: "src/types/index.ts", symbol: "User",
      start: "export interface User {", endBefore: "// Form data for the registration form demo",
    }),
    notes: `Read the actual shared User interface, including role's three-string union, optional avatar, and lastActive: Date. LoginForm constructs this shape when an instructor chooses a role.
TypeScript should reject a misspelled role in typed source. It cannot prove that parsed JSON has the promised fields or that a person really has that role. AuthProvider converts a saved lastActive to Date but does not perform a full schema check.
The live Admin button is explicitly mock authentication. Production identity and permissions must be established and enforced by a trusted server.`,
  },
  {
    title: "Run the app that the slides describe",
    section: "orientation", layout: "code",
    subtitle: "Use the existing full-react-demo project; do not scaffold another app.",
    codeLabel: "TERMINAL / FROM THE REPOSITORY ROOT",
    code: `cd full-react-demo
npm install
npm run dev -- --host 127.0.0.1 --port 5176 --strictPort

# Check before class:
npm run build
npm run lint`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Start", body: "127.0.0.1:5176\nfor Live links." },
      { title: "Inspect", body: "Browser tools +\nReact DevTools." },
      { title: "Check", body: "Build checks types;\nlint checks rules." },
    ],
    takeaway: "HTML Source works offline; PowerPoint Source needs 8765. Live links need the app on 5176.",
    sources: ["setup"],
    demo: demo("entry"),
    notes: `Install dependencies when setting up the project, not on every code edit. package.json defines dev, build and lint; build runs TypeScript and then Vite. A running dev server alone is not proof that type checking passed.
main.tsx mounts App inside StrictMode. Use a supported Node version for this project's Vite version. The lecture links target http://127.0.0.1:5176/#/<tab>/<example>; the command binds that address and refuses a silent fallback to another port. If the matching app server is already running, use it rather than starting a second copy.
The app's fetch lesson uses a bundled /users.json fixture, not an external API. HTML slides and their built-in source viewer work offline. PowerPoint's Source links open that viewer at http://127.0.0.1:8765/, so start the slide server too. Live links in either format use the running Vite app on port 5176. Report real lint/build failures rather than assuming all teaching examples are production-ready.`,
  },
  {
    title: "Follow the entry point into ten tabs",
    section: "orientation", layout: "table",
    subtitle: "These locations all belong to full-react-demo/src.",
    headers: ["Location", "Responsibility", "Actual example"],
    widths: [305, 432, 415],
    rows: [
      ["main.tsx", "Mount App in StrictMode", "createRoot(...).render(...)"],
      ["App.tsx", "Providers and active tab", "App → AppContent"],
      ["components/", "Ten interactive topic demos", "StateDemo, UseReducerDemo"],
      ["hooks/", "Reusable stateful behavior", "useFetch, useLocalStorage"],
      ["context/ and types/", "Shared values and models", "AuthProvider, User"],
    ],
    rowHeight: 70, size: 24,
    sources: ["setup", "application"],
    demo: demo("entry"),
    notes: `Start at main.tsx, not a guessed component name: createRoot renders StrictMode → App. App nests ThemeProvider, AuthProvider and NotificationProvider around AppContent. AppContent selects one of ten actual demo components.
index.html supplies the root element and entry script. Some small components, including Counter, Greeting and GenericList, are defined inside their demo files rather than in separate files.
Switching tabs replaces the active demo component. Its local state normally resets on remount, while the providers above AppContent remain mounted. We return to that distinction when comparing state lifetimes.`,
  },
  {
    title: "A component is a function with a UI result",
    section: "components", layout: "code",
    subtitle: "Footer is a real component inside ComponentsDemo.tsx.",
    codeLabel: "Footer / CURRENT COMPONENT, STYLES OMITTED",
    code: `const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer>
      &copy; {currentYear} My Application
    </footer>
  );
};`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Name", body: "Uppercase Footer\nmeans a component." },
      { title: "Calculate", body: "currentYear becomes\nvisible text." },
      { title: "Compose", body: "Render it with\n<Footer />." },
    ],
    sources: ["components", "intro"],
    demo: demo("composition", {
      symbol: "Footer", start: "const Footer:", endBefore: "// ---------- Main Demo ----------",
    }),
    notes: `Open the real Footer and compare its return value to the copyright line in Component Composition. The projected excerpt omits only inline styles.
React.FC is the annotation used in this app, not a requirement for every function component. A typed function parameter and inferred return type are also valid. Current JSX transforms do not require importing React solely to write markup.
Rendering the current year does not set up a clock: if it must change at a time boundary without another render, that needs a deliberate update mechanism.`,
  },
  {
    title: "Curly braces are the TSX boundary",
    section: "components", layout: "code",
    subtitle: "Outside braces: markup. Inside braces: an expression that produces a value.",
    codeLabel: "ComponentsDemo / RELEVANT EXCERPTS",
    code: `const userName: string = 'Alice';
const userAge: number = 28;
const isLoggedIn: boolean = true;
const score: number = 95;

<p>Welcome, {userName}!</p>
<p>Next year you'll be {userAge + 1}</p>
<p>{isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
<p>Grade: {score >= 90 ? 'A'
  : score >= 80 ? 'B' : 'C'}</p>
<p>{userName.toUpperCase()}</p>`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Evaluate", body: "Values, arithmetic,\nternaries and calls." },
      { title: "Not statements", body: "An if statement\nbelongs before JSX." },
      { title: "Compile", body: "The JSX runtime\nreceives values." },
    ],
    sources: ["components"],
    demo: demo("expressions"),
    notes: `Predict Alice, 29, Logged In, A and ALICE before opening Live. The slide shortens the surrounding markup; Source shows every line, including the age and status labels.
With the automatic JSX transform, tags become JSX-runtime calls, not HTML strings. Braces supply JavaScript expression results. A quoted attribute is a string; an attribute in braces evaluates its expression.
Objects are not rendered directly as children. Select a property or format them intentionally. true, false, null and undefined are omitted as children, but the number 0 is rendered.`,
  },
  {
    title: "Four TSX habits to make automatic",
    section: "components", layout: "table",
    subtitle: "Use the Fragment card to distinguish the component tree from the DOM.",
    headers: ["Habit", "Use", "Why"],
    widths: [290, 465, 397],
    codeColumns: [1],
    rows: [
      ["Group siblings", "<> ... </>", "No extra DOM wrapper"],
      ["Name attributes", "className, onClick", "React prop names"],
      ["Pass functions", "onClick={addItem}", "Run after the click"],
      ["Write comments", "{/* explanation */}", "Between JSX children"],
    ],
    rowHeight: 81, size: 24,
    sources: ["components", "events"],
    demo: demo("fragments"),
    notes: `Source shows the exact fragment surrounding two green paragraphs. In Elements, distinguish the card's real section from the fragment, which contributes no element.
A return is one expression; React is not limited to returning one DOM element. Most DOM props use camelCase, while aria-* and data-* retain their hyphens. htmlFor associates a label with an input ID.
Close JSX tags. Put JSX comments between children, not as braced comments in an opening tag's attribute list.`,
  },
  {
    title: "Compose a view from focused pieces",
    section: "components", layout: "diagram", diagram: "composition",
    subtitle: "ComponentsDemo combines Header, inline content and Footer.",
    takeaway: "A component tree describes composition; not every visible region is its own component.",
    sources: ["components", "quality"],
    demo: demo("composition", {
      symbol: "ComponentsDemo",
      start: "      {/* --- Component composition --- */}",
      endBefore: "      {/* --- Array rendering with .map() --- */}",
    }),
    notes: `Read the diagram against the actual JSX. ComponentsDemo renders Header, an ordinary div containing the main-content paragraph, and Footer. There is no separate MainContent component in this example.
Ask which responsibilities could be reused on another page. Header and Footer already have named boundaries; extracting every div would not automatically improve the design.
The Home/About anchors in this small Header are illustrative markup, not separate implemented pages. Use the app's topic navigation for the lecture.`,
  },
  {
    title: "Lists need stable identities",
    section: "components", layout: "code",
    subtitle: "map creates siblings; key helps React match their identities.",
    codeLabel: "ComponentsDemo / CURRENT LIST",
    code: `<ul>
  {items.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
<button onClick={addItem}>+ Add Feature</button>`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Current demo", body: "Appends strings;\nuses index keys." },
      { title: "Stronger model", body: "Use stable IDs for\neditable lists." },
      { title: "Elsewhere", body: "Product and cart\nrows use data IDs." },
    ],
    sources: ["components", "quality", "samples"],
    demo: demo("lists"),
    notes: `Show the actual index key honestly; do not claim this list already uses IDs. Appending a feature leaves existing positions unchanged, but deletion, reordering or stateful child rows can expose index-identity problems.
An improvement for a changing list is to model items with persistent IDs and use key={item.id}. The product table and cart later demonstrate ID keys in running code.
key is scoped to siblings and is not passed as an ordinary child prop. Do not generate random keys while rendering. Stable identity is about preserving the correct item, not a guarantee that only one DOM node ever updates.`,
  },
  {
    title: "Props are a component's public contract",
    section: "interaction", layout: "code",
    subtitle: "Greeting distinguishes required fields, optional fields and defaults.",
    codeLabel: "Greeting / CURRENT COMPONENT, CLASSES OMITTED",
    code: `interface GreetingProps {
  name: string;
  age?: number;
  isVip?: boolean;
}
const Greeting: React.FC<GreetingProps> = ({
  name, age = 18, isVip = false
}) => (
  <div>
    <h4>Hello, {name}!</h4><p>Age: {age}</p>
    {isVip && <span>⭐ VIP</span>}
  </div>
);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Required", body: "name must be\nprovided." },
      { title: "Optional", body: "? permits an\nomitted value." },
      { title: "Default", body: "Used when the\nvalue is undefined." },
    ],
    sources: ["props"],
    demo: demo("defaults"),
    notes: `Read GreetingProps and the destructured defaults in the highlighted implementation. The slide omits CSS classes and reflows the JSX; Source contains the complete component.
React's contract is to treat props and the objects they reference as immutable. An ordinary TypeScript interface does not recursively freeze an object.
An omitted age uses 18. A provided age of 0 remains 0 because defaults do not replace every falsy value. TypeScript should reject <Greeting /> or an age supplied as a string.`,
  },
  {
    title: "Predict: what does Charlie receive?",
    section: "interaction", layout: "prompt",
    subtitle: "Three uses of the same Greeting component, already running in Props.",
    codeLabel: "CURRENT CALL SITES / REFLOWED",
    code: `<Greeting name="Alice"
  age={25} isVip={true} />
<Greeting name="Bob" age={30} />
<Greeting name="Charlie" />`,
    codeSize: 21,
    task: "Predict each age.\n\nWho gets a VIP badge?\n\nWhat changes if an\nage of 0 is supplied?",
    sources: ["props", "components"],
    demo: demo("defaults", {
      symbol: "Greeting call sites",
      start: "      {/* Basic props */}", endBefore: "      {/* Callback props */}",
    }),
    notes: `Answer: Alice is 25 and VIP; Bob is 30 and not VIP; Charlie uses age 18 and isVip false. A supplied age of 0 would display Age: 0 in the current Greeting because age is rendered directly.
The VIP condition uses a boolean. By contrast, the hypothetical expression age && <p>Age: {age}</p> evaluates to numeric 0 when age is 0, so React renders 0. Use an explicit presence check when zero is valid.
Compare the prediction with Live; there is no need to edit source to demonstrate the three existing call sites.`,
  },
  {
    title: "Data flows down; requests flow back up",
    section: "interaction", layout: "diagram", diagram: "ownership",
    subtitle: "PropsDemo owns an event log. UserCard only reports Edit and Delete clicks.",
    takeaway: "In this app, Edit and Delete append log entries; they do not change the sample users.",
    sources: ["props", "samples"],
    demo: demo("callbacks", {
      symbol: "PropsDemo",
      start: "const PropsDemo:", endBefore: "      {/* Generic list component */}",
    }),
    notes: `Follow sampleUsers into each UserCard and the callback props back to addLog. The only state owned by PropsDemo here is log; sampleUsers is a local sample array, not editable user state.
Clicking Delete reports an ID to the parent, which chooses to log it. All three cards remain. This is one-way data flow plus callbacks, not a child mutating a prop.
If actual editing or deletion were added, the appropriate owner would need real user state, validation and possibly persistence. Those are extensions, not hidden behavior of the current buttons.`,
  },
  {
    title: "Functions are props, too",
    section: "interaction", layout: "code",
    subtitle: "The payload contract tells the parent exactly what happened.",
    codeLabel: "UserCard / CURRENT onDelete EXCERPTS",
    code: `onDelete?: (userId: number) => void;

{onDelete && (
  <button onClick={() => onDelete(user.id)}>
    Delete
  </button>
)}`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Optional", body: "Hide the action\nif no callback." },
      { title: "Typed", body: "Send a numeric\nuser ID." },
      { title: "Deferred", body: "The wrapper runs\nwhen clicked." },
    ],
    takeaway: "UserCard reports an interaction; PropsDemo decides what that interaction does.",
    sources: ["props", "events"],
    demo: demo("callbacks"),
    notes: `The first line is a member of UserCardProps; the JSX is an excerpt from the component's actions. Styles and the surrounding showActions condition are omitted on the slide, but visible in Source.
onEdit sends the whole user object, whereas onDelete sends the ID. Both callbacks append messages through PropsDemo's addLog; neither persists data.
Optional callback props can control whether an action is shown. Treat the supplied user as immutable even when handing it back through a callback.`,
  },
  {
    title: "Generics preserve useful relationships",
    section: "interaction", layout: "code",
    subtitle: "GenericList delegates item identity and rendering without losing the item type.",
    codeLabel: "GenericList / CURRENT CONTRACT",
    code: `interface ListProps<T> {
  items: T[];
  renderItem:
    (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

// The same T flows through all three props.`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Items", body: "Infer T from\nthe supplied data." },
      { title: "Identity", body: "keyExtractor\nprovides the key." },
      { title: "Presentation", body: "renderItem\nreturns the UI." },
    ],
    sources: ["quality", "types", "props"],
    demo: demo("genericList"),
    notes: `Read GenericList's guard and map after its interface. The populated call supplies sampleUsers, u => u.id and a name/email renderer. The empty string-list call supplies its own message.
Answer the checkpoint: why not items: any[]? It would lose the relationship between an item and the callbacks consuming it. T preserves that relationship without prescribing one data shape.
The app already handles an empty list with Nothing here yet! This is current behavior, not an extension we merely propose.`,
  },
  {
    title: "Props, state or a derived value?",
    section: "interaction", layout: "table",
    subtitle: "Keep the smallest useful source of truth.",
    headers: ["Kind", "Actual app example", "How it changes"],
    widths: [270, 475, 407],
    rows: [
      ["Props", "Greeting's name and age", "The caller supplies them"],
      ["State", "Product searchTerm / sortBy", "Input handlers use setters"],
      ["Derived value", "filteredProducts / stats", "Recalculate from inputs"],
    ],
    rowHeight: 94,
    takeaway: "useMemo caches a calculation; it does not create another authoritative state store.",
    sources: ["props", "hooks", "samples"],
    demo: demo("products"),
    notes: `Preview UseMemoDemo without teaching all of memoization yet. The three filter controls have state; the visible rows and statistics are derived from those inputs and SAMPLE_PRODUCTS.
Ask students to classify the search text, the filtered array and its length. Storing all three independently would create unnecessary synchronization work.
The product list is a separate tab from the reducer cart. It does not add these products to a shared cart or share a filter with another tab.`,
  },
  {
    title: "useState connects memory to rendering",
    section: "interaction", layout: "code",
    subtitle: "The setter queues a new render; it does not rewrite this render's variable.",
    codeLabel: "Counter / CURRENT STATE AND HANDLERS",
    code: `const [count, setCount] = useState<number>(0);
const [step, setStep] = useState<number>(1);

// The three button handlers:
() => setCount(prev => prev - step)
() => setCount(0)
() => setCount(prev => prev + step)`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Tuple", body: "Current value +\nsetter function." },
      { title: "Independent", body: "count and step\nare both state." },
      { title: "Updater", body: "Compute from the\npending value." },
    ],
    sources: ["props", "hooks"],
    demo: demo("counter"),
    notes: `The running Counter has two state values, not a fixed step. Follow each button handler and the Step input, then demonstrate Reset → Step 3 → +3 → −3.
A plain local variable does not both survive renders and request UI updates. useState provides those responsibilities; useRef can retain a value without requesting a render.
The explicit number generic is valid but inferable from the initial number. Explicit types are especially helpful for arrays initialized to [] and unions such as User | null.`,
  },
  {
    title: "Predict: three updates, which result?",
    section: "interaction", layout: "prompt",
    subtitle: "Thought experiment: two alternative handlers, each starting at count = 0.",
    codeLabel: "COMPARISON / NOT THE LIVE HANDLERS",
    code: `// A
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// B
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);`,
    codeSize: 21,
    task: "Choose the result\nfor A and B.\n\nExplain a snapshot\nversus queued updaters.\n\nThen inspect Counter.",
    sources: ["props", "hooks"],
    demo: demo("counter", {
      action: "In the actual Counter, reset, set Step to 1 and click + 1 once. Locate its single functional updater in Source.",
      expected: "The live count becomes 1; the three-call handlers are a slide-only comparison.",
    }),
    notes: `Answer: A ends at 1; B ends at 3. These are alternative handlers, not consecutive code blocks in one handler. A reads the same count = 0 snapshot each time; B composes three queued transformations.
The actual Counter invokes one updater per button click. Do not claim it includes a three-update button. Ordinary separate intentional clicks are not the same as three setters batched inside one handler.
An updater must be pure. Strict Mode may call it again during development checks; do not put storage writes or logging side effects inside state updaters.`,
  },
  {
    title: "Replace objects; preserve old snapshots",
    section: "interaction", layout: "compare",
    subtitle: "FormState already creates a new object when updating a field.",
    columns: [
      { label: "AVOID / HYPOTHETICAL MUTATION", codeSize: 21, code: `formData.age = 18;
setFormData(formData);`, body: "Same reference; old snapshots are altered.\nReact can skip this state update." },
      { label: "CURRENT / NEW OBJECT", codeSize: 21, code: `setFormData(prev => ({
  ...prev,
  [field]: value
}));`, body: "Copy the fields, then replace one value.\nThe prior object stays unchanged." },
    ],
    sources: ["types", "props"],
    demo: demo("form", {
      symbol: "updateField", start: "  const updateField =", endBefore: "  const validate =",
      action: "Reset Complex Form State if necessary, then edit firstName and age.",
      expected: "The two controlled fields update independently; entering age does not erase firstName.",
    }),
    notes: `The mutation example is deliberately not the running implementation. Open updateField to confirm that FormState uses a functional updater, object spread and a computed property name.
Spread is shallow, not a deep clone. A changed nested object would need its own copied path. React uses Object.is for same-value bailout decisions, so reusing a mutated reference is unsafe.
State immutability is also what lets later reducer and memo examples reason about changed versus unchanged arrays.`,
  },
  {
    title: "Use array operations that return new arrays",
    section: "interaction", layout: "code",
    subtitle: "ArrayState appends with spread and removes with filter.",
    codeLabel: "ArrayState / CURRENT HANDLERS",
    code: `const addItem = () => {
  if (!newItem.trim()) return;
  setItems(prev => [...prev, newItem.trim()]);
  setNewItem('');
};

const removeItem = (index: number) => {
  setItems(prev => prev.filter((_, i) => i !== index));
};`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Add", body: "Copy and append\na trimmed string." },
      { title: "Remove", body: "Keep all other\npositions." },
      { title: "Feedback", body: "Clear the draft\nafter adding." },
    ],
    sources: ["types", "props", "hooks"],
    demo: demo("arrays"),
    notes: `Add Pear, observe the cleared input, then remove that row. Try whitespace-only input: the guard prevents an empty item.
The running sample identifies rows by index and uses index keys. That keeps this string-array exercise small, but stable item IDs are the stronger model for reorderable lists or rows containing their own state.
filter returns a new array. map also returns a new array but does not automatically clone every contained object. Avoid push, splice and in-place sort on state arrays.`,
  },
  {
    title: "Three tools for typed object updates",
    section: "interaction", layout: "cards",
    subtitle: "FormState combines runtime copying with compile-time type operations.",
    cards: [
      { tag: "JAVASCRIPT", title: "...spread", body: "Copy existing fields.\nOverride one field\nwith [field]: value." },
      { tag: "TYPESCRIPT", title: "keyof FormData", body: "firstName, lastName,\nemail or age:\nonly valid keys." },
      { tag: "TYPESCRIPT", title: "Partial<Record>", body: "Optional field keys;\nstring messages\nfor their errors." },
    ],
    takeaway: "A value's data type and its error-message type have different responsibilities.",
    sources: ["types", "props"],
    demo: demo("form", {
      symbol: "FormState types", start: "const FormState:", endBefore: "  const handleSubmit =",
    }),
    notes: `Read the actual four-field FormData state and the error state Partial<Record<keyof FormData, string>>. keyof yields field names; Record assigns string values; Partial lets fields without errors be omitted.
Partial<FormData> alone would preserve age as a number, so it would be the wrong type for an age error message. The running example already uses the correct mapped error shape.
The imported FormData interface is the app's model. EventsDemo separately uses the browser's built-in FormData constructor; they are not the same thing.`,
  },
  {
    title: "Keep each key paired with its value type",
    section: "interaction", layout: "code",
    subtitle: "Proposed refinement: the current setter accepts independent key and value unions.",
    codeLabel: "IMPROVEMENT / NOT THE RUNNING updateField",
    code: `function updateField<K extends keyof FormData>(
  field: K, value: FormData[K]
) {
  setFormData(prev => ({ ...prev, [field]: value }));
}

updateField('firstName', 'Ada');
updateField('age', 18);
// updateField('age', 'eighteen'); // Type error`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Current", body: "keyof +\nstring | number." },
      { title: "Refinement", body: "K selects the\nmatching value type." },
      { title: "Still needed", body: "Preserve error\nclearing behavior." },
    ],
    sources: ["types", "props"],
    demo: demo("form", {
      symbol: "updateField", start: "  const updateField =", endBefore: "  const validate =",
      action: "Edit age and firstName in Complex Form State, then compare the current updateField signature in Source with the proposed signature.",
      expected: "The UI continues to accept the existing handlers; Source shows string | number, not the generic refinement on the slide.",
    }),
    notes: `The running signature is (field: keyof FormData, value: string | number). It permits an incorrect source-level pairing such as updateField('age', 'eighteen'), even though the current age handler passes a number.
For ordinary literal-key calls, K and FormData[K] preserve the key/value relationship. This is a proposed type refinement, not an implemented feature. The slide omits the current error-clearing block to isolate the signature; a real refactor must retain it.
Types cannot validate input at runtime. Numeric parsing, valid ranges and useful feedback still require explicit behavior.`,
  },
  {
    title: "Form errors are messages, not field values",
    section: "interaction", layout: "code",
    subtitle: "The running form uses a sparse map of strings for validation feedback.",
    codeLabel: "FormState / CURRENT VALIDATION EXCERPT",
    code: `const newErrors:
  Partial<Record<keyof FormData, string>> = {};

if (!formData.firstName.trim())
  newErrors.firstName = 'First name required';
if (formData.age < 18)
  newErrors.age = 'Must be 18+';

setErrors(newErrors);
return Object.keys(newErrors).length === 0;`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Collect", body: "One message per\ninvalid field." },
      { title: "Display", body: "Show messages\nbeside inputs." },
      { title: "Decide", body: "No error keys\nmeans valid here." },
    ],
    sources: ["types", "props"],
    demo: demo("form", {
      symbol: "validate", start: "  const validate = (): boolean => {", endBefore: "  const handleSubmit =",
    }),
    notes: `The excerpt selects the name and age rules; Source also checks lastName and email. Predict four errors on blank submission, then verify that supplying the four requested values reaches the success view.
This is small client-side validation, not a full validation policy. The email regex is intentionally basic; numeric parsing conflates some inputs; a real backend must validate independently.
For production accessibility, explicitly associate every label and error message with its input and expose aria-invalid/aria-describedby. Do not claim those enhancements already exist in this form.`,
  },
  {
    title: "A controlled input closes the loop",
    section: "interaction", layout: "code",
    subtitle: "State supplies the value; onChange supplies the next state.",
    codeLabel: "FormState / CURRENT AGE INPUT, REFLOWED",
    code: `<input
  type="number"
  value={formData.age}
  onChange={(e) =>
    updateField('age', parseInt(e.target.value) || 0)
  }
  className={errors.age ? 'input-error' : ''}
/>`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Read", body: "value reflects\nformData.age." },
      { title: "Write", body: "onChange calls\nupdateField." },
      { title: "Caveat", body: "Empty or invalid\ntext falls back to 0." },
    ],
    takeaway: "Numeric inputs still expose text. Parsing and validation are separate design decisions.",
    sources: ["props", "events"],
    demo: demo("form", {
      symbol: "age input", start: '              type="number"',
      endBefore: '              className={errors.age',
      action: "Reset the form if needed, enter age 17 and submit. Change age to 18 and submit again.",
      expected: "Age 17 produces Must be 18+; 18 passes the age rule, while other empty fields still have errors.",
    }),
    notes: `The highlighted source starts at the unique number-input attribute in FormState; it shows the actual controlled value and parsing handler. Follow that handler back to updateField.
parseInt(value) || 0 conflates empty, invalid and zero, and parseInt can truncate fractional input. A production refinement is to keep raw text until validation and check finite integer/range constraints explicitly. That is not the current implementation.
Counter uses a different fallback, parseInt(value) || 1. An HTML min attribute does not clamp every possible keystroke. Checkboxes instead use checked and the event's checked boolean.`,
  },
  {
    title: "Trace the form's actual submit workflow",
    section: "interaction", layout: "flow",
    subtitle: "This is a client-side classroom form, not an API submission.",
    steps: [
      { title: "Intercept", body: "preventDefault\ncancels native\nsubmission." },
      { title: "Validate", body: "Build the field\nerror map from\nformData." },
      { title: "Decide", body: "Errors keep\nthe form\non screen." },
      { title: "Confirm", body: "Valid data sets\nsubmitted\nand shows it." },
    ],
    takeaway: "Pending state, server validation and request errors are production extensions, not live features.",
    sources: ["events", "props"],
    demo: demo("form", {
      symbol: "handleSubmit", start: "  const handleSubmit =", endBefore: "      <h3>Complex Form",
    }),
    notes: `Read handleSubmit: preventDefault, call validate, and setSubmitted(true) only on success. No network request or async pending state occurs in this handler.
Try an invalid then a valid submission. The success block renders the same formData values, and Reset returns to the blank form.
For an actual server operation, add explicit pending/error feedback, guard duplicate submissions and restore pending state in finally. An error boundary does not replace handling errors in event handlers or failed requests.`,
  },
  {
    title: "Events carry typed information",
    section: "interaction", layout: "table",
    subtitle: "EventsDemo extracts named handlers with concrete React event types.",
    headers: ["Interaction", "Handler type", "Useful field"],
    widths: [278, 520, 354],
    codeColumns: [1],
    rows: [
      ["Click", "MouseEvent<HTMLButtonElement>", "currentTarget"],
      ["Input change", "ChangeEvent<HTMLInputElement>", "target.value"],
      ["Keyboard", "KeyboardEvent<HTMLInputElement>", "key; currentTarget.value"],
      ["Submit", "FormEvent<HTMLFormElement>", "preventDefault()"],
    ],
    rowHeight: 79, size: 23,
    sources: ["events"],
    demo: demo("mouse", {
      symbol: "EventsDemo handlers", start: "  // Mouse events", endBefore: "  // Prevented link navigation",
    }),
    notes: `The source uses React.MouseEvent and related namespace-qualified types. Type-only imports are another option; inline handlers often infer their event types.
currentTarget is the element with the handler, while target is where the event originated. EventsDemo uses currentTarget.value for keyboard input and target.value in its direct input-change handler.
Run a click and a double-click, then read their log entries. onKeyDown is the current keyboard API used here. Do not promise identical browser behavior for every event or replace semantic keyboard-accessible controls with mouse-only UI.`,
  },
  {
    title: "Pass a handler; do not call it during render",
    section: "interaction", layout: "compare",
    subtitle: "The expression inside braces should produce the function to run later.",
    columns: [
      { label: "AVOID / NOT THE RUNNING JSX", codeSize: 21, code: `<button onClick={handleClick()}>
  Click Me
</button>`, body: "Invokes a normal handler immediately.\nIts return value is not the handler." },
      { label: "CURRENT / PASS THE FUNCTION", codeSize: 21, code: `<button onClick={handleClick}>
  Click Me ({clickCount})
</button>`, body: "React calls it for a click.\nThe handler updates count and log." },
    ],
    sources: ["components", "events"],
    demo: demo("mouse", {
      symbol: "Mouse Events JSX",
      start: "      {/* Mouse events */}", endBefore: "      {/* Keyboard events */}",
    }),
    notes: `Read the actual onClick={handleClick} and onDoubleClick={handleDoubleClick} props in the Mouse Events card. Predict when each handler runs, then test it.
The left comparison is intentionally wrong for this handler and may also fail type checking. A wrapper such as () => onDelete(user.id) is useful when supplying arguments, as seen in UserCard.
A deliberate higher-order function can return a handler, but do not confuse that pattern with accidentally invoking a state-updating handler during render.`,
  },
  {
    title: "Use event data instead of guessing",
    section: "interaction", layout: "code",
    subtitle: "The keyboard handler responds to Enter and reads the input it is attached to.",
    codeLabel: "EventsDemo / CURRENT KEYBOARD HANDLER",
    code: `const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  if (e.key === 'Enter') {
    log(\`Enter pressed! Value: "\${e.currentTarget.value}"\`);
  }
};`,
    codeSize: 21, codeWidth: 850,
    points: [
      { title: "Filter", body: "Only Enter\ncreates a log." },
      { title: "Read", body: "currentTarget is\nthe input." },
      { title: "Observe", body: "The latest entry\nappears first." },
    ],
    sources: ["events"],
    demo: demo("keyboard", {
      action: "Type React in Keyboard Events, press ArrowLeft, then press Enter and inspect Event Log.",
      expected: "ArrowLeft creates no entry; Enter logs the value React.",
    }),
    notes: `Predict whether an arrow key creates a message: it does not, because the handler explicitly checks e.key === 'Enter'. Moving the caret also does not change the text value.
The input is uncontrolled in this card: it has no value prop. The handler reads its current DOM value at the event boundary. Contrast this with the controlled fields in StateDemo.
The element generic supplies the type of currentTarget, making its value property available without an unsafe cast.`,
  },
  {
    title: "FormData can read a native form",
    section: "interaction", layout: "code",
    subtitle: "EventsDemo records a submission without reloading the document.",
    codeLabel: "EventsDemo / CURRENT SUBMIT HANDLER",
    code: `const handleFormSubmit = (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  log(\`Form submitted with: "\${formData.get('demo-input')}"\`);
};`,
    codeSize: 21, codeWidth: 850,
    points: [
      { title: "Cancel", body: "Prevent native\nform submission." },
      { title: "Collect", body: "Read named fields\nfrom the form." },
      { title: "Current scope", body: "Log a value;\nno API request." },
    ],
    sources: ["events"],
    demo: demo("eventForm"),
    notes: `The input's name=\"demo-input\" is the key used by the browser FormData object. This constructor is not the FormData interface imported by StateDemo.
Typing also records onChange entries. On submission, look for the distinct Form submitted with message at the top of Event Log; this is evidence of the submit handler, not merely of typing.
preventDefault cancels the browser's default submit action. It does not stop bubbling. No server request, validation workflow or persistent submission is implemented in this card.`,
  },
  {
    title: "Cancel a default, not every behavior",
    section: "interaction", layout: "cards",
    subtitle: "Other preventDefault uses are demonstrations, not UI recommendations.",
    cards: [
      { tag: "LINK", title: "Stay on this page", body: "handleLinkClick\ncancels navigation\nand records a message." },
      { tag: "CONTEXT MENU", title: "Suppress the menu", body: "handleRightClick\ncancels the browser's\ncontext menu." },
      { tag: "DISTINCTION", title: "Bubbling is separate", body: "preventDefault is not\nstopPropagation.\nUse each deliberately." },
    ],
    takeaway: "Preserve expected navigation and keyboard access in real interfaces.",
    sources: ["events", "quality"],
    demo: demo("preventDefault"),
    notes: `Trace both handlers to e.preventDefault() and log. Test the link and the right-click box, then read the entries.
The box's label mentions a custom menu, but the current implementation only suppresses the native one; it does not render an alternative menu. Make that limitation explicit.
Do not treat cancelled navigation or disabled browser menus as default best practice. Production custom interactions need meaningful behavior, semantics, focus handling and keyboard alternatives.`,
  },
  {
    title: "A log is state with an explicit policy",
    section: "interaction", layout: "code",
    subtitle: "EventsDemo keeps the newest twenty messages, not an unbounded history.",
    codeLabel: "EventsDemo / CURRENT LOG, REFLOWED",
    code: `const log = (msg: string) => {
  setLogs(prev => [
    \`\${new Date().toLocaleTimeString()} — \${msg}\`,
    ...prev
  ].slice(0, 20));
};`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Prepend", body: "Newest message\ncomes first." },
      { title: "Bound", body: "slice keeps at\nmost twenty." },
      { title: "Clear", body: "The Clear button\nsets logs to []." },
    ],
    takeaway: "State models a product decision: what to keep, how to order it and how to clear it.",
    sources: ["events", "props", "types"],
    demo: demo("eventLog"),
    notes: `Predict the ordering before running the three-action sequence. Answer: Enter is newest and appears above the two Button clicked entries. Clear restores the instructional empty message.
The spread and slice return new arrays. Unlike PropsDemo's append-only log, this log prepends and truncates; do not describe both logs as having the same policy.
This teaching handler computes a timestamp inside a state updater. For strict purity, a production refinement would compute it before setLogs and pass the prepared entry into a pure updater. The slide shows the current code, not that refinement.`,
  },
  {
    title: "Practice: explain and strengthen the form",
    section: "interaction", layout: "prompt",
    badge: "01", promptLabel: "TRY\nTRACE\nIMPROVE",
    subtitle: "Start with StateDemo's existing behavior before proposing changes.",
    question: "Submit blank fields.\nFix the age error.\nSubmit valid values.\nReset the form.",
    task: "Name each state owner.\n\nTrace updateField.\n\nFind one input edge case.\n\nPropose one improvement.",
    takeaway: "Separate what the app already does from the change you would implement next.",
    sources: ["props", "types", "events", "quality"],
    demo: demo("form"),
    notes: `Suggested answers: FormState owns formData, errors and submitted. Input handlers call updateField; handleSubmit prevents default, validates, and conditionally changes submitted. Reset clears the submitted flag and field data.
Blank submission produces four errors. Age 17 fails; 18 passes the age rule. Other missing fields still fail. A valid four-field submission reveals the success block.
Candidate improvements include raw numeric text plus explicit parsing, a generic key/value setter, associated input labels/error descriptions, or pending/error feedback for a real request. None should be described as already implemented. This is a discussion exercise, not an invented graded assignment.`,
  },
  {
    title: "Hooks have rules because order matters",
    section: "hooks", layout: "cards",
    subtitle: "CustomHooksDemo calls its hooks before deciding what to render.",
    cards: [
      { tag: "WHERE", title: "React functions", body: "Call hooks in function\ncomponents or in\ncustom hooks." },
      { tag: "WHEN", title: "At the top level", body: "Not inside conditions,\nloops or handlers.\nBefore early returns." },
      { tag: "RESPONSIBILITY", title: "Keep work honest", body: "Render computes UI.\nEvents handle actions.\nEffects synchronize." },
    ],
    takeaway: "Custom hook names begin with use. Follow the hooks linter rather than hiding warnings.",
    sources: ["hooks", "quality"],
    demo: demo("fetch", {
      symbol: "CustomHooksDemo hook calls",
      endBefore: "      <h2>6.",
    }),
    notes: `Locate useFetch, both useLocalStorage calls and useWindowDimensions at the top of CustomHooksDemo. The loading/error/data choices occur later in JSX, not around those hook calls.
Ask what would go wrong if useState were called only when isLoggedIn is true: a later render could change hook order. These rules apply to the standard hooks taught here, including useState, useEffect, useContext, useMemo and useCallback.
React's separate use API has different conditional-call rules and is outside this lecture. Do not treat it as an exception for ordinary state and effect hooks.`,
  },
  {
    title: "An effect synchronizes with something outside",
    section: "hooks", layout: "code",
    subtitle: "EffectDemo keeps the browser title synchronized with count.",
    codeLabel: "EffectDemo / CURRENT TITLE EFFECT",
    code: `useEffect(() => {
  const previousTitle = document.title;
  document.title = \`Count: \${count} | React Demo\`;
  return () => { document.title = previousTitle; };
}, [count]);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Read", body: "count is a\nreactive input." },
      { title: "Synchronize", body: "Write the title\nafter commit." },
      { title: "Clean up", body: "Restore the\nprevious title." },
    ],
    takeaway: "Derive values during render; use effects for deliberate external synchronization.",
    sources: ["hooks", "samples"],
    demo: demo("dependencies"),
    notes: `Compare the count paragraph with the browser tab title. Follow the exact effect, including its cleanup, rather than showing only the assignment.
When count changes, React cleans up the previous effect and sets up the next one. Leaving the tab unmounts EffectDemo and restores the captured title. Effects do not run for every abandoned render attempt.
Do not use an effect to copy a derived filtered list or a full name into extra state. The product pipeline later derives values during render. An explicit submit action belongs in its event handler.`,
  },
  {
    title: "Dependencies describe re-synchronization",
    section: "hooks", layout: "table",
    subtitle: "EffectDemo puts four different lifetimes next to one another.",
    headers: ["Dependency argument", "Running example", "When setup runs"],
    widths: [335, 382, 435],
    rows: [
      ["Omitted", "Effect-run display", "After each committed render"],
      ["[]", "Window resize listener", "On mount; cleanup on unmount"],
      ["[count]", "Browser document title", "On mount and count changes"],
      ["[timerRunning]", "Interval timer", "On mount and toggle changes"],
    ],
    rowHeight: 72, size: 23,
    takeaway: "Strict Mode adds a development setup / cleanup cycle. “Exactly once” is the wrong promise.",
    sources: ["hooks"],
    demo: demo("everyRender"),
    notes: `The no-dependency-array effect increments a ref and writes its display through a DOM ref. It avoids using a state setter solely to count effect runs, which would schedule another render and repeat the effect indefinitely.
This DOM write is instrumentation for the lesson, not a recommendation to bypass React for normal UI. A ref persists without causing a render when its current value changes.
React compares dependencies with Object.is. Include reactive values the effect reads, not a hand-picked schedule. Empty dependencies do not prevent remounting or Strict Mode checks. The effect count may start above one; demonstrate changes rather than promising an exact initial number.`,
  },
  {
    title: "Every subscription needs matching cleanup",
    section: "hooks", layout: "code",
    subtitle: "The resize effect registers and removes the same function.",
    codeLabel: "EffectDemo / CURRENT RESIZE EFFECT",
    code: `useEffect(() => {
  const handleResize = () =>
    setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () =>
    window.removeEventListener('resize', handleResize);
}, []);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Setup", body: "Register one\nlistener." },
      { title: "Update", body: "Store the width\nwhen it fires." },
      { title: "Cleanup", body: "Remove that exact\nlistener function." },
    ],
    sources: ["hooks"],
    demo: demo("resize"),
    notes: `Read the listener's local function, registration and returned cleanup. Resize the browser, then switch tabs and return to discuss unmount/remount.
The state setter has stable identity. The effect does not read a changing component value that would require another dependency. A Strict Mode setup-cleanup-setup sequence should leave the intended active listener.
Both EffectDemo's initializer and the later custom dimensions hook access window directly. That is appropriate for this browser-only demo; server-rendered reuse would require a server-safe design.`,
  },
  {
    title: "Predict: stop, reset or leave the tab?",
    section: "hooks", layout: "prompt",
    subtitle: "The timer's state and the interval's lifetime are different things.",
    codeLabel: "CURRENT TIMER / REFLOWED",
    code: `useEffect(() => {
  if (!timerRunning) return;
  const id = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  return () => clearInterval(id);
}, [timerRunning]);`,
    codeSize: 21,
    task: "What does Stop keep?\n\nWhat does Reset clear?\n\nWhat happens after\nleaving this tab\nand returning?",
    sources: ["hooks", "props"],
    demo: demo("timer"),
    notes: `Answer: Stop sets timerRunning false and cleanup clears the interval, but seconds stays at its current value. Reset stops the timer and sets seconds to 0. Switching to another tab unmounts EffectDemo and clears the interval; returning mounts fresh timer state at 0.
The interval callback uses a functional seconds updater, so the effect does not need to read seconds or recreate the interval every tick. timerRunning is the actual reactive dependency.
Timers are not precise clocks; browser scheduling can delay ticks. The lesson is setup/cleanup and state ownership, not elapsed-time accuracy.`,
  },
  {
    title: "A fetch hook exposes observable states",
    section: "hooks", layout: "cards",
    subtitle: "CustomHooksDemo fetches bundled /users.json, not a remote service.",
    cards: [
      { tag: "PENDING", title: "Loading", body: "The card displays Loading users..." },
      { tag: "FULFILLED", title: "Data available", body: "Names and emails replace the loading text." },
      { tag: "REJECTED", title: "Request failed", body: "An alert displays Unable to load users." },
      { tag: "EMPTY ARRAY", title: "No rows", body: "The current code renders an empty list." },
    ],
    sources: ["hooks", "application"],
    demo: demo("fetch", {
      symbol: "fetch UI", start: "      {/* useFetch with bundled data served by Vite */}",
      endBefore: '      <section className="demo-card without-card">',
    }),
    notes: `Read the actual loading ? ... : error ? ... : ... branches in CustomHooksDemo. The fixture is served by the app, so this demonstration needs no external API or backend. The initial loading state may be very brief on a local server.
For a failure demonstration, use browser DevTools request blocking for /users.json and remount the tab; unblock and remount afterward. The current hook has no retry button or refetch method.
An empty array is a successful response, but the current list has no dedicated empty-message text. A clear empty state and retry affordance are proposed UX improvements, not existing features.`,
  },
  {
    title: "Let only the current request update state",
    section: "hooks", layout: "code",
    subtitle: "The running useFetch uses a cancellation flag, not AbortController or a decoder.",
    codeLabel: "useFetch / CURRENT LIFETIME EXCERPTS",
    code: `let cancelled = false;
// Inside fetchData:
const response = await fetch(url);
if (!response.ok) {
  throw new Error(\`HTTP error! status: \${response.status}\`);
}
const result = await response.json();
if (!cancelled) setData(result);

// The effect's cleanup:
return () => { cancelled = true; };`,
    codeSize: 21, codeWidth: 850,
    points: [
      { title: "Status", body: "Check response.ok\nbefore reading JSON." },
      { title: "Lifetime", body: "Ignore results from\nobsolete effects." },
      { title: "Boundary", body: "Parsed JSON is not\nvalidated by T." },
    ],
    sources: ["hooks", "quality"],
    demo: demo("fetch", {
      file: "src/hooks/useFetch.ts", symbol: "useFetch",
      start: "export function useFetch<T>", endBefore: undefined,
      action: "Open Custom Hooks, switch to State, then return to Custom Hooks while watching /users.json in the browser Network panel.",
      expected: "The current mounted hook displays the bundled users. Leaving a tab does not abort the HTTP request; cleanup prevents obsolete state writes.",
    }),
    notes: `The excerpts come from one effect. Source shows the missing surrounding try/catch/finally: data, error and final loading updates are guarded by cancelled. The effect resets loading and error for each URL; it does not clear previous data.
Cleanup sets a closure-local flag. This stops obsolete effects from committing async results, but it does not cancel network transport. AbortController would be a possible enhancement, not the implementation being demonstrated.
useFetch<T>(url) has one argument. It trusts parsed JSON and has no decoder, shared cache or automatic retry. Production refinements may include schema validation, deliberate stale-data policy, request abortion and a data-loading library. Never demonstrate an improved two-argument hook as if this app used it.`,
  },
  {
    title: "Read the generic syntax without the mystery",
    section: "hooks", layout: "table",
    subtitle: "A reusable implementation can preserve a different type at each call site.",
    headers: ["Syntax", "Meaning", "Actual use"],
    widths: [310, 435, 407],
    codeColumns: [0],
    rows: [
      ["<T>", "A placeholder for a type", "useFetch and useLocalStorage"],
      ["<DemoUser[]>", "Choose the result's type", "The bundled users request"],
      ["T | null", "Data or no result yet", "Narrow before reading data"],
      ["as const", "Preserve tuple positions", "Storage value and setter"],
    ],
    rowHeight: 78, size: 24,
    sources: ["hooks", "types"],
    demo: demo("fetch", {
      symbol: "DemoUser / useFetch",
      start: "interface DemoUser {", endBefore: "  // ----- useLocalStorage demo -----",
    }),
    notes: `The real call is useFetch<DemoUser[]>('/users.json'). DemoUser has id, name and email; it is not the richer auth User model with role and lastActive. The generic provides compile-time information, not runtime validation.
The declaration function useFetch<T>(...) needs no trailing comma. A generic arrow declared in TSX can use <T,> to avoid being parsed as a JSX tag; this app uses a named generic function in a .ts file.
useLocalStorage returns [storedValue, setValue] as const so destructuring preserves distinct value and function types. It does not freeze data or imply that the setter has every guarantee of React's setter.`,
  },
  {
    title: "Persistence is a behavior with a contract",
    section: "hooks", layout: "code",
    subtitle: "The current useLocalStorage hook reads lazily and writes inside its custom setter.",
    codeLabel: "CURRENT STORAGE SETTER AND RETURN / EXCERPTS",
    code: `const valueToStore = value instanceof Function
  ? value(storedValue) : value;
setStoredValue(valueToStore);
window.localStorage.setItem(
  key, JSON.stringify(valueToStore)
);

return [storedValue, setValue] as const;`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Read", body: "Parse stored JSON\non initialization." },
      { title: "Write", body: "Update state and\nbrowser storage." },
      { title: "Caution", body: "The setter reads a\ncaptured snapshot." },
    ],
    takeaway: "Accepting updater functions is not the same as preserving React's queued updater semantics.",
    sources: ["hooks", "types"],
    demo: demo("storage"),
    notes: `Open the actual hook: a lazy useState initializer reads the key, catches parse/read failures and falls back to initialValue. setValue resolves an updater against the captured storedValue, sets React state, and writes JSON immediately. Errors are logged, not returned to the UI.
Two updater calls in one handler can both use the same old storedValue and lose an update. A stronger design could expose React's real setter and persist committed state separately, with validated reads and visible errors. That design is an improvement, not the running hook.
Try typing Ada and reloading on the same origin. Use only non-sensitive demo values. There is no cross-tab synchronization or runtime JSON validation; fixed keys and JSON-serializable values are assumed. Strict Mode can call lazy initializers more than once during development.`,
  },
  {
    title: "Extract the whole stateful responsibility",
    section: "hooks", layout: "code",
    subtitle: "useWindowDimensions packages state, subscription and cleanup together.",
    codeLabel: "useWindowDimensions / CURRENT EFFECT, REFLOWED",
    code: `useEffect(() => {
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  window.addEventListener('resize', handleResize);
  return () =>
    window.removeEventListener('resize', handleResize);
}, []);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Hook", body: "Own the browser\nsubscription." },
      { title: "Component", body: "Choose the text\nand bar color." },
      { title: "Scope", body: "Each call creates\nits own listener." },
    ],
    sources: ["hooks"],
    demo: demo("dimensions"),
    notes: `The hook initializes width and height from window, sets up one listener and returns dimensions. CustomHooksDemo consumes that object and chooses the displayed text and color.
The exact color condition is width > 900 for green, width > 600 for amber, otherwise red. At precisely 600 the bar is red, despite the simplified explanatory range text in the running UI.
This browser-only hook does not share a singleton subscription across callers. If many consumers need the same external store, a shared subscription design may be useful. Server rendering also needs a different initialization strategy.`,
  },
  {
    title: "Predict: will this toggle recolor the app?",
    section: "hooks", layout: "prompt",
    subtitle: "Custom Hooks has a saved theme preference; Context has a separate theme value.",
    question: "Click Toggle Theme\ninside Custom Hooks.\n\nWill the entire app\nswitch colors?",
    task: "Predict the result.\n\nFind the storage key.\n\nFind the other owner.\n\nExplain why they differ.",
    takeaway: "Reusing a hook shares logic. It does not automatically share one live state value.",
    sources: ["hooks", "context"],
    demo: demo("storage", {
      file: "src/components/CustomHooksDemo.tsx", symbol: "preferences",
      start: "  const [name, setName]", endBefore: "  // ----- useWindowDimensions demo -----",
      action: "Click Toggle Theme in Custom Hooks → Persistent State while observing the saved preference text and the app's colors.",
      expected: "The stored preference's theme text changes; the app shell's colors do not change.",
    }),
    notes: `Answer: no. The Custom Hooks button updates preferences under the demo-prefs storage key. AppContent reads ThemeContext, whose separate state is owned by ThemeProvider. No connection between those two values is implemented.
The name and preferences hooks also have independent state and different storage keys. Even two calls using the same key would not automatically synchronize their React state in this implementation.
To share a live value, put one state instance in an appropriate common owner and pass props or context. This prediction introduces the distinction between reusable behavior and shared state.`,
  },
  {
    title: "Context connects consumers to one owner",
    section: "context", layout: "diagram", diagram: "context",
    subtitle: "ContextDemo reads auth; its children also consume theme and notifications.",
    takeaway: "Context distributes a value. State in the provider still decides how that value changes.",
    sources: ["context"],
    demo: demo("auth", {
      file: "src/context/AuthContext.tsx", symbol: "AuthProvider",
      start: "export const AuthProvider:", endBefore: "export const useAuth =",
    }),
    notes: `Follow the actual tree: AuthProvider is above AppContent and ContextDemo. ContextDemo reads isAuthenticated and chooses LoginForm or UserProfile. Those children use auth operations and notifications without callback props passed through AppContent.
ThemeToggler reads ThemeContext; NotificationTester reads NotificationContext. These are focused, separate providers, not one global object holding every local field.
Props and composition remain good solutions for nearby components. Context reads the closest matching provider above the consumer; returning a provider below a useContext call does not supply that earlier read.`,
  },
  {
    title: "Make a missing provider an explicit error",
    section: "context", layout: "code",
    subtitle: "The actual useAuth wrapper narrows away undefined.",
    codeLabel: "AuthContext.tsx / CURRENT CONSUMER HOOK",
    code: `export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }
  return context;
};`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Default", body: "undefined means\nno provider." },
      { title: "Guard", body: "Fail clearly on\nmisconfiguration." },
      { title: "Consumer", body: "Read a complete\nAuthContextType." },
    ],
    sources: ["context", "types"],
    demo: demo("auth", {
      file: "src/context/AuthContext.tsx", symbol: "useAuth",
      start: "export const useAuth =", endBefore: undefined,
    }),
    notes: `Inspect createContext<AuthContextType | undefined>(undefined), then the highlighted guard. The hook returns a non-optional context after the check; it does not silently supply dummy login/logout functions.
The live app succeeds because App mounts AuthProvider above every selected demo. There is no need to break the running provider tree to understand the failure branch.
The other context modules use the same consumer-hook pattern. These hooks read shared context; unlike a custom hook containing its own useState, they do not create independent copies of provider state.`,
  },
  {
    title: "Put shared state inside the provider",
    section: "context", layout: "code",
    subtitle: "AuthProvider owns the demo user and exposes login/logout operations.",
    codeLabel: "AuthProvider / CURRENT STATE AND OPERATIONS",
    code: `const [user, setUser] = useState<User | null>(null);
const login = (userData: User) => {
  setUser(userData);
  localStorage.setItem('demoUser', JSON.stringify(userData));
};
const logout = () => {
  setUser(null);
  localStorage.removeItem('demoUser');
};
const isAuthenticated = user !== null;
const isAdmin = user?.role === 'admin';`,
    codeSize: 21, codeWidth: 850,
    points: [
      { title: "Own", body: "One user value\nper provider." },
      { title: "Derive", body: "Flags follow user;\nno duplicate state." },
      { title: "Persist", body: "Save a mock user;\nrestore on mount." },
    ],
    sources: ["context", "hooks"],
    demo: demo("auth", {
      file: "src/context/AuthContext.tsx", symbol: "AuthProvider",
      start: "export const AuthProvider:", endBefore: "export const useAuth =",
      action: "Log out if needed, choose Guest, then reload the app on the same origin and open Context API → Auth.",
      expected: "With valid accessible storage, Guest Charlie is restored from demoUser after mounting.",
    }),
    notes: `Source also shows the provider value and the mount effect that restores demoUser. It parses JSON and reconstructs lastActive as a Date; isAuthenticated and isAdmin are derived directly from user.
Restoring in an effect can briefly render the logged-out branch first. Shape validation, storage-failure feedback and an explicit restoration state are possible production improvements, not currently implemented.
This is mock login chosen by the instructor. A saved role is not proof of identity and hiding a UI element is not server authorization. Do not store credentials or secrets in this demo.`,
  },
  {
    title: "Consumers turn shared values into UI",
    section: "context", layout: "code",
    subtitle: "UserProfile reads auth and requests both logout and notification feedback.",
    codeLabel: "UserProfile / CURRENT LOGIC",
    code: `const { user, logout, isAdmin } = useAuth();
const { addNotification } = useNotifications();

if (!user) return null;

const handleLogout = () => {
  logout();
  addNotification('Logged out', 'info');
};`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Read", body: "Auth supplies user\nand role flags." },
      { title: "Narrow", body: "No user means\nno profile." },
      { title: "Act", body: "Call operations;\ndo not mutate user." },
    ],
    sources: ["context", "events"],
    demo: demo("auth", {
      symbol: "UserProfile", start: "const UserProfile:", endBefore: "// ---------- Theme toggler ----------",
    }),
    notes: `The profile displays the name, email and role, plus an admin badge when isAdmin is true. Its logout button calls handleLogout; ContextDemo then switches back to LoginForm using isAuthenticated.
LoginForm similarly constructs a mock user, calls login and adds a success message. The toast UI lives in NotificationTester in the same Context tab, not in an app-wide overlay mounted beside every demo.
Hooks are called before the early return. null is a legitimate render result, not an exception.`,
  },
  {
    title: "The real theme toggle has one shared owner",
    section: "context", layout: "code",
    subtitle: "ThemeToggler and AppContent read the same ThemeProvider.",
    codeLabel: "ThemeProvider / CURRENT CORE",
    code: `const [theme, setTheme] =
  useState<'light' | 'dark'>('light');
const toggleTheme = () => {
  setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
};
return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>
);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Union", body: "Only light or dark\nin typed code." },
      { title: "Update", body: "Toggle from the\nprevious value." },
      { title: "Consumers", body: "Text and app colors\nchange together." },
    ],
    sources: ["context", "types"],
    demo: demo("theme"),
    notes: `Open ThemeProvider, then connect its value to ThemeToggler's label and AppContent's app/theme class. Toggle once and observe both parts change from the same value.
This theme persists when switching tabs because the provider stays mounted. It is not stored by ThemeProvider, so a full reload resets it to light. The demo-prefs object in Custom Hooks is independent and does not restore this provider.
The provider creates a fresh value object when it renders. Split responsibilities for clarity first; only stabilize provider values if profiling demonstrates useful avoided work.`,
  },
  {
    title: "The notification provider owns dismissal",
    section: "context", layout: "code",
    subtitle: "NotificationTester renders messages; NotificationProvider schedules their removal.",
    codeLabel: "NotificationProvider / CURRENT EXCERPTS",
    code: `const id = Date.now().toString();
setNotifications(prev => [
  ...prev, { id, message, type }
]);
setTimeout(() => removeNotification(id), 3000);

const removeNotification = useCallback((id: string) => {
  setNotifications(prev => prev.filter(n => n.id !== id));
}, []);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Add", body: "Append a typed\nmessage object." },
      { title: "Remove", body: "Filter by ID after\n3 seconds or ×." },
      { title: "Render", body: "The Context card\nconsumes the list." },
    ],
    takeaway: "There is one current timer owner: the provider, not a separate NotificationItem component.",
    sources: ["context", "hooks", "samples"],
    demo: demo("notifications"),
    notes: `The top excerpt is inside addNotification; the bottom is the removeNotification callback defined earlier in the provider. Source shows their true declaration order. NotificationTester calls these operations and maps the shared list to toast elements.
Click Success and observe the three-second removal, then dismiss Info manually. The provider's timer will later try to remove the already-removed ID; filtering simply leaves the list unchanged.
Current caveats: Date.now IDs can collide; timeout handles are not retained for provider-unmount cleanup; the shared type's optional duration is not used by this provider. Unique IDs, timer ownership/cleanup and accessible announcement/dismiss labels are production refinements, not implemented guarantees.`,
  },
  {
    title: "Optimize measured work, not every line",
    section: "application", layout: "cards",
    subtitle: "PerformanceDemo combines three related but different tools.",
    cards: [
      { tag: "COMPONENT", title: "memo", body: "ExpensiveChild can skip\nparent-driven renders\nwith equal props." },
      { tag: "VALUE", title: "useMemo", body: "The items array keeps\nits reference while\nits inputs stay equal." },
      { tag: "FUNCTION", title: "useCallback", body: "handleItemClick keeps\nits reference and\nupdates selectedItem." },
    ],
    takeaway: "Correctness comes first. Memoization is a performance choice, not a semantic guarantee.",
    sources: ["quality", "hooks"],
    demo: demo("memoChild"),
    notes: `Locate memo around ExpensiveChild, useMemo for items and useCallback for handleItemClick. The same array and function references let the child normally skip a parent count update.
Click Increment Parent, then React. Parent count and Last clicked change without changing those props. memo does not block the child's own state/context updates, and caches may be discarded.
The displayed childRenderCount is a module variable incremented during render. It is illustrative instrumentation, not a reliable production render metric, and Strict Mode/HMR can affect it. Use React DevTools Profiler for measurement; do not promise a particular initial count or use this mutation pattern in real rendering logic.`,
  },
  {
    title: "A cached value depends on specific inputs",
    section: "application", layout: "code",
    subtitle: "In PerformanceDemo, count changes Fibonacci; selectedItem does not.",
    codeLabel: "PerformanceDemo / CURRENT CALCULATION",
    code: `const fibonacci = useMemo(() => {
  const fib = (n: number): number =>
    n <= 1 ? n : fib(n - 1) + fib(n - 2);
  return fib(count > 35 ? 35 : count);
}, [count]);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Calculate", body: "Call fib with\nthe capped count." },
      { title: "Dependency", body: "Recompute when\ncount changes." },
      { title: "Separate state", body: "A child-item click\nchanges selection." },
    ],
    takeaway: "The current computation caps at 35. Keep classroom inputs small.",
    sources: ["hooks", "quality"],
    demo: demo("calculation"),
    notes: `On a freshly mounted Performance tab, two parent increments produce count 2 and Fibonacci result 1. Clicking TypeScript changes selectedItem but not count, so the cached calculation can be reused.
The current code uses count > 35 ? 35 : count. Above 35, the UI still labels the original count but the computed result is F(35); do not present it as the uncapped mathematical result. The memo also still depends on the original count.
This intentionally recursive calculation is a teaching workload. A better algorithm or moving heavy work off the main thread may be more valuable than caching. Memoization does not make the first expensive calculation cheap.`,
  },
  {
    title: "Predict: what does the elapsed time mean?",
    section: "application", layout: "prompt",
    subtitle: "The useMemo tab stores the result and the time of that calculation together.",
    codeLabel: "CURRENT fibResult / REFLOWED",
    code: `const fibResult = useMemo(() => {
  const start = performance.now();
  const result = slowFibonacci(
    Math.min(fibInput, 40));
  const elapsed =
    performance.now() - start;
  return { result, elapsed };
}, [fibInput]);`,
    codeSize: 21,
    task: "Set the input to 20.\n\nIncrement the unrelated\ncounter.\n\nPredict the result\nand elapsed display.",
    takeaway: "Elapsed is the last measured calculation duration, not the cost of every render.",
    sources: ["hooks", "quality"],
    demo: demo("fibonacci"),
    notes: `Answer: F(20) is 6765. The unrelated counter changes, but the cached result and its elapsed field remain the same. The elapsed value is not necessarily 0; the running explanatory text's “stay at 0 ms” is not an accurate promise.
Changing fibInput invalidates this cache. The callback measures the synchronous recursive calculation and caps its argument at 40. Use a modest value such as 20 in class rather than deliberately blocking the UI at the cap.
Timing is pedagogical instrumentation inside the calculation. Strict Mode can invoke calculations again during development checks, so treat timing and invocation counts as illustrations, not benchmarks.`,
  },
  {
    title: "Filter products from three state inputs",
    section: "application", layout: "flow",
    subtitle: "UseMemoDemo derives its visible rows from the fixed SAMPLE_PRODUCTS catalog.",
    steps: [
      { title: "Search", body: "Match name\nor category,\ncase-insensitively." },
      { title: "Stock", body: "Optionally keep\nonly in-stock\nproducts." },
      { title: "Sort", body: "Copy, then order\nby name\nor price." },
      { title: "Render", body: "Display rows\nand derived\nstatistics." },
    ],
    takeaway: "The filter dependencies are searchTerm, sortBy and showInStockOnly.",
    sources: ["samples", "application", "hooks"],
    demo: demo("products"),
    notes: `Trace the three state declarations into filteredProducts. Search matches lowercase product name OR category; the stock filter then narrows that result. Sorting uses a copied array.
Try Electronics → price → in stock. The two surviving rows are Wireless Mouse and Mechanical Keyboard, in ascending price order. The current search does not trim whitespace, so trailing spaces can affect matches.
This ten-product catalog belongs only to UseMemoDemo. It is not the reducer's book/course catalog and is not fetched from useFetch. Ten records do not prove a performance need; the pipeline demonstrates dependency and derived-data structure.`,
  },
  {
    title: "Sorting must not mutate the source array",
    section: "application", layout: "compare",
    subtitle: "The running product pipeline already copies before calling sort.",
    columns: [
      { label: "AVOID / HYPOTHETICAL ALIAS", codeSize: 21, code: `let result = SAMPLE_PRODUCTS;
result.sort((a, b) =>
  a.price - b.price);`, body: "With no filtering first, this rewrites\nthe source catalog's array order." },
      { label: "CURRENT / COPY THEN SORT", codeSize: 21, code: `result = [...result].sort((a, b) => {
  if (sortBy === 'name')
    return a.name.localeCompare(b.name);
  return a.price - b.price;
});`, body: "Sorting changes the display copy,\nnot the original SAMPLE_PRODUCTS." },
    ],
    sources: ["samples", "types"],
    demo: demo("products", {
      symbol: "immutable sort",
      start: "    result = [...result].sort", endBefore: "  const stats = useMemo",
      action: "Clear the product search, uncheck In stock only, switch from Sort by Name to Sort by Price, then back.",
      expected: "All ten rows reorder by the selected comparator; price order starts with Developer Sticker Pack at $9.99.",
    }),
    notes: `The current filter begins with let result = SAMPLE_PRODUCTS, which initially aliases the source array. Copying immediately before sort protects it even if neither filter ran.
This is a comparison with a hypothetical mistake, not a bug claimed to exist in the running pipeline. The safe branch shown on the right is already implemented.
useMemo callbacks run during rendering and must not mutate shared inputs. A cache is not permission to perform side effects. For more complex sorting, preserve typed comparator choices and runtime validation at external boundaries.`,
  },
  {
    title: "Statistics are derived from the visible rows",
    section: "application", layout: "code",
    subtitle: "The second memo depends on filteredProducts, not another copy of filter state.",
    codeLabel: "UseMemoDemo / CURRENT stats, REFLOWED",
    code: `const stats = useMemo(() => ({
  total: filteredProducts.length,
  avgPrice: filteredProducts.length > 0
    ? filteredProducts.reduce(
        (sum, p) => sum + p.price, 0
      ) / filteredProducts.length
    : 0,
  inStockCount:
    filteredProducts.filter(p => p.inStock).length,
}), [filteredProducts]);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Count", body: "Visible rows,\nnot catalog size." },
      { title: "Average", body: "Guard division\nwhen none match." },
      { title: "Dependency", body: "Follow the same\nfiltered array." },
    ],
    sources: ["hooks", "samples", "types"],
    demo: demo("products", {
      symbol: "stats", start: "  const stats = useMemo",
      action: "Search for zzzz-no-match in Filtered Product List, then replace it with Electronics and check In stock only.",
      expected: "The no-match state reports 0 products and $0.00 average; the in-stock Electronics result reports 2 products and $89.99 average.",
    }),
    notes: `Read the dependency chain: three controls → filteredProducts → stats → rendered table and summary. total and average are not independently editable state.
The empty guard avoids dividing by zero. The current UI keeps table headers but renders no product rows; it does not display a dedicated no-matches message. Adding that message would improve feedback.
Because filteredProducts itself is memoized, its reference can remain stable when unrelated state changes. These caches are teaching choices; measure before retaining them in a small real feature.`,
  },
  {
    title: "Name transitions with reducer actions",
    section: "application", layout: "table",
    subtitle: "UseReducerDemo has one local cart and five explicit action shapes.",
    headers: ["Action", "Payload", "Visible transition"],
    widths: [325, 360, 467],
    codeColumns: [0],
    rows: [
      ["ADD_ITEM", "id, name, price", "Add a row or increase its quantity"],
      ["REMOVE_ITEM", "id", "Remove that row"],
      ["UPDATE_QUANTITY", "id, delta", "Adjust quantity; drop zero"],
      ["CLEAR_CART", "None", "Remove all items"],
      ["TOGGLE_CART", "None", "Hide or show cart contents"],
    ],
    rowHeight: 70, size: 23,
    sources: ["hooks", "types", "application"],
    demo: demo("reducerOverview"),
    notes: `Open CartState and the CartAction discriminated union. The type field identifies an action and lets TypeScript narrow which payload exists in each switch case. CLEAR_CART and TOGGLE_CART intentionally have no payload.
The component calls useReducer(cartReducer, initialState). UI handlers dispatch descriptions; the reducer computes the next state. This centralizes transitions without making the cart app-wide or persistent.
useState is still appropriate for simple independent fields. Reducers are useful when transitions are easier to explain and test together. dispatch has stable identity; an inline arrow wrapping dispatch is still a new function when rendered.`,
  },
  {
    title: "The reducer decides what adding means",
    section: "application", layout: "code",
    subtitle: "Adding the same catalog product twice increases quantity, not row count.",
    codeLabel: "cartReducer / CURRENT ADD_ITEM BRANCH, REFLOWED",
    code: `const existing = state.items.find(
  i => i.id === action.payload.id
);
if (existing) {
  return { ...state, items: state.items.map(i =>
    i.id === action.payload.id
      ? { ...i, quantity: i.quantity + 1 } : i
  ) };
}
return { ...state, items: [
  ...state.items, { ...action.payload, quantity: 1 }
] };`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Find", body: "Match the stable\nproduct ID." },
      { title: "Existing", body: "Replace one item\nwith quantity + 1." },
      { title: "New", body: "Append a new item\nwith quantity 1." },
    ],
    sources: ["hooks", "types", "samples"],
    demo: demo("catalog", {
      start: "    case 'ADD_ITEM': {", endBefore: "    case 'REMOVE_ITEM':",
    }),
    notes: `Read the real ADD_ITEM branch, then inspect the catalog button's dispatch({type: 'ADD_ITEM', payload: product}). The reducer returns a new state object and a new items array, preserving unrelated fields such as isOpen.
Start from an empty cart and add React Fundamentals Book twice. Answer: one row, quantity 2, item count 2 and total $59.98. The catalog also reports ×2 in cart.
Keep reducers pure: no storage, network requests, timestamps or notifications inside the transition function. Development checks may call reducers again to detect impurities.`,
  },
  {
    title: "One transition can update several facts",
    section: "application", layout: "code",
    subtitle: "UPDATE_QUANTITY adjusts a row and removes it when quantity reaches zero.",
    codeLabel: "cartReducer / CURRENT items EXPRESSION",
    code: `items: state.items
  .map(i =>
    i.id === action.payload.id
      ? {
          ...i,
          quantity: i.quantity + action.payload.delta
        }
      : i
  )
  .filter(i => i.quantity > 0)`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Map", body: "Change only the\nmatching item." },
      { title: "Filter", body: "Remove quantities\nat or below zero." },
      { title: "Preserve", body: "Other items keep\ntheir values." },
    ],
    sources: ["hooks", "types"],
    demo: demo("cart", {
      symbol: "UPDATE_QUANTITY",
      start: "    case 'UPDATE_QUANTITY': {", endBefore: "    case 'CLEAR_CART':",
      action: "Show and clear the cart, add one React Fundamentals Book, then click its − button.",
      expected: "The quantity reaches zero, the row disappears, and the cart returns to its empty message and 0-item heading.",
    }),
    notes: `The code block is the items expression inside the branch's returned state object. Source shows the enclosing spread that preserves isOpen. UPDATE_QUANTITY is different from REMOVE_ITEM, which removes a row regardless of its quantity.
Predict the boundary case before clicking − at quantity 1: map produces quantity 0 and filter removes it in the same transition. No effect is needed to clean up zero-quantity rows afterward.
The current UI only dispatches deltas of -1 or +1. If actions came from an untrusted source, runtime checks for valid IDs and finite integer quantities would be needed; the TypeScript union is not runtime validation.`,
  },
  {
    title: "Cart totals are calculations, not more state",
    section: "application", layout: "code",
    subtitle: "useReducer owns the facts; useMemo derives the summary.",
    codeLabel: "UseReducerDemo / CURRENT HOOKS, REFLOWED",
    code: `const [cart, dispatch] =
  useReducer(cartReducer, initialState);
const summary = useMemo(() => ({
  totalItems: cart.items.reduce(
    (sum, i) => sum + i.quantity, 0),
  totalPrice: cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity, 0),
}), [cart.items]);`,
    codeSize: 21, codeWidth: 800,
    points: [
      { title: "Facts", body: "items and isOpen\nlive in cart state." },
      { title: "Summary", body: "Quantities and\nprices determine it." },
      { title: "Toggle", body: "Hiding the cart\ndoes not clear items." },
    ],
    takeaway: "totalItems counts units, not distinct rows. One source of truth keeps the numbers consistent.",
    sources: ["hooks", "types", "application"],
    demo: demo("cart", {
      symbol: "summary", start: "const UseReducerDemo:",
      endBefore: "      <h2>10.",
      action: "Show and clear the cart. Add React Fundamentals Book twice and Developer Sticker Pack once, then hide and show the cart.",
      expected: "Two rows represent 3 items and a $69.97 total; hiding and showing preserves those values.",
    }),
    notes: `Trace the reducer result into summary and then the cart heading, row subtotals and total. Adding two books and one sticker pack demonstrates that item count is not array length.
TOGGLE_CART returns a new state object but keeps the same items reference. The summary cache can therefore be reused while the visibility field changes. Removing or clearing items changes the input to the summary.
The example uses floating-point prices and toFixed(2) for display. Real financial calculations commonly use integer minor units or an appropriate decimal model; formatting alone is not an accounting guarantee.`,
  },
  {
    title: "State lifetime follows the component tree",
    section: "application", layout: "diagram", diagram: "architecture",
    subtitle: "Providers remain mounted; changing tabs replaces the active demo component.",
    sources: ["application", "context", "props"],
    demo: demo("providers", {
      tab: "usereducer", example: "cart", symbol: "App / AppContent",
      start: "const AppContent:", endBefore: undefined,
      action: "Toggle the theme in Context API, open useReducer and add a book, visit State, then return to useReducer.",
      expected: "The cart is fresh after remounting, while the selected app theme remains across tab changes.",
    }),
    notes: `Read the actual containment order: ThemeProvider → AuthProvider → NotificationProvider → AppContent → the active demo component. AppContent's selection is what mounts a particular topic.
Counter state, product filters and the cart are local to their demo components and reset when those components unmount/remount. Theme and auth values remain because their providers stay above the changing tab. Storage-backed hooks can restore persisted values when remounted; they do not preserve the unmounted component itself.
No additional feature layer or app-wide notification display is mounted here. The product and cart tabs are separate examples. To make a future cart persist across tabs, deliberately lift or persist its state rather than assuming useReducer is global.`,
  },
  {
    title: "Teaching code is not a production contract",
    section: "application", layout: "cards",
    subtitle: "Keep the working behavior separate from the improvements you recommend.",
    cards: [
      { tag: "DATA", title: "Validate boundaries", body: "Mock login is not auth.\nGenerics do not decode\nJSON or stored values." },
      { tag: "LIFETIMES", title: "Own external work", body: "Audit subscriptions,\nrequests, storage errors\nand notification timers." },
      { tag: "ACCESS", title: "Make feedback usable", body: "Associate labels.\nAnnounce errors.\nKeep keyboard access." },
    ],
    takeaway: "Use build, lint and browser checks; passing type checks cannot prove the interaction is correct.",
    sources: ["quality", "application", "hooks", "context"],
    demo: demo("auth", {
      file: "src/context/AuthContext.tsx", symbol: "AuthProvider",
      start: "export const AuthProvider:", endBefore: "export const useAuth =",
      action: "Choose Guest in Context API after logging out, inspect the guest profile, then log out again.",
      expected: "A local mock profile appears and disappears; the role choice is not verified against a server.",
    }),
    notes: `Use AuthProvider as a concrete boundary review: the app trusts a chosen mock role and parsed saved data. It is a lesson in UI ownership, not a completed authentication system.
Other explicit improvement candidates from this lecture are safer storage updater semantics, validated fetch results and retry/empty feedback, stable IDs for editable string lists, notification IDs/timer cleanup, and associated form labels/error descriptions. We have not silently implemented these while presenting the demo.
An error boundary could provide a fallback for descendant rendering failures, but none is part of the current app tree. It would not replace request-error or event-handler feedback. Profile actual slow work rather than treating the render counters and elapsed labels as production benchmarks.`,
  },
  {
    title: "Practice: explain the product pipeline",
    section: "practice", layout: "prompt",
    badge: "02", promptLabel: "PREDICT\nTRACE\nEXTEND",
    subtitle: "Start from the Filtered Product List in the useMemo tab.",
    question: "Search Electronics.\nSort by Price.\nShow in-stock only.\n\nPredict rows and stats.",
    task: "Locate the state inputs.\n\nName each memo's\ndependencies.\n\nExplain the copied sort.\n\nPropose a max-price filter.",
    takeaway: "An added filter must affect the calculation and its dependencies; do not duplicate the results.",
    sources: ["samples", "hooks", "types", "quality"],
    demo: demo("products"),
    notes: `Answer: Wireless Mouse at $49.99 followed by Mechanical Keyboard at $129.99; total 2, average $89.99, in-stock count 2. filteredProducts depends on searchTerm, sortBy and showInStockOnly; stats depends on filteredProducts.
The copy before sorting prevents mutation even when no earlier filter allocates a new array. A no-match search currently shows zero statistics and no table rows, not a dedicated empty-state message.
The proposed max-price extension would add one controlled input/state value, a deliberate empty/invalid-number policy, a filter step and the corresponding dependency. It is a practice design, not a control already running in this app. Ask whether ten products justify caching after correctness is established.`,
  },
  {
    title: "Practice: predict the cart transitions",
    section: "practice", layout: "prompt",
    badge: "03", promptLabel: "DISPATCH\nPREDICT\nVERIFY",
    subtitle: "Use the existing useReducer tab; begin with an empty, visible cart.",
    question: "Add the book twice.\nReduce quantity once.\nHide, then show the cart.\nRemove the book.",
    task: "Name every action.\n\nPredict rows and total.\n\nIdentify unchanged state.\n\nSuggest a reducer test.",
    takeaway: "Explain each transition as previous state + action → next state, with no mutation.",
    sources: ["hooks", "types", "application", "quality"],
    demo: demo("cart", {
      symbol: "cartReducer", start: "function cartReducer(",
      endBefore: "// ---------- Sample catalog ----------",
      action: "Show and clear the cart. Add React Fundamentals Book twice, click − once, hide and show the cart, then click Remove.",
      expected: "The same row changes from quantity 2 / $59.98 to quantity 1 / $29.99; hiding preserves it; Remove produces the empty cart and 0-item heading.",
    }),
    notes: `Answer sequence: ADD_ITEM twice yields one row with quantity 2 and $59.98. UPDATE_QUANTITY with delta -1 yields quantity 1 and $29.99. Two TOGGLE_CART actions change only visibility. REMOVE_ITEM deletes the row; the empty branch no longer displays a monetary total.
Suggested pure reducer tests: adding an existing ID increases quantity without duplicating a row; decrementing 1 removes the item; CLEAR_CART retains isOpen; TOGGLE_CART retains the items reference; the previous state is unchanged.
The cart is still local to UseReducerDemo. A persistence or cross-tab-sharing extension would need an intentional owner and lifecycle strategy, not just a new reducer action.`,
  },
  {
    title: "Explain the change,\nnot just the code.",
    section: "practice", layout: "closing",
    subtitle: "One tabbed app. Real components. Observable results.\nClear contracts, owners and external effects.",
    questions: [
      "Which event and state transition caused this render?",
      "Where does the value live, and how long does it survive?",
      "What needs validation, synchronization or cleanup?",
    ],
    sources: ["intro", "props", "hooks", "context", "quality", "application"],
    demo: demo("app", {
      tab: "usereducer", example: "cart",
      action: "Open useReducer, show and clear the cart if needed, then add React Fundamentals Book and explain its visible count and total.",
      expected: "The cart shows one book, 1 item and $29.99; AppContent still owns which demo tab is mounted.",
    }),
    notes: `Exit ticket: choose the cart, product filter, timer or shared theme and answer the three questions using its real source and visible UI.
For the cart, a catalog click dispatches ADD_ITEM, the local reducer returns new items, the memo derives totals, and the cart renders them. AppContent decides whether that component remains mounted. For the timer, an effect owns an interval that must be cleared; for theme, a provider owns the shared value.
Review the distinction between implemented behavior and proposed production refinements. Reference the root README for broader explanations, react.dev/learn for the rendering/state model, react.dev/reference/react/useEffect for synchronization, and the TypeScript handbook for generics and utility types.`,
  },
];

export const deck = slides.map(slide => ({
  ...slide,
  notes: `CONCEPT\n${slide.notes}\n\nCODE\nOpen ${slide.demo.file} at ${slide.demo.symbol}. Read the highlighted current source before trying the UI.\n\nTRY IT\n${slide.demo.action}\nExpected: ${slide.demo.expected}`,
}));
