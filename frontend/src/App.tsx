import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

export default function App() {
  return (
    <Routes>
      <Route
        path='/sso-callback'
        element={
          <AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
          />
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/admin" element={<AdminPage />} />

      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        {/* in future we add more pages like chat page, album page */}
        <Route path ='/chat' element={< ChatPage/>} />  {/*chat page route*/}
        <Route path ='/albums/:albumId' element={< AlbumPage />} />
      </Route>
    </Routes>
  );
}
