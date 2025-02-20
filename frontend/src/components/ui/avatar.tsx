 // Import all React functions and utilities  
import * as React from "react"

 // Import Radix UI's Avatar component
import * as AvatarPrimitive from "@radix-ui/react-avatar"

 // Import a utility function for conditional class names  
import { cn } from "@/lib/utils"

// Creating the Avatar component using React.forwardRef for proper ref forwarding  
const Avatar = React.forwardRef<
 // Extracting the element type from Radix Avatar.Root  
  React.ElementRef<typeof AvatarPrimitive.Root>,

   // Extracting component props while omitting ref  
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
  // Forward the ref to the Radix Avatar.Root component
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
// Assigning Radix's display name for better debugging
Avatar.displayName = AvatarPrimitive.Root.displayName

// Creating the AvatarImage component for displaying images inside Avatar  
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
// Assigning Radix's display name
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// Creating the AvatarFallback component for fallback content when no image is available  
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>, // Extracting the element type from Radix Avatar.Fallback
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> // Extracting component props while omitting ref  
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
// Assigning Radix's display name
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
