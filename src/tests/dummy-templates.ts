import type { StorymapTemplate } from "@/types/storymap.types";

const dummyImageUrl = "https://res.cloudinary.com/truva-production/image/upload/t_large_image/t_invisible_watermark/f_auto/oykm1v47ofwvz737xz27"

export const DummyTemplate: StorymapTemplate = {
  placestory_title: "A Premier Culinary Destination: 555 Madison Avenue",
  placestory_blocks: [
    {
      id: "cover_block_01",
      type: "cover" as const,
      payload: {
        cover_blocks: [
          {
            id: "text_block_01",
            type: "text" as const,
            payload: {
              content: "# The Corporate Epicenter\n\nWith over 20 million square feet of Class A office space in the surrounding blocks, 555 Madison Avenue is perfectly positioned to capture a lucrative corporate lunch and after-work clientele. This massive daytime population of high-earning professionals provides a steady stream of revenue from business lunches, corporate events, and evening entertainment.",
            },
          },
          {
            id: "image_block_01",
            type: "image" as const,
            payload: {
              source: {
                url: dummyImageUrl,
                alt: "Professionals networking in an upscale restaurant bar.",
              },
              caption: "An experience that awaits.",
            },
          },
        ],
      },
    },
    {
      id: "text_block_01",
      type: "text" as const,
      payload: {
        content: "# The Corporate Epicenter\n\nWith over 20 million square feet of Class A office space in the surrounding blocks, 555 Madison Avenue is perfectly positioned to capture a lucrative corporate lunch and after-work clientele. This massive daytime population of high-earning professionals provides a steady stream of revenue from business lunches, corporate events, and evening entertainment.",
      },
    },
    {
      id: "narrative_block_02",
      type: "narrative" as const,
      payload: {
        narrative_title: "The Ideal Customer Profile",
        narrative_blocks: [
          {
            id: "text_block_02",
            type: "text" as const,
            payload: {
              content: "# The Ideal Customer Profile\n\nThe dominant lifestyle profile is 'Urban Sophisticates'—high-earning professionals in finance, law, and tech. They are discerning consumers who prioritize quality, ambiance, and unique experiences. This is a clientele that actively seeks out and becomes loyal to premium dining brands.",
            },
          },
          {
            id: "image_block_02",
            type: "image" as const,
            payload: {
              source: {
                url: dummyImageUrl,
                alt: "Professionals networking in an upscale restaurant bar.",
              },
              caption: "An experience that awaits.",
            },
          }
        ],
      },
    },
    {
      id: "image_block_01",
      type: "image" as const,
      payload: {
        source: {
          url: dummyImageUrl,
          alt: "Professionals networking in an upscale restaurant bar.",
        },
        caption: "An experience that awaits.",
      },
    },  
    {
        id: "map_block_01",
        type: "map" as const,
        payload: {
          initial_map_state: {
            latitude: 40.7622,
            longitude: -73.9718,
            zoom: 15,
          },
          base_style: "dark-gray",
          layers: [
            {
              layer_id: "9db159f136f3411f86c4c5ca04c21f12",
              visible: false,
            },
          ],
        },
    },
    {
      id: "narrative_block_03",
      type: "narrative" as const,
      payload: {
        narrative_title: "The Ideal Customer Profile",
        narrative_blocks: [
          {
            id: "text_block_03",
            type: "text" as const,
            payload: {
              content: "# The Ideal Customer Profile\n\nThe dominant lifestyle profile is 'Urban Sophisticates'—high-earning professionals in finance, law, and tech. They are discerning consumers who prioritize quality, ambiance, and unique experiences. This is a clientele that actively seeks out and becomes loyal to premium dining brands.",
            },
          },
          {
            id: "image_block_03",
            type: "image" as const,
            payload: {
              source: {
                url: dummyImageUrl,
                alt: "Professionals networking in an upscale restaurant bar.",
              },
              caption: "An experience that awaits.",
            },
          },
        ],
      },
    },
    {
        id: "narrative_block_04",
        type: "narrative" as const,
        payload: {
          narrative_title: "The Ideal Customer Profile",
          narrative_blocks: [
            {
              id: "text_block_04",
              type: "text" as const,
              payload: {
                content: "# The Ideal Customer Profile\n\nThe dominant lifestyle profile is 'Urban Sophisticates'—high-earning professionals in finance, law, and tech. They are discerning consumers who prioritize quality, ambiance, and unique experiences. This is a clientele that actively seeks out and becomes loyal to premium dining brands.",
              },
            },
           {
            id: "map_block_04",
            type: "map" as const,
            payload: {
              initial_map_state: {
                latitude: 40.7622,
                longitude: -73.9718,
                zoom: 15,
              },
              base_style: "dark-gray",
              layers: [
                {
                  layer_id: "9db159f136f3411f86c4c5ca04c21f12",
                  visible: false,
                },
              ],
            },
           }
          ],
        },
      },
      {
        id: "sidecar_block_01",
        type: "sidecar" as const,
        payload: {
          map_config: {
            initial_map_state: {
              latitude: 40.7622,
              longitude: -73.9718,
              zoom: 15,
            },
            base_style: "dark-gray",
            layers: [
              {
                layer_id: "9db159f136f3411f86c4c5ca04c21f12",
                visible: false,
              },
              {
                layer_id: "e3aea56afa6646118092ff913005bfef",
                visible: false,
              },
              {
                layer_id: "290f141d0d0b456a9c024e6576482989",
                visible: false,
              },
              {
                layer_id: "8ca45d692e334b28a64d6922f9844687",
                visible: false,
              }
            ],
          },
          cards: [
            {
              id: "sidecar_card_01",
              type: "text" as const,
              payload: {
                content: "# Welcome to 555 Madison Avenue\n\nDiscover the demographic insights that make this location a premier opportunity for restaurant development. Each story reveals data-driven insights about the surrounding community.",
              },
              map_command: {
                type: "TOGGLE_LAYER",
                payload: {
                  layer_id: "9db159f136f3411f86c4c5ca04c21f12",
                  visible: false,
                },
              },
            },
            {
              id: "sidecar_card_02",
              type: "text" as const,
              payload: {
                content: "# Population Density\n\nThe area surrounding 555 Madison Avenue shows exceptional population density, with over 50,000 residents within a 1-mile radius. This high-density urban environment provides a consistent customer base for dining establishments throughout the day and evening hours.",
              },
              map_command: {
                type: "TOGGLE_LAYER",
                payload: {
                  layer_id: "9db159f136f3411f86c4c5ca04c21f12",
                  visible: true,
                },
              },
            },
            {
              id: "sidecar_card_03",
              type: "text" as const,
              payload: {
                content: "# Household Income Analysis\n\nThe median household income in this trade area exceeds $150,000, placing residents in the top 10% nationally. This affluent demographic has significant disposable income and regularly dines out at upscale establishments.",
              },
              map_command: {
                type: "TOGGLE_LAYER",
                payload: {
                  layer_id: "e3aea56afa6646118092ff913005bfef",
                  visible: true,
                },
              },
            },
            {
              id: "sidecar_card_04",
              type: "text" as const,
              payload: {
                content: "# Household Growth Trends\n\nThe neighborhood is experiencing strong household growth, with a projected 15% increase over the next 5 years. This growth, combined with ongoing commercial development, signals a thriving market with long-term stability.",
              },
              map_command: {
                type: "TOGGLE_LAYER",
                payload: {
                  layer_id: "290f141d0d0b456a9c024e6576482989",
                  visible: true,
                },
              },
            },
            {
              id: "sidecar_card_05",
              type: "text" as const,
              payload: {
                content: "# Tapestry Segmentation\n\nThe dominant lifestyle segment is 'Urban Sophisticates'—highly educated professionals in finance, law, and technology. They prioritize quality dining experiences, frequently entertain clients and colleagues, and are brand-loyal customers who become vocal advocates for exceptional restaurants.",
              },
              map_command: {
                type: "TOGGLE_LAYER",
                payload: {
                  layer_id: "8ca45d692e334b28a64d6922f9844687",
                  visible: true,
                },
              },
            },
          ],
        },
      },
  ],
};