import { createSession } from "@/api/create-session";
import { useUserStore } from "@/store/user-store";
import { DummyTemplate } from "@/tests/dummy-templates";
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

  const createSessionMutation = useMutation({
    mutationFn: createSession,
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


  const { mutate: callCreateSession } = createSessionMutation;

  useEffect(() => {
    if (!sessionId) {
      callCreateSession();
    } 
  }, [sessionId, callCreateSession]);



  if (!sessionId) {
    return <EmptySessionFallback />;
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      {storymapContent && (
        <RenderBlocks blocks={storymapContent.presentation_blocks} />
      )}
    </div>
  );
};
