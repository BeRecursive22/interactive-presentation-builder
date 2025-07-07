import { API_URL } from "@/config";
import ky from "ky";

export const createSession = async () => {
  try {
    const response = await ky.post(`${API_URL}/api/v1/create-session`);
    const data = await response.json<CreateSessionResponse>();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

interface CreateSessionResponse {
  session_id: string;
  created_at: string;
  status: string;
}

