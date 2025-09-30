import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
/*
  UNDERSTANDING GENERICS: <T,>
  
  The <T,> syntax is called "TypeScript Generics"
  
  Think of T as a "placeholder" for a type that will be specified later.
  It's like saying "this function works with SOME type, but I don't know what type yet"
  
  When someone uses this hook, they specify what T should be:
  - useFetch<string>(url) - T becomes string
  - useFetch<User>(url) - T becomes User interface
  - useFetch<{name: string}>(url) - T becomes object with name property
  
  The comma after T (<T,>) is TypeScript syntax to tell the compiler
  this is a generic, not JSX syntax (which also uses < >)
*/
const useFetch = <T,>(url: string) => {
  /*
    STATE EXPLANATIONS:
    
    - data: T | null
      This means data can be either:
      * Type T (whatever the user specified)
      * null (if no data loaded yet)
    
    - loading: boolean
      Simple true/false for loading state
    
    - error: string | null  
      Either an error message (string) or null (no error)
  */
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function runs whenever the URL changes
    const fetchData = async () => {
      try {
        setLoading(true);   // Show loading state
        setError(null);     // Clear any previous errors
        
        // Make the HTTP request
        const response = await fetch(url);
        
        // Check if the request was successful (status 200-299)
        if (!response.ok) {
          // If not successful, throw an error with the status code
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Convert response to JSON
        const result = await response.json();
        
        // Save the data - TypeScript knows 'result' should match type T
        setData(result);
        
      } catch (err) {
        // Handle any errors that occurred during fetching
        
        // Check if err is actually an Error object (has .message property)
        // If so, use its message; otherwise use a generic message
        setError(err instanceof Error ? err.message : 'An error occurred');
        
      } finally {
        // This runs whether the try or catch block executed
        // Always stop the loading state
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, [url]); // This effect runs whenever 'url' changes

  // Return an object with the three state values
  // Other components can destructure this: { data, loading, error }
  return { data, loading, error };
};

// Custom hook for local storage
/*
  GENERICS EXPLANATION FOR useLocalStorage:
  
  This hook can store ANY type of data in localStorage:
  - useLocalStorage<string>('username', '') - stores strings
  - useLocalStorage<number>('count', 0) - stores numbers  
  - useLocalStorage<User>('user', defaultUser) - stores User objects
  - useLocalStorage<{theme: string}>('settings', {theme: 'light'}) - stores objects
  
  The T type ensures that:
  1. initialValue must match type T
  2. The returned value is type T
  3. setValue accepts type T
  4. Everything stays type-safe!
*/
const useLocalStorage = <T,>(key: string, initialValue: T) => {
  /*
    LAZY INITIAL STATE:
    
    useState(() => { ... }) is called "lazy initial state"
    The function only runs ONCE when the component first mounts
    This is important because localStorage.getItem() is expensive
    We don't want to call it on every render!
  */
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Try to get the item from localStorage
      const item = window.localStorage.getItem(key);
      
      // If item exists, parse it as JSON and return it
      // If item doesn't exist (null), return the initialValue
      return item ? JSON.parse(item) : initialValue;
      
    } catch (error) {
      // If localStorage is not available or JSON.parse fails
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /*
    FLEXIBLE setValue FUNCTION:
    
    value: T | ((val: T) => T)
    This means setValue can accept either:
    1. A direct value: setValue('new theme')
    2. A function: setValue(prev => prev === 'light' ? 'dark' : 'light')
    
    This matches how React's setState works!
  */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Check if 'value' is a function
      // If it is, call it with the current stored value
      // If it's not, just use the value directly
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Update React state
      setStoredValue(valueToStore);
      
      // Update localStorage (convert to JSON string)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
    } catch (error) {
      // Handle errors (localStorage full, JSON.stringify failed, etc.)
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  /*
    RETURN AS CONST:
    
    [storedValue, setValue] as const
    
    This tells TypeScript that we're returning a specific tuple:
    [T, (value: T | ((val: T) => T)) => void]
    
    Without 'as const', TypeScript thinks we're returning:
    (T | ((value: T | ((val: T) => T)) => void))[]
    
    'as const' makes the types more precise and matches useState's return type
  */
  return [storedValue, setValue] as const;
};

// Custom hook for window dimensions
/*
  NO GENERICS HERE:
  
  This hook doesn't need generics because it always returns the same shape:
  { width: number, height: number }
  
  We know exactly what type it returns, so no need for placeholder types
*/
const useWindowDimensions = () => {
  // Initialize state with current window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,   // Current window width in pixels
    height: window.innerHeight, // Current window height in pixels
  });

  useEffect(() => {
    // Function that updates state when window is resized
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener for resize events
    window.addEventListener('resize', handleResize);
    
    // Cleanup function: remove event listener when component unmounts
    // This prevents memory leaks!
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array = only run on mount/unmount

  // Return the current window dimensions
  return windowDimensions;
};

// Component using custom hooks
const CustomHookExamples: React.FC = () => {
  /*
    USING GENERIC HOOKS:
    
    useFetch<{name: string; value: number}>('/api/example')
    
    Here we specify that T = {name: string; value: number}
    This means:
    - data will be {name: string; value: number} | null
    - TypeScript will ensure we only access .name and .value on data
    - We get autocomplete and error checking!
  */
  const { data, loading, error } = useFetch<{name: string; value: number}>('/api/example');
  
  /*
    USING useLocalStorage WITH OBJECT TYPE:
    
    The type is inferred from the initialValue:
    {theme: 'light', language: 'en'} 
    
    So T becomes {theme: string; language: string}
    TypeScript knows preferences has these exact properties
  */
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'en'
  });
  
  /*
    NO GENERICS NEEDED:
    
    useWindowDimensions() always returns {width: number; height: number}
    So we can destructure width and height directly
  */
  const { width, height } = useWindowDimensions();

  // Early returns for loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="custom-hook-examples">
      <h2>Custom Hook Examples</h2>

      <div className="section">
        <h3>Fetched Data</h3>
        {/* 
          JSON.stringify(data, null, 2) converts object to formatted JSON string
          - data: the object to stringify
          - null: replacer function (we don't need one)
          - 2: number of spaces for indentation (makes it readable)
        */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="section">
        <h3>Local Storage Preferences</h3>
        {/* Access properties directly - TypeScript knows they exist! */}
        <p>Theme: {preferences.theme}</p>
        <p>Language: {preferences.language}</p>
        
        <button 
          onClick={() => setPreferences(prev => ({
            ...prev,  // Copy existing preferences (spread operator)
            // Toggle theme between 'light' and 'dark'
            theme: prev.theme === 'light' ? 'dark' : 'light'
          }))}
        >
          Toggle Theme
        </button>
      </div>

      <div className="section">
        <h3>Window Dimensions</h3>
        {/* Display current window size */}
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
      </div>
    </div>
  );
};

export default CustomHookExamples;