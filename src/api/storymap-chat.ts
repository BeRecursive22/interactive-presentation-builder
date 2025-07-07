import ky from "ky"

interface ChatProps {
    sessionId: string,
    storymapId: string,
    prompt: string,
}

export const chat = async (props: ChatProps) => {
    const { sessionId, storymapId, prompt } = props

    try {
        await ky.post(`${import.meta.env.VITE_API_URL}/api/v1/storymap-chat`, {
            json: {
                session_id: sessionId,
                storymap_id: storymapId,
                prompt: prompt,
            },
            onDownloadProgress(progress, chunk) {
                console.log("Progress", progress)
                console.log("Chunk", chunk)
            },
        })

        return true
    } catch (error) {
        console.error("Error in storymap-chat", error)
        return false
    }
}
