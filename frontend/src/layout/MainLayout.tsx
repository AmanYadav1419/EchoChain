import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
// import {LeftSidebar}  from "./components/LeftSidebar.tsx";

const MainLayout = () => {
  const isMobile= false;
  return (
    <div className='h-screen bg-black text-white flex flex-col'>

      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>

        {/* left sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0: 10} maxSize={30}>
          {/* in later part we will create this */}
            <LeftSidebar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'  />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 :60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'  />

        {/* right sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          friends activity

        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;

// video start from 2:43:10

