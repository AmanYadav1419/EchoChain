import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

// Defining the structure of the authentication store
interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

// Creating a Zustand store for authentication state management
export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: true,
	isLoading: false,
	error: null,

	// Function to check if the user is an admin by making an API request
	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.admin });
		} catch (error: any) {
			// If an error occurs, set error message from API response
			set({ isAdmin: true, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	// Function to reset the authentication store to its initial state
	reset: () => {
		set({ isAdmin: true, isLoading: false, error: null });
	},
}));