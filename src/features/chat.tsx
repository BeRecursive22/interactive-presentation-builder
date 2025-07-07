import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BrainCircuit, MapIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

const fallbackMessages = [
    {
      type: "user",
      content: "Hi! What can you help me create with this tool?"
    },
    {
      type: "assistant",
      content: `**Turn any address into interactive storymaps in minutes.**

  Just provide an address and tell me how it might be used - I'll build a comprehensive story map with:

  📍 **Interactive location mapping** with demographic overlays

  📊 **5-minute drive-time market analysis**

  💰 **Income, population, and lifestyle data**

  📈 **Growth projections and trends**

  🏢 **Recent market intelligence and local insights**


  **Try this format:**
  *"Build me an interactive showcase for [ADDRESS] which is being offered for use as [RESTAURANT/RETAIL/OFFICE]"*


  **Example:**
  "Build me a showcase for 1 S Main St, Bel Air, MD 21014 for use as a Restaurant"


  What property would you like to showcase?`
    }
  ];

export const Chat = () => {
  return (
    <div className="w-full h-full flex flex-col relative bg-white">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="w-full h-11 flex items-center justify-between gap-2 px-4 border-b relative">
        {/* <div className="absolute bg-gradient-to-b from-paper to-transparent -bottom-8 left-0 right-0 h-8 z-10"></div> */}
      <div className="flex items-center gap-3">
        <MapIcon className="w-6 h-6 text-foreground" />
        <span className="text-md font-medium text-org-10">LM Storymap</span>
      </div>
    </div>
  );
};

const ChatMessages = () => {
  const messagesEndRef = useRef(null);


  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2 relative mb-2">
      {fallbackMessages.map((message, index) => (
        <div key={index} className={`flex`}>
          <div className={`w-full`}>
            <div className={`${message.type === 'user' ? 'px-3' : 'px-1'} py-2 rounded-md font-normal text-sm ${
              message.type === 'user'
                ? 'bg-primary/20 text-org-10'
                : 'text-org-10'
            }`}>
              {message.type === 'assistant' && <div className="flex items-center gap-2 text-xs text-org-10/50 mb-4"><BrainCircuit className="w-4 h-4" /> Thought for 1 second  </div>}
              <ReactMarkdown 
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  strong: ({...props}) => <span className="font-medium" {...props} />,
                  p: ({...props}) => <p className="mb-1 last:mb-0" {...props} />
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      // Handle sending message here
      console.log('Sending:', inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-transparent px-4 mb-2 shadow-lg shadow-background relative">
      <div className="relative bg-none">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Create a storymap for..."
          className="w-full pr-12 resize-none min-h-[80px] placeholder:text-org-10/50 max-h-40 bg-white border border-border focus:outline-none focus:ring-0"
          rows={10}
        />
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          variant="ghost"
          size="sm"
          className="absolute bottom-0 right-0 h-8 w-8 p-0 text-primary hover:text-primary/80 hover:bg-transparent disabled:text-muted-foreground"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;