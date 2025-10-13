import "@arcgis/core/assets/esri/themes/dark/main.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";
import { Chat } from "./features/chat";
import { StorymapPreview } from "./features/storymap-preview";


export default function App () {
  return (
    <div className="h-screen w-screen bg-white">
    <ResizablePanelGroup direction="horizontal" className="h-screen w-screen">
      <ResizablePanel defaultSize={70} className="w-full h-full bg-gray-100 overflow-y-auto">
        <StorymapPreview />
      </ResizablePanel>
      <ResizableHandle className="h-full bg-border/30" />
      <ResizablePanel defaultSize={30} className="w-full h-full">
        <Chat />
      </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}