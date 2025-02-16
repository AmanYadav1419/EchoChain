import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = () => {
  const isMobile= false;   {/*Set to false can be used for mobile */}




  return (
    <div className='h-screen bg-black text-white flex flex-col'>

      {/* Container for resizable panels */}
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
        <AudioPlayer />

        {/* left sidebar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0: 10} maxSize={30}>
          {/* in later part we will create this */}
            <LeftSidebar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'  />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 :60}>
          <Outlet /> {/* Displays the content of the current route */}
        </ResizablePanel>

        {/* Another divider */}
        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'  />

        {/* right sidebar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
          <FriendsActivity/>

        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;



