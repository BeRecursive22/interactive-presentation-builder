import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/user-store";
import { ArrowRight, MapIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

const queries = [
  "Build me a showcase for 1 S Main St, Bel Air, MD 21014 for use as a Restaurant",
  "Build me a showcase for 123 Market Street, San Francisco, CA 94105 for use as a Retail",
  "Build me a showcase for 555 Madison Avenue, New York, NY 10022 for use as an Office",
];

export const Chat = () => {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);
  const [inputValue, setInputValue] = useState('');
  const { triggerStorymapCreation } = useUserStore();

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content }]);
    
    // Trigger storymap creation in preview component
    triggerStorymapCreation();
    
    // TODO: Add logic to send to API and get response
    // For now, just log the message
    console.log('Sending:', content);
    
    // Clear input if it was from the text area
    if (content === inputValue) {
      setInputValue('');
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-pearl-gray/20">
      <ChatHeader />
      <ChatMessages messages={messages} onSendMessage={handleSendMessage} />
      <ChatInput 
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="w-full h-11 flex items-center justify-between gap-2 px-4 border-b border-border/30 relative">
      <div className="flex items-center gap-2">
        <MapIcon className="w-4.5 h-4.5 text-accent-foreground" />
        <span className="text-sm font-medium text-accent-foreground">Assistant</span>
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

const ChatMessages = ({ messages, onSendMessage }: { 
  messages: Array<{type: 'user' | 'assistant', content: string}>,
  onSendMessage: (content: string) => void 
}) => {
  const messagesEndRef = useRef(null);

  return (
    <div className="flex-1 flex-col overflow-y-auto relative mb-2">
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
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      strong: ({...props}) => <span className="font-normal" {...props} />,
                      p: ({...props}) => <p className="mb-1 last:mb-0 text-sm" {...props} />
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




