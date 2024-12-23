import { useCallback, useEffect, useRef, useState } from 'react';
import { Message } from '../types/chat';
import MessageBubbles from './MessageBubbles';
import MessageInput from './MessageInput';

interface ChatFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatForm({ isOpen, onClose }: ChatFormProps) {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

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
      const closeMessage = {
        type: 'text',
        content: 'Client disconnecting gracefully',
        sender: 'me',
        timestamp: new Date().toISOString(),
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

  const handleSendMessage = (message: Message) => {
    try {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(message));
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
      <MessageBubbles messages={messages} />
      <MessageInput
        isConnected={isConnected}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
