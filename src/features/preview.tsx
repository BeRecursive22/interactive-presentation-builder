import { createSession } from "@/api/create-session";
import { createStorymap } from "@/api/create-storymap";
import { storymapStatusPoll } from "@/api/storymap-status-poll";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmptySessionFallback from "./loading-workspace";

export const Preview = () => {
  const { 
    sessionId, 
    setSessionId, 
    activeStorymap, 
    setActiveStorymap, 
    shouldCreateStorymap,
    resetStorymapTrigger 
  } = useUserStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("Ready to create storymap");

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      console.log("session data", data);
      setSessionId(data.data.session.session_id);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const createStorymapMutation = useMutation({
    mutationFn: createStorymap,
    onSuccess: (data) => {
      console.log("storymap data", data);
      const storyMapId = data.data.story_map.id.toString();
      setCurrentStoryId(storyMapId);
      
      setIsPolling(true);
      setCurrentStatus("Initializing storymap...");
      startPolling(storyMapId);
    },
    onError: (error) => {
      console.error("Error creating storymap:", error);
      setIsPolling(false);
      setCurrentStatus("Failed to create storymap");
    },
  });

  const pollStorymapMutation = useMutation({
    mutationFn: storymapStatusPoll,
    onSuccess: (data) => {
      console.log("polling data", data);
      
      const storyMapStatus = data.data.story_map.status;
      const latestEvent = data.data.story_map.events[data.data.story_map.events.length - 1];
      
      if (latestEvent?.event?.text) {
        setCurrentStatus(latestEvent.event.text);
      } else {
        switch (storyMapStatus) {
          case "INITIATED":
            setCurrentStatus("Preparing storymap...");
            break;
          case "GENERATING_STORYMAP":
            setCurrentStatus("Generating storymap...");
            break;
          case "COMPLETED":
            setCurrentStatus("Finalizing storymap...");
            break;
          case "FAILED":
            setCurrentStatus("Storymap creation failed");
            break;
          default:
            setCurrentStatus(`Status: ${storyMapStatus}`);
        }
      }
      
      if (data.data.story_map.status === "COMPLETED" && data.data.story_map.item_data.url) {
        setActiveStorymap({
          id: data.data.story_map.id.toString(),
          url: data.data.story_map.item_data.url
        });
        setIsPolling(false);
        setCurrentStoryId(null);
        setCurrentStatus("Loading preview...");
      } else if (data.data.story_map.status === "FAILED") {
        console.error("Storymap creation failed");
        setIsPolling(false);
        setCurrentStoryId(null);
        setCurrentStatus("Storymap creation failed");
      } else {
        setTimeout(() => {
          if (currentStoryId) {
            pollStorymapMutation.mutate(currentStoryId);
          }
        }, 5000); 
      }
    },
    onError: (error) => {
      console.error("Error polling storymap:", error);
      setCurrentStatus("Connection issue, retrying...");
      // Retry polling after a delay
      setTimeout(() => {
        if (currentStoryId && isPolling) {
          pollStorymapMutation.mutate(currentStoryId);
        }
      }, 5000); 
    },
  });

  const startPolling = (storyId: string) => {
    pollStorymapMutation.mutate(storyId);
  };

  const { mutate: callCreateSession } = createSessionMutation;
  const { mutate: callCreateStorymap } = createStorymapMutation;

  const reloadIframe = () => {
    if (activeStorymap?.url) {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.src = activeStorymap.url;
      }
    }
  };

  const openInNewTab = () => {
    if (activeStorymap?.url) {
      window.open(activeStorymap.url, "_blank");
    }
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  useEffect(() => {
    if (!sessionId) {
      callCreateSession();
    } else if(sessionId && !activeStorymap?.url) {
      callCreateStorymap(sessionId);
    }
  }, [sessionId, callCreateSession, callCreateStorymap, activeStorymap?.url]);

  useEffect(() => {
    if (sessionId && shouldCreateStorymap && !activeStorymap?.url && !isPolling) {
      setCurrentStatus("Creating storymap...");
      callCreateStorymap(sessionId);
      resetStorymapTrigger();
    }
  }, [sessionId, shouldCreateStorymap, callCreateStorymap, activeStorymap?.url, isPolling, resetStorymapTrigger]);

  useEffect(() => {
    return () => {
      setIsPolling(false);
      setCurrentStoryId(null);
    };
  }, []);

  if (!sessionId) {
    return <EmptySessionFallback />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-accent/50 overflow-hidden shadow-sm">
      <div className="w-full flex items-center gap-2 pl-4 pr-3 h-11 bg-muted/30 border-b border-border/30">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>

        {/* URL display */}
        <div className="bg-white flex flex-1 flex-row items-center justify-between border border-border/30 rounded-md px-2 py-1">
          <span
            className={`text-xs text-accent-foreground ${
              activeStorymap?.url && "font-sans"
            }`}
          >
            {activeStorymap?.url || "Ready to create storymap"}
          </span>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={reloadIframe}
              disabled={
                !activeStorymap?.url || createStorymapMutation.isPending || isPolling
              }
              className="p-0 w-6 h-6 hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Reload"
            >
              <RotateCcw className="h-4 w-4 text-accent-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={openInNewTab}
              disabled={
                !activeStorymap?.url || createStorymapMutation.isPending || isPolling
              }
              className="p-0 w-6 h-6 hover:bg-muted text-muted-foreground hover:text-foreground"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4 text-accent-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 relative overflow-hidden px-4 py-2">
        {/* Loading overlay */}
        {(createStorymapMutation.isPending ||
          isPolling ||
          (!iframeLoaded && activeStorymap?.url && !iframeError)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {currentStatus}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This may take a few moments
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <span className="text-destructive text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Failed to load StoryMap
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  The preview couldn't be loaded. This might be a temporary
                  issue.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={reloadIframe}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!activeStorymap?.url && !createStorymapMutation.isPending && !isPolling && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-muted-foreground text-3xl">🗺️</span>
              </div>
              <div>
                <p className="text-base font-medium text-foreground">
                  Ready to create your StoryMap
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click on one of the example prompts or enter your own query in the chat to get started
                </p>
              </div>
            </div>
          </div>
        )}

        {/* The actual iframe */}
        {activeStorymap?.url && (
          <iframe
            ref={iframeRef}
            src={activeStorymap.url}
            className={`w-full h-full border-0 bg-white transition-opacity duration-300 ${
              iframeLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="StoryMap Preview"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
            loading="eager"
            allow="geolocation; camera; microphone"
          />
        )}
      </div>
    </div>
  );
};
