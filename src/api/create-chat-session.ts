import { BASE_URL } from "@/config";
import ky from "ky";

export const createChatSession = async () => {
  try {
    const response = await ky.post(
      `${BASE_URL}/v1/storymap/create-chat-session`
    );
    const data = await response.json<CreateChatSessionResponse>();
    console.log("Chat session Data is: ", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface CreateChatSessionResponse {
  data: {
      session_id: string;
      created_at: string;
      session_title: string;
  };
  status: "success" | "error";
}
