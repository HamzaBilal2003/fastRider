import React, {  useEffect, useRef } from 'react';
import MessageCan from '../../support/ChatComponents/MessageCan';
import { useQuery } from '@tanstack/react-query';
import { fetchUserMessages } from '../../../queries/rider/riderDetail';
import { useParams } from 'react-router-dom';
import { formatCreatedAt } from '../../../constants/help';

interface props {
 notShowInputCan?: boolean
 selectedUserChat?: any
}

const UserMessageChat: React.FC<props> = ({notShowInputCan,selectedUserChat}) => {
    const {username}= useParams();
  console.log("from chatcan",selectedUserChat);
  const {data:chats,isLoading,error} = useQuery({
    queryKey:['message'],
    queryFn: ()=> fetchUserMessages(Number(username),Number(selectedUserChat.UserId)),
  });
  const messages = chats?.data || [];
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the last message whenever messages update
  useEffect(() => {
    if (!notShowInputCan) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if(isLoading) return <div className='h-full flex items-center justify-center'>Wait...</div>;
  return (
    <div className={`flex flex-col h-[700px] rounded-md shadow-sm shadow-gray-400 bg-white `}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageCan
            key={message.id}
            text={message.message}
            timestamp={formatCreatedAt(message.created_at)}
            isUser={message.sender_id != Number(selectedUserChat.UserId) }
          />
        ))}
        {/* Invisible div at the bottom to auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default UserMessageChat;
