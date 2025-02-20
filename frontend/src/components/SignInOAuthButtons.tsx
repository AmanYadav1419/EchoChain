import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

// Defining a functional component for OAuth sign-in buttons
const SignInOAuthButtons = () => {
    // Extracting `signIn` and `isLoaded` from the `useSignIn` hook
    const {signIn,isLoaded} = useSignIn()
    
    // If authentication is not yet loaded, return `null` (prevents errors)
    if(!isLoaded){
        return null
    }

    // Function to handle Google Sign-In using OAuth
    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    };

    return (
        // Renders a button that triggers `signInWithGoogle` when clicked
        <Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white board-zinc-200 h-11'>
             Continue with Google
        </Button>
    );
};
// Exporting the component for use in other parts of the application
export default SignInOAuthButtons;