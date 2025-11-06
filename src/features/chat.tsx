import { createStreamManager } from "@/api/chat-event-stream";
import { createChatStream } from "@/api/create-chat-stream";
import { LocationPin } from "@/assets/location-pin-svg";
import { Button } from "@/components/ui/button";
import { JobStatusIndicator } from "@/components/ui/job-status-indicator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/user-store";
import type { JobStatusEventType } from "@/types/events.types";
import type { StorymapTemplate } from "@/types/storymap.types";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

const queries = [
  "Build me an interactive presentation for 1 S Main St, Bel Air, MD 21014 for use as a Restaurant",
  "Build me an interactive presentation for 123 Market Street, San Francisco, CA 94105 for use as a Retail",
  "Build me an interactive presentation for 555 Madison Avenue, New York, NY 10022 for use as an Office",
];

export const Chat = () => {
  const [messages, setMessages] = useState<
    Array<{ type: "user" | "assistant"; content: string }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const { sessionId, setStreamId, streamId, setStorymapContent, setIsProcessingMessage, isProcessingMessage } =
    useUserStore();

  const { mutate: chatMutation } = useMutation({
    mutationFn: async (variables: { prompt: string }) => {
      const { prompt } = variables;
      return await createChatStream({ sessionId: sessionId!, prompt });
    },
    onSuccess: (result) => {
      console.log("Result:", result);
      const chatMessageId = result.data.chat_message_id;
      console.log("Chat message ID:", chatMessageId);
      setStreamId(chatMessageId);
    },
    onError: (error) => {
      console.error("Chat mutation error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: "assistant",
          content: "Sorry, I had trouble connecting. Please try again.",
        },
      ]);
    },
  });

  const handleSendMessage = (content: string) => {

    console.log("Is processing initial state: ", isProcessingMessage);
    console.log("Is processing message: ", isProcessingMessage);

    setAutoScroll(true);
    setIsUserScrolling(false);
    setIsProcessingMessage(true);
    setMessages((prev) => [
      ...prev,
      { type: "user", content },
      { type: "assistant", content: "" },
    ]);

    chatMutation({
      prompt: content,
    });

    if (content === inputValue) {
      setInputValue("");
    }
  };

  useEffect(() => {
    if (streamId) {
      createStreamManager({
        sessionId: sessionId!,
        streamId: streamId!,
        onStreamStart() {
          setStreamId(streamId!);
          const setJobStatus = useUserStore.getState().setJobStatus;
          setJobStatus([]);
        },
        onStreamStop: () => {
          console.log("Stream stopped");
          setStreamId(null);
          const setJobStatus = useUserStore.getState().setJobStatus;
          setJobStatus([]);
          setIsProcessingMessage(false);
        },
        onStreaming: (chunk) => {
          console.log("Chunk:", chunk);
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];

            // If the last message is from assistant, append the chunk
            if (lastMessage && lastMessage.type === "assistant") {
              lastMessage.content += chunk;
            } else {
              // If no assistant message exists, create one
              newMessages.push({ type: "assistant", content: chunk });
            }

            return newMessages;
          });
        },
        onStorymapMessage: (message: StorymapTemplate) => {
          console.log("Storymap message: ", message);
          setStorymapContent(message);
        },
        onJobStatus: (status: JobStatusEventType) => {
          console.log("Job status: ", status);
          // firstly we need to stop the already in progress job status and then keep the current one in progress.
          const jobStatus = useUserStore.getState().jobStatus;
          const setJobStatus = useUserStore.getState().setJobStatus;
          const newJobStatus = jobStatus.map((job) => ({
            ...job,
            isInProgress: false,
          }));
          const currentJobStatus = {
            id: uuidv4(),
            message: status.message,
            isInProgress: true,
            streamId: streamId!,
          };
          setJobStatus([...newJobStatus, currentJobStatus]);
          console.log("New job status: ", newJobStatus);
        },
      });
    }
  }, [sessionId, streamId, setStreamId, setStorymapContent, setIsProcessingMessage]);

  return (
    <div className="w-full h-full flex flex-col bg-pearl-gray/20 relative z-0">
      <ChatHeader />
      <ChatMessages
        messages={messages}
        onSendMessage={handleSendMessage}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        isUserScrolling={isUserScrolling}
        setIsUserScrolling={setIsUserScrolling}
      />
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

const ChatHeader = () => {
  // const { selectedTemplate } = useUserStore();

  return (
    <div className="w-full h-11 flex items-center justify-between gap-2 px-4 border-b border-border/30 relative">
      <div className="relative flex items-center gap-1">
        <div className="relative w-6 h-6 rounded-full">
          <LocationPin />
        </div>
        <span className="text-sm font-medium text-accent-foreground">
          PlaceStory Agent
        </span>
      </div>
      <div className="flex items-center border border-border/30 rounded-sm"></div>
    </div>
  );
};

const QueryPrompts = ({
  onSendMessage,
}: {
  onSendMessage: (content: string) => void;
}) => {
  return (
    <div className="p-4 space-y-2">
      <div className="text-xs text-muted-foreground mb-3 text-center">
        Try these examples:
      </div>
      <div className="space-y-2">
        {queries.map((query, index) => (
          <button
            key={index}
            onClick={() => onSendMessage(query)}
            className="w-full text-left p-3 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-colors text-sm text-graphite hover:border-border/50"
          >
            {query}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatMessages = ({
  messages,
  onSendMessage,
  autoScroll,
  setAutoScroll,
  isUserScrolling,
  setIsUserScrolling,
}: {
  messages: Array<{ type: "user" | "assistant"; content: string }>;
  onSendMessage: (content: string) => void;
  autoScroll: boolean;
  setAutoScroll: (value: boolean) => void;
  isUserScrolling: boolean;
  setIsUserScrolling: (value: boolean) => void;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const { streamId, jobStatus } = useUserStore();

  console.log("Job status: ", jobStatus);

  // Auto scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll, messagesEndRef]);

  // Check if user is near the bottom (within 100px)
  const isNearBottom = () => {
    if (!scrollContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  // Handle manual scroll - detect user intervention
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const isAtBottom = isNearBottom();

    // If user scrolled away from bottom, disable auto-scroll
    if (!isAtBottom && !isUserScrolling) {
      setAutoScroll(false);
      setIsUserScrolling(true);
    }
    // If user scrolled back to bottom, enable auto-scroll
    else if (isAtBottom && isUserScrolling) {
      setAutoScroll(true);
      setIsUserScrolling(false);
    }
  };

  // Auto-scroll when messages update (including streaming)
  useEffect(() => {
    scrollToBottom();
  }, [messages, autoScroll, scrollToBottom]);

  // Auto-scroll with a slight delay for streaming content
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 flex-col overflow-y-auto relative mb-2"
    >
      {messages.length === 0 && <QueryPrompts onSendMessage={onSendMessage} />}

      {messages.length > 0 && (
        <div className="px-4 py-4">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-2">
              <div
                className={`w-full ${
                  message.type === "assistant" && "flex flex-col"
                }`}
              >
                <div
                  className={`${
                    message.type === "user"
                      ? "px-3 py-2 flex items-center"
                      : "px-1 py-2"
                  } rounded-md text-sm text-graphite font-light ${
                    message.type === "user"
                      ? "bg-pearl-gray border border-border/20 text-md text-graphite font-normal"
                      : ""
                  }`}
                >
                  {message.type === "assistant" && (
                    <div className="flex items-center justify-start gap-2 mt-3">
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      <span className="text-xs text-border font-light">
                        IP Agent
                      </span>
                    </div>
                  )}

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                          <div className="overflow-x-auto">
                            <SyntaxHighlighter
                              showLineNumbers
                              wrapLines
                              wrapLongLines
                              language={match[1]}
                              // @ts-expect-error ignore it
                              style={
                                styles.solarizedDarkAtom as {
                                  [key: string]: React.CSSProperties;
                                }
                              }
                              customStyle={{
                                margin: 0,
                                borderRadius: "0.25rem",
                                fontSize: "0.875rem",
                                padding: 0,
                              }}
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code
                            className="bg-[var(--color-palette-beige-4)] px-1 py-0.5 rounded text-xs"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      p({ children, ...props }) {
                        return (
                          <p
                            className="mb-0 whitespace-pre-line overflow-wrap-break-word leading-relaxed"
                            {...props}
                          >
                            {children}
                          </p>
                        );
                      },
                      h1({ children, ...props }) {
                        return (
                          <h1
                            className="text-lg font-semibold mt-2 mb-4"
                            {...props}
                          >
                            {children}
                          </h1>
                        );
                      },
                      h2({ children, ...props }) {
                        return (
                          <h2
                            className="text-base font-semibold mt-5 mb-3"
                            {...props}
                          >
                            {children}
                          </h2>
                        );
                      },
                      h3({ children, ...props }) {
                        return (
                          <h3
                            className="text-base font-semibold mt-4 mb-2"
                            {...props}
                          >
                            {children}
                          </h3>
                        );
                      },
                      ul({ children, ...props }) {
                        return (
                          <ul
                            className="list-disc pl-6 mb-4 space-y-1"
                            {...props}
                          >
                            {children}
                          </ul>
                        );
                      },
                      ol({ children, ...props }) {
                        return (
                          <ol
                            className="list-decimal pl-6 mb-4 space-y-1"
                            {...props}
                          >
                            {children}
                          </ol>
                        );
                      },
                      li({ children, ...props }) {
                        return (
                          <li className="mb-1" {...props}>
                            {children}
                          </li>
                        );
                      },
                      blockquote({ children, ...props }) {
                        return (
                          <blockquote
                            className="border-l-2 border-[var(--color-palette-gold-dark)] pl-4 my-4 italic"
                            {...props}
                          >
                            {children}
                          </blockquote>
                        );
                      },
                      a({ children, href, ...props }) {
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                            {...props}
                          >
                            {children}
                          </a>
                        );
                      },
                      strong({ children, ...props }) {
                        return (
                          <strong className="font-medium" {...props}>
                            {children}
                          </strong>
                        );
                      },
                      em({ children, ...props }) {
                        return (
                          <em className="italic" {...props}>
                            {children}
                          </em>
                        );
                      },
                      table({ children, ...props }) {
                        return (
                          <div className="overflow-x-auto my-4">
                            <table
                              className="min-w-full divide-y divide-gray-300 border border-gray-300"
                              {...props}
                            >
                              {children}
                            </table>
                          </div>
                        );
                      },
                      pre({ children, ...props }) {
                        return (
                          <pre
                            className="overflow-x-auto min-w-full w-[300px]"
                            {...props}
                          >
                            {children}
                          </pre>
                        );
                      },
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>

                  {/* Copy button for assistant messages only */}
                  {message.type === "assistant" && !streamId && (
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-4 h-4 text-border hover:text-obsidian-black hover:cursor-pointer"
                            onClick={() => {
                              navigator.clipboard.writeText(message.content);
                              setShowCopiedMessage(true);
                              setTimeout(() => {
                                setShowCopiedMessage(false);
                              }, 2000);
                            }}
                          >
                            {showCopiedMessage ? (
                              <Check
                                className="w-4 h-4 transition-all duration-300"
                                strokeWidth={1.5}
                              />
                            ) : (
                              <Copy className="w-4 h-4" strokeWidth={1.5} />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent
                          arrowClassName="bg-charcoal-gray fill-charcoal-gray"
                          side="top"
                          className="rounded-sm bg-charcoal-gray text-white border-obsidian-black shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                        >
                          Copy to clipboard
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {jobStatus.length > 0 && <JobStatusIndicator jobStatus={jobStatus} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatInput = ({
  inputValue,
  setInputValue,
  onSendMessage,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: (content: string) => void;
}) => {

  const { isProcessingMessage } = useUserStore();

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-transparent px-3 mb-2 shadow-lg shadow-background relative z-20">
      <div className="relative bg-none">
        {isProcessingMessage ? <TheTicker /> : null}
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Create a presentation for..."
          className="w-full pr-12 resize-none min-h-[80px] placeholder:text-muted-foreground font-light max-h-40 bg-primary-foreground border border-border/30 ring-none focus:outline-none focus-visible:ring-0"
          rows={10}
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          variant="ghost"
          size="sm"
          className="absolute bottom-0 right-0 h-8 w-8 p-0 text-accent-foreground hover:text-primary/80 hover:bg-transparent disabled:text-muted-foreground"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;

const TheTicker = () => {
  const { isProcessingMessage } = useUserStore();
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <div
      className={`absolute -top-7.5 -z-1 w-[90%] left-1/2 h-8 bg-primary-foreground border-t 
  border-x rounded-t-sm border-border/30 flex items-center justify-between px-4 -translate-x-1/2 transition-all duration-300
  ${isProcessingMessage ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-transparent flex items-center justify-center">
          <LocationPin />
        </div>
        <span className="text-sm text-graphite font-medium tracking-tighter">
          Agent is running
        </span>
        {Array.from({ length: dots }).map((_, index) => (
          <span key={index} className="text-sm text-graphite -ml-1.5">
            .
          </span>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {/* {streamId ? "Processing..." : "Waiting for response..."} */}
      </div>
    </div>
  );
};
