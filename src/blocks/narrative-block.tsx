import type { NarrativeBlockType } from "@/types/storymap.types";
import { ImageBlock } from "./image-block";
import { MapBlock } from "./map-block";
import { TextBlock } from "./text-block";


interface NarrativeBlockProps {
    block: NarrativeBlockType;
}

export const NarrativeBlock = ({ block }: NarrativeBlockProps) => {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">{block.payload.narrative_title}</h2>
            <div className="w-full flex gap-4">
                {block.payload.narrative_blocks.map((nestedBlock) => (
                    <div key={nestedBlock.id} className="w-full">
                        {nestedBlock.type === "text" && <TextBlock block={nestedBlock} />}
                        {nestedBlock.type === "image" && <ImageBlock block={nestedBlock} />}
                        {nestedBlock.type === "map" && <MapBlock block={nestedBlock} />}
                    </div>
                ))}
            </div>
        </div>
    )
}