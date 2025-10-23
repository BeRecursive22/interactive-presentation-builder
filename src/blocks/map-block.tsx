import type { MapBlockType } from "@/types/storymap.types";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef } from "react";

interface MapBlockProps {
    block: MapBlockType;
}

export const MapBlock = ({ block }: MapBlockProps) => {
    console.log("map block", block);

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(mapRef.current) {



            const featureLayers = block.payload.layers.map((layerInfo) => {
                return new FeatureLayer({
                    portalItem: {
                        id: layerInfo.layer_id
                    }
                });
            });

            const graphicsLayer = new GraphicsLayer({ title: "Buffer Graphics" });



            const map = new Map({
                basemap: block.payload.base_style,
                layers: [...featureLayers, graphicsLayer]
            });

            const view = new MapView({
                container: mapRef.current,
                map: map,
                center: [block.payload.initial_map_state.longitude, block.payload.initial_map_state.latitude],
                zoom: block.payload.initial_map_state.zoom,
            });


            view.when(async () => {
                console.log("Map view loaded successfully");
                console.log("Number of layers:", map.layers.length);
                
                map.layers.forEach((layer, index) => {
                    console.log(`Layer ${index} loaded:`, layer.title);
                    layer.visible = true;
                });
            });

            return () => {
                if(view){
                    view.destroy();
                }
            }
        }
    },[block])

    return (
        <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div ref={mapRef} className="w-full h-full">
            </div>
        </div>
    )
}





