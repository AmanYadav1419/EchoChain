// Importing the GripVertical icon from lucide-react for use in the resizable handle
import { GripVertical } from "lucide-react"

// Importing all exports from react-resizable-panels under the alias ResizablePrimitive
import * as ResizablePrimitive from "react-resizable-panels"

// Importing a utility function for conditional class names
import { cn } from "@/lib/utils"

// Creating a ResizablePanelGroup component that wraps the ResizablePrimitive.PanelGroup component
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      // Applying default styles for the flex container
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

// Creating a direct reference to the ResizablePrimitive.Panel component
const ResizablePanel = ResizablePrimitive.Panel

// Creating a ResizableHandle component that wraps the ResizablePrimitive.PanelResizeHandle component
const ResizableHandle = ({
  // A boolean flag to determine if a handle should be displayed
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      // Defining default styles for the resizable handle
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      // Displaying the handle if withHandle is true
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

// Exporting the components for use in other parts of the application
export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
