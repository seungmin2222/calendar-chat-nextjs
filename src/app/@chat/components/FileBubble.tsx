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
      return bytes + ' byte';
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
        <div className="flex flex-col gap-2">
          {isImage && (
            <div className="relative h-52 w-full overflow-hidden rounded">
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
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                isMe ? 'bg-white/15' : 'bg-gray-400/10'
              }`}
            >
              <span className="select-none text-xl">{getFileIcon()}</span>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate whitespace-normal break-all font-medium leading-tight">
                {message.fileName}
              </span>
              <span className="select-none whitespace-normal break-all text-sm opacity-75">
                {formatFileSize(message.fileSize)}
              </span>
            </div>
            <button
              onClick={handleDownload}
              className={`group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                isMe
                  ? 'bg-white/20 hover:bg-white/30 active:bg-white/25'
                  : 'bg-gray-500/10 hover:bg-gray-500/20 active:bg-gray-500/15'
              }`}
            >
              <Image
                src="/images/downloadIcon.png"
                width={16}
                height={16}
                alt="Download"
                className={`transition-transform duration-200 group-hover:-translate-y-[1px] group-active:translate-y-[1px] ${
                  isMe ? 'opacity-90' : 'opacity-75'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="mt-1 select-none text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
