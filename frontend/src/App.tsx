import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}