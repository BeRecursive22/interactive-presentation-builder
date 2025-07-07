import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { Chat } from "./features/chat";
import { Preview } from "./features/preview";




export default function App () {
  return (
    <div className="h-screen w-screen bg-white">
    <ResizablePanelGroup direction="horizontal" className="h-screen w-screen">
      <ResizablePanel defaultSize={70} className="w-full h-full">
        <Preview />
      </ResizablePanel>
      <ResizableHandle className="h-full" />
      <ResizablePanel defaultSize={30} className="w-full h-full">
        <Chat />
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}