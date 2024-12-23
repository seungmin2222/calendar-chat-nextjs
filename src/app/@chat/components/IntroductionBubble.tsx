import { IntroductionMessage } from '../types/chat';

interface IntroductionBubbleProps {
  message: IntroductionMessage;
}

export default function IntroductionBubble({
  message,
}: IntroductionBubbleProps) {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className="min-w-[240px] max-w-[280px] rounded-2xl bg-white p-4 shadow-md">
        <div className="mb-2 whitespace-normal break-words text-lg font-bold text-blue-600">
          {message.greeting}
        </div>
        <div className="mb-3 whitespace-normal break-words text-gray-700">
          {message.introduction}
        </div>
        {(message.websiteUrl || message.telephone) && (
          <div className="space-y-2 border-t border-gray-200 pt-2">
            {message.websiteUrl && (
              <a
                href={message.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center whitespace-normal break-all text-sm text-blue-500 hover:text-blue-600"
              >
                🌐 {message.websiteUrl}
              </a>
            )}
            {message.telephone && (
              <a
                href={`tel:${message.telephone}`}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                📞 {message.telephone}
              </a>
            )}
          </div>
        )}
        <div className="mt-2 select-none text-right text-xs text-gray-400">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
