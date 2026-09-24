// ============================================================
// 9️⃣  UseMemoDemo — Memoizing expensive computations
// ============================================================
// Topics:
//   • useMemo for caching expensive calculations
//   • useMemo for stabilising object/array references
//   • Dependency arrays — when does useMemo recompute?
//   • Comparing with and without useMemo
// ============================================================

import React, { useState, useMemo } from 'react';

// ---------- Simulated expensive computation ----------
const slowFibonacci = (n: number): number => {
  if (n <= 1) return n;
  return slowFibonacci(n - 1) + slowFibonacci(n - 2);
};

// ---------- Product filtering demo ----------
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 49.99, category: 'Electronics', inStock: true },
  { id: 3, name: 'USB-C Hub', price: 39.99, category: 'Electronics', inStock: false },
  { id: 4, name: 'Desk Lamp', price: 24.99, category: 'Office', inStock: true },
  { id: 5, name: 'Standing Desk Mat', price: 59.99, category: 'Office', inStock: true },
  { id: 6, name: 'Notebook Set', price: 12.99, category: 'Office', inStock: false },
  { id: 7, name: 'React T-Shirt', price: 19.99, category: 'Apparel', inStock: true },
  { id: 8, name: 'TypeScript Hoodie', price: 44.99, category: 'Apparel', inStock: true },
  { id: 9, name: 'Developer Sticker Pack', price: 9.99, category: 'Accessories', inStock: true },
  { id: 10, name: 'Cable Organiser', price: 14.99, category: 'Accessories', inStock: false },
];

const UseMemoDemo: React.FC = () => {
  // --- Fibonacci demo ---
  const [fibInput, setFibInput] = useState(10);
  const [unrelatedCount, setUnrelatedCount] = useState(0);

  // useMemo: fibonacci only recalculates when fibInput changes,
  // NOT when unrelatedCount changes.
  const fibResult = useMemo(() => {
    const start = performance.now();
    const result = slowFibonacci(Math.min(fibInput, 40)); // cap at 40
    const elapsed = performance.now() - start;
    return { result, elapsed };
  }, [fibInput]);

  // --- Product filtering demo ---
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = SAMPLE_PRODUCTS;

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showInStockOnly) {
      result = result.filter(p => p.inStock);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.price - b.price;
    });

    return result;
  }, [searchTerm, sortBy, showInStockOnly]);

  const stats = useMemo(() => ({
    total: filteredProducts.length,
    avgPrice: filteredProducts.length > 0
      ? filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length
      : 0,
    inStockCount: filteredProducts.filter(p => p.inStock).length,
  }), [filteredProducts]);

  return (
    <div>
      <h2>9. useMemo — Caching Expensive Computations</h2>

      {/* Fibonacci */}
      <section className="demo-card">
        <h3>Expensive Calculation: Fibonacci</h3>
        <p className="explanation">
          The Fibonacci function is intentionally slow (recursive with no cache).
          <code>useMemo</code> ensures it only recalculates when the input changes.
          Clicking "Increment Unrelated Counter" does <strong>NOT</strong> trigger
          a recalculation — watch the elapsed time stay at 0 ms.
        </p>
        <div className="flex-row" style={{ alignItems: 'center', gap: 12 }}>
          <label>
            Fibonacci of:&nbsp;
            <input
              type="number"
              value={fibInput}
              min={0}
              max={40}
              onChange={e => setFibInput(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </label>
          <span>= <strong>{fibResult.result}</strong></span>
          <span style={{ color: 'var(--muted)' }}>({fibResult.elapsed.toFixed(1)} ms)</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => setUnrelatedCount(c => c + 1)}>
            Increment Unrelated Counter ({unrelatedCount})
          </button>
          <span style={{ marginLeft: 8, color: 'var(--muted)', fontSize: '0.85rem' }}>
            ↑ This does NOT recalculate Fibonacci
          </span>
        </div>
      </section>

      {/* Product filter */}
      <section className="demo-card">
        <h3>Filtered Product List</h3>
        <p className="explanation">
          Filtering, sorting, and computing statistics are all wrapped in
          <code>useMemo</code>. The filter pipeline only re-runs when the search
          term, sort order, or in-stock checkbox changes.
        </p>

        <div className="flex-row" style={{ flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid var(--border)' }}
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'name' | 'price')}
            style={{ padding: '6px 10px', borderRadius: 4, border: '1px solid var(--border)' }}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <label style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={e => setShowInStockOnly(e.target.checked)}
            />
            In stock only
          </label>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 8 }}>
          Showing {stats.total} products · Avg price: ${stats.avgPrice.toFixed(2)} · In stock: {stats.inStockCount}
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '6px 8px' }}>Name</th>
              <th style={{ padding: '6px 8px' }}>Category</th>
              <th style={{ padding: '6px 8px' }}>Price</th>
              <th style={{ padding: '6px 8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '6px 8px' }}>{p.name}</td>
                <td style={{ padding: '6px 8px' }}>{p.category}</td>
                <td style={{ padding: '6px 8px' }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: '6px 8px' }}>
                  {p.inStock
                    ? <span style={{ color: 'var(--success)' }}>✓ In Stock</span>
                    : <span style={{ color: 'var(--danger)' }}>✗ Out of Stock</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="demo-card without-card">
        <h3>⚠️ When NOT to Use useMemo</h3>
        <ul>
          <li>
            <strong>Simple calculations:</strong> If the computation is trivial
            (e.g., adding two numbers), the overhead of memoisation is greater
            than just doing the work. <code>useMemo</code> itself has a cost —
            it must store the previous result and compare dependencies.
          </li>
          <li>
            <strong>Premature optimisation:</strong> Don't wrap everything in
            <code>useMemo</code> "just in case." Start without it, measure with
            React DevTools Profiler, and add it only where you see a real
            performance problem.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UseMemoDemo;
