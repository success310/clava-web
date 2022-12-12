import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import register from './registerServiceWorker';
import reportWebVitals from './reportWebVitals';

const rootNode = document.getElementById('app');

if (rootNode) {
  createRoot(rootNode).render(<App />);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
register();
reportWebVitals();
