import { BASE_URL } from "@/config";
import ky from "ky";

interface ChatProps {
    sessionId: string;
    prompt: string;
}

export const createChatStream = async (props: ChatProps) => {
    const { sessionId, prompt } = props;

    try {
        const result = await ky.post(`${BASE_URL}/v1/storymap/chat/${sessionId}`,
            {
                json: {
                    user_message: prompt
                }
            }
        ).json<ChatStreamResponse>()
        console.log("Result:", result);
        return result
    } catch (error) {
        console.error("Error creating storymap stream", error);
        throw new Error("Cannot create stream")
    }
};


interface ChatStreamResponse {
    success: "success" | "error",
    data: {
        stream_id: string
    }
}
