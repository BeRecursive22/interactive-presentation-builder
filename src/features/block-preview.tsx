import type { StoryBlock } from "@/types/template";
import { ImageIcon, MapPinned } from "lucide-react";

export const BlockPreview = ({ block }: { block: StoryBlock }) => {
  const renderBlockPreview = () => {
    switch (block.block_type) {
      case 'cover':
        return (
          <div className="w-full bg-gradient-to-br from-chart-1 to-chart-2 rounded-sm p-6 text-white text-center flex flex-col justify-center gap-0">
            <div className="text-md text-white font-normal">Title</div>
            <div className="text-xs text-white font-light">Description</div>
            <span className="text-xs text-white font-light">Byline</span> 
            <span className="text-xs text-white font-light">Date</span>
          </div>
        );
      
      case 'narrative':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <ImageIcon className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Image</span>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <ImageIcon className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Image</span>
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <ImageIcon className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Image</span>
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <MapPinned className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Map</span>
            </div>
          </div>
        );
      
      case 'swipe_map':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <MapPinned className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Swipe Map</span>
            </div>
          </div>
        );
      
      case 'interactive_map':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <MapPinned className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Interactive Map</span>
            </div>
          </div>
        );
      
      case 'sidecar':
        return (
          <div className="w-full bg-transparent flex items-center justify-between h-20">
            <span className="h-full w-full bg-ring/40 flex items-center justify-center rounded-l-sm px-2 py-1 text-xs text-graphite font-light text-center">Text content</span>
            <div className="h-full w-full bg-ring/90 flex flex-col items-center justify-center rounded-r-sm px-2 py-1 text-xs text-graphite font-light text-center gap-1">
            <MapPinned className="w-6 h-6 text-charcoal-gray" />
            <span className="text-xs text-graphite font-light text-center">Sidecar</span>
            </div>
          </div>
        );
      
      case 'button':
        return (
          <div className="w-full bg-charcoal-gray flex items-center justify-center rounded-sm p-2">
            <span className="text-xs text-white font-light text-center">Button</span>
          </div>
        );
      
      default:
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 h-16 flex items-center justify-center">
            <div className="w-16 h-1.5 bg-gray-300 rounded"></div>
          </div>
        );
    }
  };

  return <div className="mb-1">{renderBlockPreview()}</div>;
};