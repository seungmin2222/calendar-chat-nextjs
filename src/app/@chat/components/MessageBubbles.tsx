import { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import IntroductionBubble from './IntroductionBubble';
import TextBubble from './TextBubble';

interface MessageBubblesProps {
  messages: Message[];
}

export default function MessageBubbles({ messages }: MessageBubblesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => {
        switch (message.type) {
          case 'text':
            return (
              <TextBubble
                key={message.id || `${message.sender}-${message.timestamp}`}
                message={message}
              />
            );
          case 'introduction':
            return (
              <IntroductionBubble
                key={message.id || `${message.sender}-${message.timestamp}`}
                message={message}
              />
            );
          default:
            return null;
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
