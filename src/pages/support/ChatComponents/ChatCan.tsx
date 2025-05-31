import React, { useState, useEffect, useRef } from 'react';
import MessageCan from './MessageCan';
import InputCan from './InputCan';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isUser: boolean;
}
interface props {
 notShowInputCan?: boolean
}

const ChatCan: React.FC<props> = ({notShowInputCan}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! How can I help you today?",
      timestamp: "12:22 PM",
      isUser: false
    },
    {
      id: 2,
      text: "I'm looking for information about your services.",
      timestamp: "12:22 PM",
      isUser: true
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the last message whenever messages update
  useEffect(() => {
    if (!notShowInputCan) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: messages.length + 2,
        text: "Thanks for your message! We will reach you soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col h-[700px] rounded-md shadow-sm shadow-gray-400 bg-white `}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageCan
            key={message.id}
            text={message.text}
            timestamp={message.timestamp}
            isUser={message.isUser}
          />
        ))}
        {/* Invisible div at the bottom to auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
      {!notShowInputCan && <div className="py-4 px-2">
        <InputCan onSendMessage={handleSendMessage} />
      </div>}
    </div>
  );
};

export default ChatCan;
