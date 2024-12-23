import Image from 'next/image';
import { FileMessage } from '../types/chat';

interface FileBubbleProps {
  message: FileMessage;
}

export default function FileBubble({ message }: FileBubbleProps) {
  const isMe = message.sender === 'me';
  const isImage = message.fileType.startsWith('image/');

  const fileTypes = {
    isPdf: message.fileType.endsWith('pdf'),
    isDoc: message.fileType.endsWith('doc'),
    isXls: message.fileType.endsWith('xls'),
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();

    const link = document.createElement('a');
    link.href = message.fileData;
    link.download = message.fileName;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1000) {
      return bytes + ' B';
    } else if (bytes < 1000000) {
      return (bytes / 1000).toFixed(1) + ' KB';
    } else {
      return (bytes / 1000000).toFixed(1) + ' MB';
    }
  };

  const getFileIcon = () => {
    if (isImage) return '🖼️';
    if (fileTypes.isPdf) return '📄';
    if (fileTypes.isDoc) return '📝';
    if (fileTypes.isXls) return '📊';
    return '📎';
  };

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`w-[260px] rounded-2xl p-3 ${
          isMe
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-gray-300 text-black'
        }`}
      >
        <a
          href={message.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="flex cursor-pointer flex-col gap-2"
        >
          {isImage && (
            <div className="relative h-32 w-full overflow-hidden rounded">
              <Image
                src={message.fileUrl}
                alt={message.fileName}
                fill
                className="object-cover"
                sizes="(max-width: 280px) 100vw, 280px"
                priority={false}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="select-none text-2xl">{getFileIcon()}</span>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate whitespace-normal break-all font-medium">
                {message.fileName}
              </span>
              <span className="select-none whitespace-normal break-all text-sm opacity-75">
                {formatFileSize(message.fileSize)}
              </span>
            </div>
          </div>
        </a>
        <div className="mt-1 select-none text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
