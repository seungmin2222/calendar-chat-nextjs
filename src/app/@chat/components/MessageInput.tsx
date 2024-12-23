import { useState } from 'react';
import { IntroductionMessage, Message } from '../types/chat';
import IntroductionForm from './IntroductionForm';

interface MessageInputProps {
  isConnected: boolean;
  onSendMessage: (message: Message) => void;
}

export default function MessageInput({
  isConnected,
  onSendMessage,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isIntroFormOpen, setIsIntroFormOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message.trim() || isComposing || !isConnected) return;

    const newMessage: Message = {
      type: 'text',
      content: message.trim(),
      sender: 'me',
      timestamp: new Date().toISOString(),
    };

    onSendMessage(newMessage);
    setMessage('');
  };

  const handleSendIntroduction = (introMessage: IntroductionMessage) => {
    onSendMessage(introMessage);
    setIsIntroFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center border-t border-gray-300 p-3"
      >
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 bg-white p-2 pr-24 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button
          type="button"
          onClick={() => setIsIntroFormOpen(true)}
          className="absolute right-20 rounded-full p-1 duration-[400ms] hover:bg-blue-100"
        >
          📝
        </button>
        <button
          type="button"
          className="absolute right-12 rounded-full p-1 duration-[400ms] hover:bg-blue-100"
        >
          📎
        </button>
        <button
          type="submit"
          className="absolute right-4 rounded-full p-1 duration-[400ms] hover:bg-blue-100"
          disabled={isComposing || !isConnected}
        >
          📤
        </button>
      </form>

      <IntroductionForm
        isOpen={isIntroFormOpen}
        onClose={() => setIsIntroFormOpen(false)}
        onSendIntroduction={handleSendIntroduction}
      />
    </>
  );
}
