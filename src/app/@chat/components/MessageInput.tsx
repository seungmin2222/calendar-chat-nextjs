import { useRef, useState } from 'react';
import { FileMessage, IntroductionMessage, Message } from '../types/chat';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1000 * 1000;

    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const fileMessage: FileMessage = {
          type: 'file',
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          fileUrl: URL.createObjectURL(file),
          fileData: reader.result as string,
          sender: 'me',
          timestamp: new Date().toISOString(),
        };
        onSendMessage(fileMessage);
      };
      reader.readAsDataURL(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('파일 처리 중 오류 발생:', error);
      alert('파일 업로드에 실패했습니다.');
    }
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
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
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
          onClick={handleFileClick}
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
