import { create } from "zustand";

interface UserStore {
    sessionId: string | null
    setSessionId: (sessionId: string) => void
    activeStorymap: {
        id: string
        url: string
    } | null
    setActiveStorymap: (storymap: { id: string, url: string }) => void
    shouldCreateStorymap: boolean
    triggerStorymapCreation: () => void
    resetStorymapTrigger: () => void
}

export const useUserStore = create<UserStore>((set) => ({
    sessionId: null,
    setSessionId: (sessionId: string) => set({ sessionId }),
    activeStorymap: null,
    setActiveStorymap: (storymap: { id: string, url: string }) => set({ activeStorymap: storymap }),
    shouldCreateStorymap: false,
    triggerStorymapCreation: () => set({ shouldCreateStorymap: true }),
    resetStorymapTrigger: () => set({ shouldCreateStorymap: false })
}))

