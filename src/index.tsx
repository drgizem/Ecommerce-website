import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './components/Context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <ContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextProvider>

  </React.StrictMode>
);

