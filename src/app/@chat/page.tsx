'use client';

import { useState } from 'react';
import ChatForm from './components/ChatForm';

export default function Chat() {
  const [isChatFormVisible, setIsChatFormVisible] = useState(false);

  const toggleChatForm = () => {
    setIsChatFormVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={toggleChatForm}
        className="absolute bottom-10 right-10 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg duration-[400ms] hover:bg-blue-600"
      >
        Chat 💬
      </button>
      {isChatFormVisible && <ChatForm />}
    </div>
  );
}
