import React, { useState } from 'react';

interface InputCanProps {
  onSendMessage: (message: string) => void;
}

const InputCan: React.FC<InputCanProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-lg flex items-center shadow-md shadow-gray-400"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-transparent outline-none"
      />
      <button 
        type="submit"
        className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
      >
        <i className='bi bi-send text-2xl'></i>
      </button>
    </form>
  );
};

export default InputCan;