// Handles authentication UI (sign-in, user profile button)
import { SignedOut, UserButton } from "@clerk/clerk-react";
// Handles authentication UI (sign-in, user profile button)
import { LayoutDashboardIcon } from "lucide-react";
// Enables navigation between different routes/pages
import { Link } from "react-router-dom";
// Component for third-party OAuth sign-in options
import SignInOAuthButtons from "./SignInOAuthButtons";
// Custom authentication state management
import { useAuthStore } from "@/stores/useAuthStore";
// Utility function for conditional class names
import { cn } from "@/lib/utils";
// Predefined button styling variants
import { buttonVariants } from "./ui/button";

import ConnectButton from "./connect-button/ConnectButton";

// Define the Topbar component
const Topbar = () => {
	// Retrieve admin status from authentication store
	const { isAdmin } = useAuthStore(); 
	// Log admin status for debugging purposes
	console.log({ isAdmin });

    return (
        <div 
            className="flex items-centre justify-between p-4 sticky top-0 bg-zinc-900/75
            background-blur-md z-10
        "
        >
            <div className="flex gap-2 items-centre">
                <img src="/Echo.png"className='size-8' alt='EchoChain logo' /> {/* echochain logo on home page*/}
                EchoChain
            </div>
            <div className='flex items-center gap-4'>
				{/* Show Admin Dashboard button only if user is an admin */}
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<ConnectButton />

				<UserButton />
			</div>
		</div>
	);
};
export default Topbar;