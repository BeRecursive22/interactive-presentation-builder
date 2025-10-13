import type { StorymapTemplate } from "@/types/storymap.types";
import { create } from "zustand";

interface JobStatusType {
  id: string;
  message: string;
  isInProgress: boolean;
  streamId: string;
}

interface UserStore {
  sessionId: string | null;
  setSessionId: (sessionId: string) => void;
  streamId: string | null;
  setStreamId: (streamId: string | null) => void;
  storymapContent: StorymapTemplate | null;
  setStorymapContent: (storymapContent: StorymapTemplate | null) => void;
  jobStatus: JobStatusType[];
  setJobStatus: (status: JobStatusType[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  sessionId: null,
  setSessionId: (sessionId: string) => set({ sessionId }),
  streamId: null,
  setStreamId: (streamId) => set({ streamId: streamId }),
  storymapContent: null,
  setStorymapContent: (storymapContent) => set({ storymapContent }),
  jobStatus: [],
  setJobStatus: (status) => set({ jobStatus: status }),
}));
