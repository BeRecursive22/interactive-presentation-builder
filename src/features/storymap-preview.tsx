import { createChatSession } from "@/api/create-chat-session";
import { Button } from "@/components/ui/button";
import { downloadMarkdown, storymapToMarkdown } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";
import { DummyTemplate } from "@/tests/dummy-templates";
import type { StorymapTemplate } from "@/types/storymap.types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import EmptySessionFallback from "./loading-workspace";
import { RenderBlocks } from "./render-blocks";

export const StorymapPreview = () => {
  const { 
    sessionId, 
    setSessionId, 
    storymapContent,
    setStorymapContent,
  } = useUserStore();

  const createChatSessionMutation = useMutation({
    mutationFn: createChatSession,
    onSuccess: (data) => {
      console.log("session data", data);
      setSessionId(data.data.session_id);
      setStorymapContent(DummyTemplate);  
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // const createStorymapMutation = useMutation({
  //   mutationFn: createStorymap,
  //   onSuccess: (data) => {
  //     console.log("storymap data", data);
  //   },
  //   onError: (error) => {
  //     console.error("Error creating storymap:", error);
  //   },
  // });


  const { mutate: callCreateSession } = createChatSessionMutation;

  const exportContentAsMarkdown = () => {
    if (!storymapContent) return;
    const markdown = storymapToMarkdown(storymapContent as StorymapTemplate);
    downloadMarkdown("storymap.md", markdown);
  };

  useEffect(() => {
    if (!sessionId) {
      callCreateSession();
    } 
  }, [sessionId, callCreateSession]);



  if (!sessionId) {
    return <EmptySessionFallback />;
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-12 bg-neutral-200 flex items-center justify-between p-2 px-6 shadow-md">
        <span className="text-sm font-medium">{storymapContent?.placestory_title || "Presentation Title here..."}</span>
        <Button onClick={() => exportContentAsMarkdown()} variant="outline">Export</Button>
      </div>
      <div className="w-full h-[calc(100%-48px)] overflow-y-auto">
        {storymapContent && (
          <RenderBlocks blocks={storymapContent.placestory_blocks} />
        )}
      </div>
    </div>
  );
};
