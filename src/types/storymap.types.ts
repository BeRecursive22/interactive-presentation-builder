


export interface ImagePayload {
        source: {
            url: string;
            alt: string;
        },
        caption: string;
}

export interface ImageBlockType {
    id: string;
    type: "image";
    payload: ImagePayload;
}

export interface TextPayload {
    content: string; // markdown format
}

export interface TextBlockType {
    id: string;
    type: "text";
    payload: TextPayload;
}

export interface Layer {
    layer_id: string;
    visible: boolean;
}

export interface MapPayload {
    initial_map_state: {
        latitude: number;
        longitude: number;
        zoom: number;
    },
    base_style: string;
    layers: Layer[];
}

export interface MapBlockType {
    id: string;
    type: "map";
    payload: MapPayload;
}

export interface CoverPayload {
    cover_blocks: StorymapBlocks[];
}

export interface CoverBlockType {
    id: string;
    type: "cover";
    payload: CoverPayload;
}

export interface NarrativePayload {
    narrative_title: string;
    narrative_blocks: StorymapBlocks[];
}

export interface NarrativeBlockType {
    id: string;
    type: "narrative";
    payload: NarrativePayload;
}

export type CommandType = "TOGGLE_LAYER" | "ZOOM_IN" | "ZOOM_OUT" | "PAN_TO" | "PAN_BY" | "ZOOM_BY";

export interface ToggleLayerCommandPayload {
    layer_id: string;
    visible: boolean;
}

export type CommandPayload = ToggleLayerCommandPayload;

export interface MapCommandType {
    type: CommandType;
    payload: CommandPayload;
}

export interface SidecarCardType {
    id: string;
    type: "text";
    payload: TextPayload;
    map_command: MapCommandType;
}

export interface SidecarBlockType {
    id: string;
    type: "sidecar";
    payload: SidecarPayload;
}

export interface SidecarPayload {
    map_config: MapPayload;
    cards: SidecarCardType[];
}

export type StorymapBlocks = CoverBlockType | TextBlockType | ImageBlockType | MapBlockType | NarrativeBlockType | SidecarBlockType;


export interface StorymapTemplate {
    placestory_title: string;
    placestory_blocks: StorymapBlocks[];
}