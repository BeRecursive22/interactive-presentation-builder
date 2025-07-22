// Base interfaces
export interface StoryMapTemplate {
  template_name: string;
  story_blocks: StoryBlock[];
}

export interface StoryBlock {
  block_id: string;
  block_type: BlockType;
  payload: BlockPayload;
}

export type BlockType = 
  | "cover"
  | "text" 
  | "image"
  | "map"
  | "swipe_map"
  | "interactive_map"
  | "narrative"
  | "sidecar"
  | "button";

// Union type for all possible payloads
export type BlockPayload = 
  | CoverPayload
  | TextPayload
  | ImagePayload
  | MapPayload
  | SwipeMapPayload
  | InteractiveMapPayload
  | NarrativePayload
  | SidecarPayload
  | ButtonPayload;

// Individual payload interfaces
export interface CoverPayload {
  image_prompt: string;
  title: string;
  subtitle?: string;
  summary?: string;
  byline?: string;
}

export interface TextPayload {
  title: string;
  content: string;
}

export interface ImagePayload {
  image_prompt: string;
  caption: string;
}

export interface MapPayload {
  title: string;
  description: string;
  map_focus: string;
}

export interface SwipeMapPayload {
  title: string;
  description: string;
  before_map: string;
  after_map: string;
  swipe_instruction: string;
}

export interface InteractiveMapPayload {
  title: string;
  description: string;
  map_focus: string;
  interaction_type: string;
}

export interface NarrativePayload {
  title: string;
  image_prompt: string;
  content: string;
}

export interface SidecarPayload {
  slides: SidecarSlide[];
}

export interface SidecarSlide {
  media: {
    type: "image" | "video" | "map";
    content: string;
  };
  narrative: {
    title: string;
    content: string;
  };
}

export interface ButtonPayload {
  text: string;
  url: string;
}
