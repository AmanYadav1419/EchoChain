import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route 
        path='/sso-callback' 
        element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
      />  
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
    </Routes>
  );
}