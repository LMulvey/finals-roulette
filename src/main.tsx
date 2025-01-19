import App from './App';
import { StrictMode } from 'react';
// eslint-disable-next-line import/no-unassigned-import
import './index.css';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
