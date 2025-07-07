import { API_URL } from "@/config"
import ky from "ky"



export const createStorymap = async (sessionId: string) => {
    try {
        const response = await ky.post(`${API_URL}/api/v1/create-storymap`, {
            json: {
                session_id: sessionId,
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
    storymap_url: string
    storymap_id: string
    message: string
}