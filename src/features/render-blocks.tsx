import { CoverBlock } from "@/blocks/cover-block";
import { ImageBlock } from "@/blocks/image-block";
import { MapBlock } from "@/blocks/map-block";
import { NarrativeBlock } from "@/blocks/narrative-block";
import { SidecarBlock } from "@/blocks/sidecar-block";
import { TextBlock } from "@/blocks/text-block";
import type { StorymapBlocks } from "@/types/storymap.types";

interface RenderBlocksProps {
    blocks: StorymapBlocks[];
}

export const RenderBlocks = ({ blocks }: RenderBlocksProps) => {
    const renderBlock = (block: StorymapBlocks) => {
        switch (block.type) {
            case 'image':
                return <ImageBlock key={block.id} block={block} />
            case 'text':
                return <TextBlock key={block.id} block={block} />
            case 'map':
                return <MapBlock key={block.id} block={block} />
            case 'narrative':
                return <NarrativeBlock key={block.id} block={block} />
            case 'cover':
                return <CoverBlock key={block.id} block={block} />
            case 'sidecar':
                return <SidecarBlock key={block.id} block={block} />
            default:
                return null;
        }
    }
    
    return (
        <div className="w-full min-h-full flex flex-col gap-6 p-6">
            {blocks.map((block) => renderBlock(block))}
        </div>
    )
}
