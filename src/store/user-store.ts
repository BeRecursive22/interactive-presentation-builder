import { create } from "zustand";


interface UserStore {
    sessionId: string | null
    setSessionId: (sessionId: string) => void
    activeStorymap: {
        id: string
        url: string
    } | null
    setActiveStorymap: (storymap: { id: string, url: string }) => void
}

export const useUserStore = create<UserStore>((set) => ({
    sessionId: null,
    setSessionId: (sessionId: string) => set({ sessionId }),
    activeStorymap: null,
    setActiveStorymap: (storymap: { id: string, url: string }) => set({ activeStorymap: storymap })
}))

