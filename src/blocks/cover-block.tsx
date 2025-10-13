import { LOCAL_API_URL } from "@/config";
import type { CoverBlockType } from "@/types/storymap.types";
import { TextBlock } from "./text-block";
interface CoverBlockProps {
  block: CoverBlockType;
}


const dummyTextBlock = {
  id: "text_block_01",
  type: "text" as const,
  payload: {
    content: "# This is a dummy text block in markdown format"
  },
}

const dummyImageBlock = {
  id: "image_block_01",
  type: "image" as const,
  payload: {
    source: {
      url: "https://static.vecteezy.com/system/resources/previews/053/733/179/non_2x/every-detail-of-a-sleek-modern-car-captured-in-close-up-photo.jpg",
      alt: "A dummy image",
    },
    caption: "A dummy image caption",
  },
}


export const CoverBlock = ({ block }: CoverBlockProps) => {
  // Find the image and text blocks from the cover_blocks array
  const imageBlock = block.payload.cover_blocks.find(block => block.type === "image") || dummyImageBlock;
  const textBlock = block.payload.cover_blocks.find(block => block.type === "text") || dummyTextBlock;

  console.log("Cover block", block);
  console.log("Image block", imageBlock);
  console.log("Text block", textBlock);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      <img
        src={imageBlock.payload.source.url.startsWith("/static") ? LOCAL_API_URL + imageBlock.payload.source.url : imageBlock.payload.source.url}
        alt={imageBlock.payload.source.alt} 
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8">
        <div className="text-white [&_*]:text-white [&_h1]:text-4xl [&_h1]:md:text-5xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:leading-tight">
          <TextBlock block={textBlock} />
        </div>
      </div>
    </div>
  );
};
