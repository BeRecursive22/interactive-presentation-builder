import { BASE_URL } from "@/config";
import ky from "ky";

export const createSession = async () => {
  try {
    const response = await ky.post(`${BASE_URL}/v1/storymap/create-chat-session`);
    const data = await response.json<CreateSessionResponse>();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface CreateSessionResponse {
  data: {
      session_id: string;
      created_at: string;
      session_title: string;
  };
  status: string;
}

