import { BASE_URL } from "@/config"
import ky from "ky"



export const createStorymap = async (sessionId: string) => {
    try {
        const response = await ky.post(`${BASE_URL}/v1/storymap/create-story-map`, {
            json: {
                session_id: sessionId,
                // usecase: "storymap",
                // user_query: "Create a storymap"
            },
            timeout: 30000
        })
        const data = await response.json<CreateStorymapResponse>()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}   


interface CreateStorymapResponse {
    status: string;
    data: {
        session: {
            session_id: string;
            session_title: string;
            created_at: string;
        };
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
            item_data: Record<string, unknown>;
            created_at: string;
            session: string;
        };
    };
}
