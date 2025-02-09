import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup>
        {/* left sidebar */}
        <ResizablePanel>
          {/* in later part we will create this */}
          left sidebar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;

// video start from 2:43:10