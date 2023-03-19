import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  // StrictMode prevents initializing list of genres with initially selected genre. It happen becuase StrictMode triggers rerender
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
