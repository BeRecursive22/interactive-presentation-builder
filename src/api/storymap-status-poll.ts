import { API_URL } from "@/config";
import ky from "ky";



export const storymapStatusPoll = async (storyId: string) => {
    
    try {
        const response = await ky.get(`${API_URL}/v1/storymap/poll-story-map/${storyId}`, {
            timeout: 30000
        });
        const data = await response.json<StorymapStatusPollResponse>();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


interface StorymapStatusPollResponse {
    status: string;
    data: {
        story_map: {
            id: number;
            item_id: string | null;
            status: string;
            user_query: string;
            usecase: string;
            events: {
                event: {
                    text: string;
                    success: boolean;
                };
                status: string;
            }[];
            item_data: {
                url: string;
            };
            created_at: string;
            session: string;
        };
    };
}
