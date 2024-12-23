import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatMessage } from '../types/chat';

interface ChatFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatForm({ isOpen, onClose }: ChatFormProps) {
  const ws = useRef<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const connectWebSocket = useCallback(() => {
    try {
      ws.current = new WebSocket('wss://chat.example.com');

      ws.current.onopen = () => {
        console.log('WebSocket 연결 성공');
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, receivedMessage]);
      };

      ws.current.onclose = () => {
        console.log('WebSocket 연결 종료');
        setIsConnected(false);
        setMessage('');
        ws.current = null;
        onClose();
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket 에러:', error);
        onClose();
      };
    } catch (error) {
      console.error('WebSocket 연결 실패:', error);
      onClose();
    }
  }, [onClose]);

  const cleanupWebSocket = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const closeMessage: ChatMessage = {
        content: 'Client disconnecting gracefully',
        sender: 'me',
        timestamp: new Date().toISOString(),
        type: 'disconnect',
      };
      ws.current.send(JSON.stringify(closeMessage));
      ws.current.close();
    }
    ws.current = null;
    setMessages([]);
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      connectWebSocket();
    } else {
      cleanupWebSocket();
    }

    return () => {
      cleanupWebSocket();
    };
  }, [isOpen, cleanupWebSocket, connectWebSocket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message.trim() || isComposing || !isConnected) return;

    try {
      if (ws.current?.readyState === WebSocket.OPEN) {
        const newMessage = {
          content: message.trim(),
          sender: 'me',
          type: 'text',
        };

        ws.current.send(JSON.stringify(newMessage));
        setMessage('');
      } else {
        console.error('WebSocket이 연결되지 않았습니다.');
        onClose();
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-24 right-10 flex h-[70%] w-[430px] flex-col rounded-lg bg-slate-200 shadow-2xl">
      {!isConnected && (
        <div className="absolute left-0 right-0 top-0 bg-red-500 py-1 text-center text-sm text-white">
          연결이 끊어졌습니다.
        </div>
      )}
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id || `${msg.sender}-${msg.timestamp}`}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] whitespace-pre-wrap break-all rounded-2xl p-2 ${
                msg.sender === 'me'
                  ? 'rounded-br-none bg-blue-500 text-white'
                  : 'rounded-bl-none bg-gray-300 text-black'
              }`}
            >
              {msg.content}
              <div className="mt-1 text-xs opacity-70">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative flex items-center border-t border-gray-300 p-3"
      >
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 bg-white p-2 pr-16 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        />
        <button className="absolute right-12 rounded-full p-1 duration-[400ms] hover:bg-blue-100">
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
    </div>
  );
}
