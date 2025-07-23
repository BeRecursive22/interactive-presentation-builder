// in create-chat-stream.ts

import { BASE_URL } from "@/config";

interface StreamManagerOptions {
  sessionId: string;
  streamId: string;
  onStreamStart?: () => void;
  onStreaming?: (chunk: string) => void;
  onStreamStop?: () => void;
  onError?: (error: Event) => void;
}

export function createStreamManager(options: StreamManagerOptions) {
  const { sessionId, streamId, onStreamStart, onStreaming, onStreamStop, onError } = options;
  // The URL should not have sessionId in it, based on your Python code
  const eventSource = new EventSource(`${BASE_URL}/v1/storymap/chat/${sessionId}/stream/${streamId}`);

  eventSource.addEventListener('stream_start', (event) => {
    console.log("✅ Manager: Stream Start: ", event.data);
    onStreamStart?.();
  });

  eventSource.addEventListener('streaming', (event) => {
    // The raw data from the server is a JSON-encoded string (e.g., "\"**Hello**\"")
    // We need to parse it to get the actual content.
    try {
      const parsedData = JSON.parse(event.data);
      // Now, parsedData is the clean string: **Hello**
      onStreaming?.(parsedData);
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