import { HealthcareAnalysisTemplate } from "./healthcare-analysis";
import { RestaurantBasicTemplate } from "./restaurant-basic";



export const ALL_TEMPLATES = [
    {
        id: "restaurant-basic",
        name: "Restaurant Basic",
        template: RestaurantBasicTemplate,
    },
    {
        id: "healthcare-analysis",
        name: "Healthcare Analysis",
        template: HealthcareAnalysisTemplate,
    }
]