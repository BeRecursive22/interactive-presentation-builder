import type { StoryMapTemplate } from "@/types/template";



export const RestaurantBasicTemplate: StoryMapTemplate = {
    "template_name": "Restaurant Basic",
    "story_blocks": [
        // Cover Block
        {
            "block_id": "null",
            "block_type": "cover",
            "payload": {
                "image_prompt": "[FILL: Cover image description showing the location character and business opportunity]",
                "title": "[FILL: Main title including address and use case]",
                "summary": "[FILL: 2-3 sentence value proposition highlighting key statistics and opportunity]"
            }
        },
        
        // Narrative Block 1: Population & Customer Base
        {
            "block_id": "null",
            "block_type": "narrative",
            "payload": {
                "title": "Population & Customer Base",
                "image_prompt": "[FILL: Image showing population density, busy streets, community activity appropriate to the demographic data]",
                "content": "[FILL: 100-150 word narrative about total population, customer base size, immediate vs drive-to customers using specific data]"
            }
        },
        
        // Narrative Block 2: Income & Purchasing Power
        {
            "block_id": "null",
            "block_type": "narrative",
            "payload": {
                "title": "Income & Purchasing Power",
                "image_prompt": "[FILL: Image showing prosperity indicators, upscale shopping, well-maintained properties, signs of affluence]",
                "content": "[FILL: 100-150 word narrative about median income, affluent households, spending power using specific statistical data]"
            }
        },
        
        // Narrative Block 3: Economic Stability & Growth
        {
            "block_id": "null",
            "block_type": "narrative",
            "payload": {
                "title": "Economic Stability & Growth",
                "image_prompt": "[FILL: Image showing development, new construction, economic stability indicators, employment centers]",
                "content": "[FILL: 100-150 word narrative about employment rates, economic stability, growth trends using specific data]"
            }
        },
        
        // Narrative Block 4: Lifestyle & Target Audience
        {
            "block_id": "null",
            "block_type": "narrative",
            "payload": {
                "title": "Lifestyle & Target Audience",
                "image_prompt": "[FILL: Image showing target demographic activities, lifestyle behaviors, community engagement matching the data profile]",
                "content": "[FILL: 100-150 word narrative about customer demographics, lifestyle segments, target audience profile using specific data]"
            }
        },
        
        // Sidecar Block with 4 slides
        {
            "block_id": "null",
            "block_type": "sidecar",
            "payload": {
                "slides": [
                    {
                        "media": {
                            "type": "image",
                            "content": "[FILL: Infographic-style visualization showing population density patterns and concentration around the location]"
                        },
                        "narrative": {
                            "title": "Population Density Analysis",
                            "content": "[FILL: 60-80 words explaining what the population density map reveals about customer concentration and market opportunity]"
                        }
                    },
                    {
                        "media": {
                            "type": "image",
                            "content": "[FILL: Visual representation of income distribution, wealth indicators, and purchasing power across the trade area]"
                        },
                        "narrative": {
                            "title": "Income Distribution Insights",
                            "content": "[FILL: 60-80 words explaining income patterns, affluent zones, and spending power implications for the business]"
                        }
                    },
                    {
                        "media": {
                            "type": "image",
                            "content": "[FILL: Visualization of economic growth indicators, employment stability, and development trends in the area]"
                        },
                        "narrative": {
                            "title": "Economic Growth Indicators",
                            "content": "[FILL: 60-80 words explaining stability metrics, growth trends, and long-term economic prospects for the location]"
                        }
                    },
                    {
                        "media": {
                            "type": "image",
                            "content": "[FILL: Demographics visualization showing lifestyle segments, age distribution, and target customer characteristics]"
                        },
                        "narrative": {
                            "title": "Target Demographics Profile",
                            "content": "[FILL: 60-80 words explaining customer profile, lifestyle behaviors, and how they align with the business concept]"
                        }
                    }
                ]
            }
        },
        
        // Contact Button
        {
            "block_id": "null",
            "block_type": "button",
            "payload": {
                "text": "Contact Us",
                "url": "null"
            }
        }
    ]
}