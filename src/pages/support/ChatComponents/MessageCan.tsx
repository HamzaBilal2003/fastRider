import React from 'react';
import { API_DOMAIN_Img } from '../../../apiConfig';

interface MessageProps {
  text: string;
  timestamp: string;
  isUser: boolean;
  profilePicture?: string;
}

const MessageCan: React.FC<MessageProps> = ({ text, timestamp, isUser,profilePicture }) => {
  return (
    <div className="flex mb-4">
      {isUser ? (
        <>
          <div className="flex-1"></div>
          <div className="flex flex-col items-end">
            <div
              className="bg-purple-800 text-white p-3 rounded-lg max-w-xs"
              style={{ wordWrap: 'break-word' }}
            >
              {text}
            </div>
            <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
              {text}
            </div>
            <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
          </div>
          <div className="flex-1"></div>
        </>
      )}
    </div>
  );
};

export default MessageCan;