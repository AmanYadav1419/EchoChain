
import { Route, Routes } from "react-router-dom";

// Importing different page components for navigation
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
	return (
		<>
		{/* Defines all the application routes */}
			<Routes>
				{/* Route for handling Single Sign-On (SSO) callback using Clerk */}
				<Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
				{/* Route for handling authentication callback */}
				<Route path='/auth-callback' element={<AuthCallbackPage />} />
				{/* Admin dashboard route */}
				<Route path='/admin' element={<AdminPage />} />

				{/* Routes wrapped inside MainLayout (common layout for multiple pages) */}
				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/chat' element={<ChatPage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			{/* Toast notifications for real-time alerts/messages */}
			<Toaster />
		</>
	);
}

export default App;
