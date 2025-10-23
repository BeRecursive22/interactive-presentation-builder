import type { MapBlockType } from "@/types/storymap.types";
import type { Geometry } from "@arcgis/core/geometry";
import * as geodesicBufferOperator from "@arcgis/core/geometry/operators/geodesicBufferOperator.js";
import Point from "@arcgis/core/geometry/Point.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import Graphic from "@arcgis/core/Graphic";
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

            let buffer2Geometry: Geometry | null = null;

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

            const createBuffer = async () => {
                // Load the operator if not already loaded
                if (!geodesicBufferOperator.isLoaded()) {
                    await geodesicBufferOperator.load();
                }
            
                const centerPoint = new Point({
                    x: block.payload.initial_map_state.longitude,
                    y: block.payload.initial_map_state.latitude,
                    spatialReference: SpatialReference.WGS84
                });
            
                // Use the new operator to create buffers
                const buffer = geodesicBufferOperator.execute(centerPoint, 1, {
                    unit: "miles"
                });

                const buffer2 = geodesicBufferOperator.execute(centerPoint, 2, {
                    unit: "miles"
                });
                buffer2Geometry = buffer2 as Geometry;
                const bufferGraphic = new Graphic({
                    geometry: buffer,
                    symbol: {
                        type: "simple-fill",
                        color: [227, 139, 79, 0.5],
                        outline: {
                            color: [255, 255, 255, 255],
                            width: 2
                        },
                    },
                });
            
                const bufferGraphic2 = new Graphic({
                    geometry: buffer2,
                    symbol: {
                        type: "simple-fill",
                        color: [227, 139, 79, 0.5],
                        outline: {
                            color: [255, 255, 255, 255],
                            width: 2
                        },
                    },
                });
            
                const centerPointGraphic = new Graphic({
                    geometry: centerPoint,
                    symbol: {
                        type: "simple-marker",
                        style: "circle",
                        color: [227, 139, 79, 1],
                        size: 12,
                        outline: {
                            color: [255, 255, 255, 1],
                            width: 2
                        }
                    }
                });
            
                const label1Mile = new Graphic({
                    geometry: new Point({
                        x: block.payload.initial_map_state.longitude + 0.01,
                        y: block.payload.initial_map_state.latitude + 0.005,
                        spatialReference: SpatialReference.WGS84
                    }),
                    symbol: {
                        type: "text",
                        text: "1 mile",
                        color: [255, 255, 255, 1],
                        font: {
                            size: 14,
                            weight: "bold"
                        },
                        haloColor: [0, 0, 0, 0.8],
                        haloSize: 2
                    }
                });
                
                const label2Mile = new Graphic({
                    geometry: new Point({
                        x: block.payload.initial_map_state.longitude + 0.02,
                        y: block.payload.initial_map_state.latitude + 0.01,
                        spatialReference: SpatialReference.WGS84
                    }),
                    symbol: {
                        type: "text",
                        text: "2 miles",
                        color: [255, 255, 255, 1],
                        font: {
                            size: 14,
                            weight: "bold"
                        },
                        haloColor: [0, 0, 0, 0.8],
                        haloSize: 2
                    }
                });
            
                graphicsLayer.add(label1Mile);
                graphicsLayer.add(label2Mile);
                graphicsLayer.add(bufferGraphic);
                graphicsLayer.add(bufferGraphic2);
                graphicsLayer.add(centerPointGraphic);
            };




            view.when(async () => {
                console.log("Map view loaded successfully");
                console.log("Number of layers:", map.layers.length);
                
                map.layers.forEach((layer, index) => {
                    console.log(`Layer ${index} loaded:`, layer.title);
                    layer.visible = true;
                });

                // await createBuffer();

                // view.goTo({
                //     target: buffer2Geometry,
                //     // zoom: 14,
                //     duration: 1000
                // })
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





