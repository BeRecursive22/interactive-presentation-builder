import type { StoryMapTemplate } from "@/types/template";
import { create } from "zustand";

interface UserStore {
    sessionId: string | null
    setSessionId: (sessionId: string) => void
    streamId: string | null;
    setStreamId: (streamId: string | null) => void,
    activeStorymap: {
        id: string
        url: string
    } | null
    setActiveStorymap: (storymap: { id: string, url: string }) => void
    shouldCreateStorymap: boolean
    triggerStorymapCreation: () => void
    resetStorymapTrigger: () => void,
    selectedTemplate: {
        id: string
        template: StoryMapTemplate
    }
    setSelectedTemplate: (template: { id: string, template: StoryMapTemplate }) => void
}

export const useUserStore = create<UserStore>((set) => ({
    sessionId: null,
    setSessionId: (sessionId: string) => set({ sessionId }),
    streamId: null,
    setStreamId: (streamId) => set({streamId: streamId}),
    activeStorymap: null,
    setActiveStorymap: (storymap: { id: string, url: string }) => set({ activeStorymap: storymap }),
    shouldCreateStorymap: false,
    triggerStorymapCreation: () => set({ shouldCreateStorymap: true }),
    resetStorymapTrigger: () => set({ shouldCreateStorymap: false }),
    selectedTemplate: {
        id: "restaurant-basic",
        template: {} as StoryMapTemplate
    },
    setSelectedTemplate: (template: { id: string, template: StoryMapTemplate }) => set({ selectedTemplate: template })
}))

