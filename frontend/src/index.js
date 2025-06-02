import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Criar router com as flags de futuro para evitar avisos
const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: (
        <AuthProvider>
          <App />
        </AuthProvider>
      )
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
