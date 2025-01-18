import viteLogo from 'public/vite.svg';
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="w-screen flex flex-col items-center justify-center">
      <div>
        <a
          href="https://vite.dev"
          rel="noreferrer"
          target="_blank"
        >
          <img
            alt="Vite logo"
            className="logo"
            src={viteLogo}
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => setCount((currentCount) => currentCount + 1)}
          type="button"
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  );
};

export default App;
