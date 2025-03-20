import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider.tsx';
import ContextProvider from './context/index.tsx';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Ensure the publishable key is defined, otherwise throw an error
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Function to get cookies from the browser
const getCookies = () => {
  return document.cookie; // This retrieves all cookies as a string
};

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
          <ContextProvider cookies={getCookies()}>
            {/* Pass cookies to the ContextProvider */}
            <App />
            {/* The main application component */}
          </ContextProvider>
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
);