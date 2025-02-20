import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.tsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Ensure the publishable key is defined, otherwise throw an error
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Mount the React application to the root element in the HTML file
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Helps detect potential issues in development mode */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    {/* Provides authentication context using Clerk */}
      <AuthProvider>
        {/* Wraps the app with custom authentication logic */}
        <BrowserRouter>
        {/* Enables client-side routing */}
          <App />
          {/* The main application component */}
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
);
