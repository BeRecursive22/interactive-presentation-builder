import { createStreamManager } from "@/api/chat-event-stream";
import { createChatStream } from "@/api/create-chat-stream";
import { LocationPin } from "@/assets/location-pin-svg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import { TemplatesDrawer } from "./templates-drawer";

const queries = [
  "Build me a showcase for 1 S Main St, Bel Air, MD 21014 for use as a Restaurant",
  "Build me a showcase for 123 Market Street, San Francisco, CA 94105 for use as a Retail",
  "Build me a showcase for 555 Madison Avenue, New York, NY 10022 for use as an Office",
];

export const Chat = () => {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const { sessionId, setStreamId, streamId } = useUserStore();

  const { mutate: chatMutation } = useMutation({
    mutationFn: async (variables: { prompt: string } ) => {
      const { prompt } = variables;
      return await createChatStream({ sessionId: sessionId!, prompt });
    },
    onSuccess: (result) => {
      console.log("Result:", result);
      const streamId = result.data.stream_id
      console.log("Stream ID:", streamId);
      setStreamId(streamId)
    },
    onError: (error) => {
      console.error("Chat mutation error:", error);
      setMessages(prev => [...prev.slice(0, -1), { type: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.' }]);
    },
  });



 const handleSendMessage = (content: string) => {
    // ALWAYS reset auto-scroll when user sends a new message
    setAutoScroll(true);
    setIsUserScrolling(false);
    
    setMessages(prev => [
      ...prev,
      { type: 'user', content },
      { type: 'assistant', content: '' }
    ]);
    
    chatMutation({
      prompt: content,
    });
    
    if (content === inputValue) {
      setInputValue('');
    }
  };


  useEffect(() => {
    if (streamId) {
      createStreamManager({ 
        sessionId: sessionId!, 
        streamId: streamId!, 
        onChunk: (chunk) => {
          console.log("Chunk:", chunk);
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            
            // If the last message is from assistant, append the chunk
            if (lastMessage && lastMessage.type === 'assistant') {
              lastMessage.content += chunk;
            } else {
              // If no assistant message exists, create one
              newMessages.push({ type: 'assistant', content: chunk });
            }
            
            return newMessages;
          });
        } 
      });
    }
  }, [streamId, sessionId]);

  return (
    <div className="w-full h-full flex flex-col relative bg-pearl-gray/20">
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
  const { selectedTemplate } = useUserStore();
  
  return (
    <div className="w-full h-11 flex items-center justify-between gap-2 px-4 border-b border-border/30 relative">
      <div className="relative flex items-center gap-1">
        <div className="relative w-6 h-6 rounded-full">
          <LocationPin />
        </div>
        <span className="text-sm font-medium text-accent-foreground">LM</span>
      </div>
      <div className="flex items-center border border-border/30 rounded-sm">
        <span className=" px-2 py-1 text-xs truncate font-light text-accent-foreground">{selectedTemplate?.id}</span>
        <TemplatesDrawer />
      </div>
    </div>
  );
};

const QueryPrompts = ({ onSendMessage }: { onSendMessage: (content: string) => void }) => {
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
  setIsUserScrolling 
}: { 
  messages: Array<{type: 'user' | 'assistant', content: string}>,
  onSendMessage: (content: string) => void,
  autoScroll: boolean,
  setAutoScroll: (value: boolean) => void,
  isUserScrolling: boolean,
  setIsUserScrolling: (value: boolean) => void
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll, messagesEndRef]);

  // Check if user is near the bottom (within 100px)
  const isNearBottom = () => {
    if (!scrollContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
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
      {/* Show query prompts when there are no messages */}
      {messages.length === 0 && (
        <QueryPrompts onSendMessage={onSendMessage} />
      )}
      
      {/* Show messages */}
      {messages.length > 0 && (
        <div className="p-4 space-y-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex`}>
              <div className={`w-full ${message.type === "assistant" && "flex flex-col"}`}>
                <div className={`${message.type === 'user' ? 'px-3' : 'px-1'} py-2 rounded-md text-sm text-graphite font-light ${
                  message.type === 'user'
                    ? 'bg-pearl-gray border border-border/20 text-[13px] text-graphite font-normal'
                    : ''
                }`}>
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
                              style={styles.solarizedDarkAtom as { [key: string]: React.CSSProperties }}
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
                            className="mb-2 whitespace-pre-line overflow-wrap-break-word"
                            {...props}
                          >
                            {children}
                          </p>
                        );
                      },
                      h1({ children, ...props }) {
                        return (
                          <h1 className="text-lg font-semibold mt-6 mb-4" {...props}>
                            {children}
                          </h1>
                        );
                      },
                      h2({ children, ...props }) {
                        return (
                          <h2 className="text-base font-semibold mt-5 mb-3" {...props}>
                            {children}
                          </h2>
                        );
                      },
                      h3({ children, ...props }) {
                        return (
                          <h3 className="text-base font-semibold mt-4 mb-2" {...props}>
                            {children}
                          </h3>
                        );
                      },
                      ul({ children, ...props }) {
                        return (
                          <ul className="list-disc pl-6 mb-4 space-y-1" {...props}>
                            {children}
                          </ul>
                        );
                      },
                      ol({ children, ...props }) {
                        return (
                          <ol className="list-decimal pl-6 mb-4 space-y-1" {...props}>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
      
      {/* Auto-scroll indicator */}
      {/* {!autoScroll && (
        <div className="absolute bottom-4 right-4 z-10">
          <button
            onClick={() => {
              setAutoScroll(true);
              setIsUserScrolling(false);
              scrollToBottom();
            }}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs shadow-lg hover:bg-blue-600 transition-colors"
          >
            ↓ Scroll to bottom
          </button>
        </div>
      )} */}
    </div>
  );
};

const ChatInput = ({ 
  inputValue, 
  setInputValue, 
  onSendMessage 
}: { 
  inputValue: string,
  setInputValue: (value: string) => void,
  onSendMessage: (content: string) => void 
}) => {
  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-transparent px-3 mb-2 shadow-lg shadow-background relative">
      <div className="relative bg-none">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Create a storymap for..."
          className="w-full pr-12 resize-none min-h-[80px] placeholder:text-muted-foreground font-light max-h-40 bg-primary-foreground border border-border/30 ring-accent-foreground focus:outline-none focus:ring-0 shadow-md"
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




