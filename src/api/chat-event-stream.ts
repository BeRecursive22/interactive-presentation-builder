import { BASE_URL } from "@/config";
import type { JobStatusEventType } from "@/types/events.types";
import type { StorymapTemplate } from "@/types/storymap.types";

interface StreamManagerOptions {
  sessionId: string;
  streamId: string;
  onStreamStart?: () => void;
  onStreaming?: (chunk: string) => void;
  onStreamStop?: () => void;
  onError?: (error: Event) => void;
  onStorymapMessage?: (message: StorymapTemplate) => void;
  onJobStatus: (status: JobStatusEventType) => void;
}

export function createStreamManager(options: StreamManagerOptions) {
  const { sessionId, streamId, onStreamStart, onStreaming, onStreamStop, onError, onStorymapMessage, onJobStatus } = options;
  const eventSource = new EventSource(`${BASE_URL}/v1/storymap/chat/${sessionId}/stream/${streamId}`);

  eventSource.addEventListener('stream_start', (event) => {
    console.log("✅ Manager: Stream Start: ", event.data);
    onStreamStart?.();
  });

  eventSource.addEventListener('streaming', (event) => {
    try {
      const parsedData = JSON.parse(event.data);
      console.log("Parsed Data: ", parsedData);
      if(parsedData.type === "presentation_content"){
        onStorymapMessage?.(parsedData.data);
      } else if(parsedData.type === "status" || parsedData.type === "complete"){
        console.log("Status: ", parsedData);
        onJobStatus?.(parsedData);
      } else {
        onStreaming?.(parsedData);
        console.log("Streaming: ", parsedData);
      }
    } catch (e) {
      console.error("❌ Manager: Failed to parse stream chunk:", e);
    }
  });

  eventSource.addEventListener('stream_stop', (event) => {
    console.log("🛑 Manager: Stream Stop: ", event.data);
    onStreamStop?.();
    eventSource.close();
  });

  eventSource.onerror = (error) => {
    console.error("❌ Manager: Error");
    onError?.(error);
    eventSource.close();
  };

  return {
    close: () => {
      console.log("🔌 Manager: Connection manually closed.");
      eventSource.close();
    }
  };
}


