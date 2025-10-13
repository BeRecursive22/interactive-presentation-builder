import type { SidecarBlockType, SidecarCardType } from "@/types/storymap.types";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { TextBlock } from "./text-block";

interface SidecarBlockProps {
    block: SidecarBlockType;
}

export const SidecarBlock = ({ block }: SidecarBlockProps) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapViewRef = useRef<MapView | null>(null);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const [mapReady, setMapReady] = useState(false);
    const hasTriggeredInitial = useRef(false);

    console.log("🎬 SidecarBlock rendering", { mapRef: mapRef.current, mapViewRef: mapViewRef.current });

    const onInView = (index: number) => {
        console.log("👁️ callback called for index", index);
        setActiveCardIndex(index);
    };

    // Initialize map
    useEffect(() => {
        console.log("🚀 useEffect triggered", { 
            hasMapRef: !!mapRef.current, 
            hasMapViewRef: !!mapViewRef.current 
        });

        if (!mapRef.current) {
            console.log("❌ mapRef.current is null, waiting...");
            return;
        }

        if (mapViewRef.current) {
            console.log("⏭️ Map already initialized, skipping");
            return;
        }

        console.log("✨ Initializing map with configuration:", block.payload.map_config);

        try {
            const featureLayers = block.payload.map_config.layers.map((layerInfo) => {
                console.log("📍 Creating layer:", layerInfo.layer_id);
                return new FeatureLayer({
                    portalItem: {
                        id: layerInfo.layer_id
                    },
                    visible: layerInfo.visible
                });
            });

            const map = new Map({
                basemap: block.payload.map_config.base_style,
                layers: featureLayers
            });

            const view = new MapView({
                container: mapRef.current,
                map: map,
                center: [
                    block.payload.map_config.initial_map_state.longitude,
                    block.payload.map_config.initial_map_state.latitude
                ],
                zoom: block.payload.map_config.initial_map_state.zoom,
            });

            view.when(() => {
                console.log("✅ Sidecar map loaded successfully");
                console.log("📊 Number of layers:", map.layers.length);
                
                map.layers.forEach((layer, index) => {
                    console.log(`📌 Sidecar Layer ${index}:`, {
                        title: layer.title,
                        id: layer.id,
                        portalItemId: (layer as any).portalItem?.id
                    });
                });
                
                setMapReady(true);
            });

            mapViewRef.current = view;

            return () => {
                console.log("🧹 Cleaning up map");
                if (view) {
                    view.destroy();
                }
                mapViewRef.current = null;
            };
        } catch (error) {
            console.error("❌ Error initializing map:", error);
        }
    }, [block.payload.map_config]);

    useEffect(() => {
        const view = mapViewRef.current;
        const card = block.payload.cards[activeCardIndex];

        console.log("Active card", card);
        
        // Guard clause: Don't do anything if the map or card isn't ready yet.
        if (!view || !view.map || !card) {
            return;
        }

        console.log("Executing command", card.map_command);

        const command = card.map_command;
        if (command && command.type === "TOGGLE_LAYER") {
            const visibleId = command.payload.layer_id;
            
            view.map.layers.forEach((layer: any) => {
                const layerConfig = block.payload.map_config.layers.find(
                    l => l.layer_id === layer.portalItem?.id
                );
                
                if (layerConfig) {
                    layer.visible = layerConfig.layer_id === visibleId;
                }
            });
        }
    }, [activeCardIndex, block.payload.cards, block.payload.map_config.layers]); // Dependency array is key!


    return (
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            <div ref={mapRef} className="absolute inset-0 w-full h-full bg-gray-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent pointer-events-none" />
            
            <div className="absolute left-0 top-0 bottom-0 w-full md:w-1/2 lg:w-2/5 overflow-y-auto p-6 space-y-4">
                {block.payload.cards.map((card, index) => (
                    <ObservedCard 
                        key={card.id}
                        card={card} 
                        index={index} 
                        onInView={onInView}
                        isActive={activeCardIndex === index}
                    />
                ))}
            </div>

            <div className="absolute bottom-4 left-6 flex gap-2">
                {block.payload.cards.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onInView(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            activeCardIndex === index
                                ? 'bg-neutral-500 w-6'
                                : 'bg-neutral-400 hover:bg-neutral-500'
                        }`}
                        aria-label={`Go to card ${index + 1}`}
                    />
                ))}
            </div>

            {!mapReady && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded text-sm">
                    Map Loading...
                </div>
            )}
        </div>
    );
};

interface ObservedCardProps {
    card: SidecarCardType;
    index: number;
    onInView: (index: number) => void;
    isActive: boolean;
}

const ObservedCard = ({ card, index, onInView, isActive }: ObservedCardProps) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView) {
            console.log("👀 Card in view:", index);
            onInView(index);
        }
    }, [inView, index, onInView]);

    return (
        <div
            ref={ref}
            className={`bg-white/95 backdrop-blur-sm rounded-md p-6 shadow-md transition-all duration-300 ${
                isActive
                    ? 'ring-2 ring-neutral-500 scale-[1.02]'
                    : 'opacity-70'
            }`}
        >
            <SidecarCard card={card} />
        </div>
    );
};

interface SidecarCardProps {
    card: SidecarCardType;
}

export const SidecarCard = ({ card }: SidecarCardProps) => {
    const renderCard = () => {
        switch (card.type) {
            case "text":
                return <TextBlock block={card} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full">
            {renderCard()}
        </div>
    );
};