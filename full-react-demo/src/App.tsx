// ============================================================
// App.tsx — Main application with tabbed navigation
// Wraps everything in Context Providers and lets the instructor
// click through each topic section during class.
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import ComponentsDemo from './components/ComponentsDemo';
import PropsDemo from './components/PropsDemo';
import StateDemo from './components/StateDemo';
import EventsDemo from './components/EventsDemo';
import EffectDemo from './components/EffectDemo';
import CustomHooksDemo from './components/CustomHooksDemo';
import ContextDemo from './components/ContextDemo';
import PerformanceDemo from './components/PerformanceDemo';
import UseMemoDemo from './components/UseMemoDemo';
import UseReducerDemo from './components/UseReducerDemo';
import { demoHash, demoSectionId, demoTabs, parseDemoHash } from './demo-navigation';

import './App.css';

const AppContent: React.FC = () => {
  const [route, setRoute] = useState(() => parseDemoHash(window.location.hash));
  const activeTab = route.tab;
  const { theme } = useTheme();
  const tabBar = useRef<HTMLElement>(null);
  const mainContent = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateRoute = () => setRoute(parseDemoHash(window.location.hash));
    window.addEventListener('hashchange', updateRoute);
    return () => window.removeEventListener('hashchange', updateRoute);
  }, []);

  useEffect(() => {
    const navigation = tabBar.current;
    const main = mainContent.current;
    if (!navigation || !main) return;
    const updateOffset = () => {
      main.style.setProperty('--demo-nav-height', `${navigation.getBoundingClientRect().height}px`);
      const selected = document.activeElement;
      if (selected instanceof HTMLElement && selected.classList.contains('demo-linked-example')) {
        selected.scrollIntoView({ block: 'start', behavior: 'auto' });
      }
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(navigation);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.location.hash.startsWith('#/')) return;
    const id = demoSectionId(route);
    const target = id ? document.getElementById(id) : mainContent.current;
    if (!target) {
      console.error(`The linked demo section could not be found: ${id}`);
      return;
    }
    const frame = requestAnimationFrame(() => {
      const navigation = tabBar.current;
      if (navigation) {
        mainContent.current?.style.setProperty('--demo-nav-height', `${navigation.getBoundingClientRect().height}px`);
      }
      target.setAttribute('tabindex', '-1');
      target.classList.toggle('demo-linked-example', Boolean(id));
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
      target.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      target.classList.remove('demo-linked-example');
    };
  }, [route]);

  const renderTab = () => {
    switch (activeTab) {
      case 'components': return <ComponentsDemo />;
      case 'props': return <PropsDemo />;
      case 'state': return <StateDemo />;
      case 'events': return <EventsDemo />;
      case 'effects': return <EffectDemo />;
      case 'hooks': return <CustomHooksDemo />;
      case 'context': return <ContextDemo />;
      case 'performance': return <PerformanceDemo />;
      case 'usememo': return <UseMemoDemo />;
      case 'usereducer': return <UseReducerDemo />;
    }
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>⚛️ React + TypeScript — Class Demo</h1>
        <p className="subtitle">Interactive showcase of every concept from the Week 02 notes</p>
      </header>

      <nav className="tab-bar" ref={tabBar} aria-label="Demo topics">
        {demoTabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            aria-pressed={activeTab === tab.id}
            onClick={() => { window.location.hash = demoHash(tab.id); }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="main-content" ref={mainContent} tabIndex={-1}>
        {route.problem && <p className="demo-route-problem" role="status">{route.problem}</p>}
        {renderTab()}
      </main>

      <footer className="app-footer">
        Week 02 — React &amp; TypeScript | DePaul Web Development
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
