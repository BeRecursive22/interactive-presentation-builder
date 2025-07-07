import { createSession } from "@/api/create-session";
import { createStorymap } from "@/api/create-storymap";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink, Loader2, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import EmptySessionFallback from "./loading-workspace";

export const Preview = () => {

  const { sessionId, setSessionId, activeStorymap, setActiveStorymap } = useUserStore()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      console.log("session data", data)
      setSessionId(data.session_id)
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const createStorymapMutation = useMutation({
    mutationFn: createStorymap,
    onSuccess: (data) => {
      console.log("storymap data", data)
      setActiveStorymap({
        id: data.storymap_id,
        url: `${data.storymap_url}`
      })
    }
  })

  const { mutate: callCreateSession } = createSessionMutation;
  const { mutate: callCreateStorymap } = createStorymapMutation;

  const reloadIframe = () => {
    if(activeStorymap?.url) {
        const iframe = iframeRef.current
        if(iframe) {
            iframe.src = activeStorymap.url
        }
    }
  }

  const openInNewTab = () => {
    if(activeStorymap?.url) {
        window.open(activeStorymap.url, '_blank')
    }
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  const handleIframeError = () => {
    setIframeError(true)
  }

  useEffect(() => {
    if (!sessionId) {
      callCreateSession();
    } else if (sessionId && !activeStorymap?.url) {
      callCreateStorymap(sessionId);
    }
  }, [sessionId, callCreateSession, callCreateStorymap, activeStorymap?.url]);  
  
  if(!sessionId) {
    return <EmptySessionFallback />
  }

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-4 h-11 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Browser dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
          </div>
          
          {/* URL display */}
          <div className="flex-1 min-w-0 bg-white border border-border rounded px-3 py-1.5">
            <span className="text-xs font-mono text-muted-foreground truncate block">
              {activeStorymap?.url || 'Creating storymap...'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center ml-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={reloadIframe}
            disabled={!activeStorymap?.url || createStorymapMutation.isPending}
            className="h-8 w-8 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Reload"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewTab}
            disabled={!activeStorymap?.url || createStorymapMutation.isPending}
            className="h-8 w-8 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
            title="Open in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
          
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 relative bg-background overflow-hidden">
        {/* Loading overlay */}
        {(createStorymapMutation.isPending || (!iframeLoaded && activeStorymap?.url && !iframeError)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {createStorymapMutation.isPending ? 'Generating StoryMap...' : 'Loading preview...'}
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
                <p className="text-sm font-medium text-foreground">Failed to load StoryMap</p>
                <p className="text-xs text-muted-foreground mt-1">
                  The preview couldn't be loaded. This might be a temporary issue.
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
        {!activeStorymap?.url && !createStorymapMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4 text-center max-w-sm">
              <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
                <span className="text-muted-foreground text-3xl">🗺️</span>
              </div>
              <div>
                <p className="text-base font-medium text-foreground">No StoryMap to preview</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Start a conversation in the chat to generate your first interactive StoryMap
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
              iframeLoaded ? 'opacity-100' : 'opacity-0' // TODO: add iframeLoaded state
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



