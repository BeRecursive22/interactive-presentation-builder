import { LOCAL_API_URL } from "@/config";
import type { ImageBlockType } from "@/types/storymap.types";


interface ImageBlockProps {
    block: ImageBlockType;
}


export const ImageBlock = ({ block }: ImageBlockProps) => {

    const imageUrl = block.payload.source.url.startsWith("/static") ? LOCAL_API_URL + block.payload.source.url : block.payload.source.url;

    return (
        <div className="w-full h-full bg-transparent flex flex-col items-center justify-between gap-2">
            <img src={imageUrl} alt={block.payload.source.alt} className="w-full h-full text-charcoal-gray" />
            <span className="h-10 w-full bg-transparent text-left py-1 text-xs text-graphite font-light">{block.payload.caption}</span>
        </div>
    )
}