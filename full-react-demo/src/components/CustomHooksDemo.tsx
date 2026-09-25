// ============================================================
// 6️⃣  CustomHooksDemo — Reusable Stateful Logic
// ============================================================
// Topics from the notes:
//   • useFetch<T>  — generic data fetching hook
//   • useLocalStorage<T>  — persistent state hook
//   • useWindowDimensions  — responsive layout hook
//   • Why custom hooks eliminate code duplication
// ============================================================

import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

interface DemoUser {
  id: number;
  name: string;
  email: string;
}

const CustomHooksDemo: React.FC = () => {
  const { data: users, loading, error } = useFetch<DemoUser[]>('/users.json');

  // ----- useLocalStorage demo -----
  const [name, setName] = useLocalStorage<string>('demo-name', '');
  const [preferences, setPreferences] = useLocalStorage('demo-prefs', {
    theme: 'light',
    language: 'en',
  });

  // ----- useWindowDimensions demo -----
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <h2>6. Custom Hooks</h2>

      {/* useLocalStorage */}
      <section id="hooks-storage" className="demo-card">
        <h3>useLocalStorage — Persistent State</h3>
        <p className="explanation">
          Type your name, then <strong>refresh the page</strong>. The value
          is saved in <code>localStorage</code> and restored automatically.
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (persisted)…"
          style={{ width: '100%', marginBottom: 8 }}
        />
        <p>Stored value: <strong>{name || '(empty)'}</strong></p>

        <h4 style={{ marginTop: 16 }}>Object in localStorage:</h4>
        <p>Theme: <strong>{preferences.theme}</strong> | Language: <strong>{preferences.language}</strong></p>
        <div className="flex-row">
          <button
            className="btn"
            onClick={() => setPreferences(prev => ({
              ...prev,
              theme: prev.theme === 'light' ? 'dark' : 'light',
            }))}
          >
            Toggle Theme
          </button>
          <button
            className="btn"
            onClick={() => setPreferences(prev => ({
              ...prev,
              language: prev.language === 'en' ? 'es' : 'en',
            }))}
          >
            Toggle Language
          </button>
        </div>
      </section>

      {/* useWindowDimensions */}
      <section id="hooks-dimensions" className="demo-card">
        <h3>useWindowDimensions — Responsive Hook</h3>
        <p>
          Width: <strong>{width}px</strong> | Height: <strong>{height}px</strong>
        </p>
        <div
          style={{
            height: 20,
            background: width > 900 ? '#059669' : width > 600 ? '#d97706' : '#dc2626',
            borderRadius: 4,
            transition: 'background 0.3s',
          }}
        />
        <p className="explanation">
          🟢 &gt; 900px (desktop) &nbsp; 🟡 600–900px (tablet) &nbsp; 🔴 &lt; 600px (mobile)
          <br />Resize the window to see the bar change colour.
        </p>
      </section>

      {/* useFetch with bundled data served by Vite */}
      <section id="hooks-fetch" className="demo-card">
        <h3>useFetch&lt;T&gt; — Generic Data Fetching</h3>
        <p className="explanation">
          The <code>useFetch</code> hook (in <code>hooks/useFetch.ts</code>)
          encapsulates the <code>fetch → loading → data | error</code>
          pattern. This example loads <code>/users.json</code> from the
          app's bundled sample data, so no backend or external API is required.
        </p>
        {loading ? (
          <p role="status">Loading users...</p>
        ) : error ? (
          <p role="alert">Unable to load users: {error}</p>
        ) : (
          <ul>
            {users?.map(user => (
              <li key={user.id}>{user.name} — {user.email}</li>
            ))}
          </ul>
        )}
        <pre className="code-block">{`// Local fixture served by Vite:
const { data, loading, error } = useFetch<DemoUser[]>('/users.json');

if (loading) return <p>Loading…</p>;
if (error)   return <p>Error: {error}</p>;
return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;`}</pre>
        <p className="explanation">
          The fixture has a known shape. A generic type does not validate
          untrusted JSON; validate external API responses at the data boundary.
        </p>
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ What Would Happen Without Custom Hooks?</h3>
        <ul>
          <li>
            <strong>Without useLocalStorage:</strong> Every component that
            needs persistence would duplicate the same
            <code> JSON.parse / JSON.stringify / try-catch</code> boilerplate.
            A bug fix (e.g., handling storage quota errors) would need to be
            applied in every copy.
          </li>
          <li>
            <strong>Without useFetch:</strong> Each component would repeat
            the same <code>useState + useEffect + fetch + try/catch</code>
            pattern. Loading and error states would be inconsistent across
            the app because every developer writes them slightly differently.
          </li>
          <li>
            <strong>Without useWindowDimensions:</strong> Components would
            manually manage resize listeners, risking memory leaks if the
            cleanup is forgotten. The responsive behaviour would be spread
            across many places instead of one reusable hook.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CustomHooksDemo;
