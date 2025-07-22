import type { StoryMapTemplate } from "@/types/template";


export const HealthcareAnalysisTemplate: StoryMapTemplate = {
    "template_name": "Healthcare Analysis",
    "story_blocks": [
      {
        "block_id": "null",
        "block_type": "cover",
        "payload": {
          "image_prompt": "[FILL: Professional cover image showing the study area or relevant context - aerial view, community scene, or thematic imagery]",
          "title": "[FILL: Main title with location and analysis purpose]",
          "subtitle": "[FILL: Descriptive subtitle explaining the analytical objective]",
          "byline": "[FILL: Author/organization and date information]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Introduction",
          "content": "[FILL: Problem statement, context, and why this analysis matters. Include relevant statistics and background information that sets up the need for analysis.]"
        }
      },
      {
        "block_id": "null",
        "block_type": "image",
        "payload": {
          "image_prompt": "[FILL: Conceptual diagram or infographic that illustrates key concepts - similar to the social determinants of health diagram]",
          "caption": "[FILL: Explanatory caption for the conceptual image]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Research Question",
          "content": "[FILL: Clear, specific research question that drives the entire analysis]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Data Sources",
          "content": "[FILL: Comprehensive list of data sources with proper citations and links where applicable]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Analysis Criteria",
          "content": "[FILL: Detailed explanation of the criteria used in the analysis, with justification for each criterion and threshold values]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Criterion 1: [FILL: First analysis criterion]",
          "description": "[FILL: Explanation of what this map shows and why it matters for the analysis]",
          "map_focus": "[FILL: What geographic data/layer this map displays]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map", 
        "payload": {
          "title": "Criterion 2: [FILL: Second analysis criterion]",
          "description": "[FILL: Explanation of what this map shows and its analytical importance]",
          "map_focus": "[FILL: Geographic data/layer for this criterion]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Criterion 3: [FILL: Third analysis criterion]", 
          "description": "[FILL: Explanation of this criterion and its role in the analysis]",
          "map_focus": "[FILL: Geographic data/layer for this criterion]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Criterion 4: [FILL: Fourth analysis criterion]",
          "description": "[FILL: Explanation of this criterion and analytical significance]",
          "map_focus": "[FILL: Geographic data/layer for this criterion]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Criterion 5: [FILL: Fifth analysis criterion]",
          "description": "[FILL: Explanation of this criterion and why it's important]",
          "map_focus": "[FILL: Geographic data/layer for this criterion]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Criterion 6: [FILL: Sixth analysis criterion]",
          "description": "[FILL: Final criterion explanation and analytical importance]",
          "map_focus": "[FILL: Geographic data/layer for this criterion]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Methodology",
          "content": "[FILL: Detailed explanation of the analytical methods, tools used, and step-by-step process for combining criteria]"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Areas Meeting 25% of Criteria (1 out of 4)",
          "description": "[FILL: Explanation of areas that meet minimal criteria threshold]",
          "map_focus": "Areas meeting 1 out of 4 demographic criteria"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Areas Meeting 50% of Criteria (2 out of 4)",
          "description": "[FILL: Explanation of areas meeting half the criteria]",
          "map_focus": "Areas meeting 2 out of 4 demographic criteria"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Areas Meeting 75% of Criteria (3 out of 4)",
          "description": "[FILL: Explanation of areas meeting most criteria]",
          "map_focus": "Areas meeting 3 out of 4 demographic criteria"
        }
      },
      {
        "block_id": "null",
        "block_type": "map",
        "payload": {
          "title": "Areas Meeting 100% of Criteria (4 out of 4)",
          "description": "[FILL: Explanation of areas meeting all demographic criteria and why these advance to next phase]",
          "map_focus": "Areas meeting all 4 demographic criteria"
        }
      },
      {
        "block_id": "null",
        "block_type": "swipe_map",
        "payload": {
          "title": "Applying Built Environment Criteria",
          "description": "[FILL: Explanation of how built environment criteria filter the demographically suitable areas]",
          "before_map": "Areas meeting all demographic criteria",
          "after_map": "Areas meeting demographic + accessibility criteria",
          "swipe_instruction": "Swipe to see which areas also meet transportation accessibility requirements"
        }
      },
      {
        "block_id": "null",
        "block_type": "swipe_map",
        "payload": {
          "title": "Final Site Selection",
          "description": "[FILL: Explanation of final filtering step and how optimal locations are identified]",
          "before_map": "Areas meeting accessibility criteria",
          "after_map": "Final suitable locations",
          "swipe_instruction": "Swipe to see the final suitable locations after all criteria applied"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Results and Discussion",
          "content": "[FILL: Overview of findings and transition to detailed location analysis]"
        }
      },
      {
        "block_id": "null",
        "block_type": "interactive_map",
        "payload": {
          "title": "Recommended Locations",
          "description": "[FILL: Interactive map showing final recommended locations with clickable points]",
          "map_focus": "Final recommended locations with detailed popups",
          "interaction_type": "clickable_points"
        }
      },
      {
        "block_id": "null",
        "block_type": "image",
        "payload": {
          "image_prompt": "[FILL: Representative photo of Location 1 area - street view, landmark, or characteristic scene]",
          "caption": "Location 1: [FILL: Area name and key characteristics]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Location 1 Analysis",
          "content": "[FILL: Detailed breakdown of Location 1 with specific statistics for each criterion, distances to key infrastructure, and why this location meets all requirements]"
        }
      },
      {
        "block_id": "null",
        "block_type": "image",
        "payload": {
          "image_prompt": "[FILL: Representative photo of Location 2 area - street view, landmark, or characteristic scene]",
          "caption": "Location 2: [FILL: Area name and key characteristics]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Location 2 Analysis", 
          "content": "[FILL: Detailed breakdown of Location 2 with specific statistics for each criterion, distances to key infrastructure, and analytical assessment]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "Conclusion and Limitations",
          "content": "[FILL: Summary of findings, acknowledgment of analytical limitations, suggestions for future research, and implications for decision-makers]"
        }
      },
      {
        "block_id": "null",
        "block_type": "text",
        "payload": {
          "title": "References",
          "content": "[FILL: Complete academic references for all data sources, literature, and methodological sources cited throughout the analysis]"
        }
      },
      {
        "block_id": "null",
        "block_type": "button",
        "payload": {
          "text": "Contact Research Team",
          "url": "null"
        }
      }
    ]
  }