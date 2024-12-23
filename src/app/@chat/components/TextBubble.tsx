import { Message } from 'postcss';

interface TextBubbleProps {
  message: Message;
}

export default function TextBubble({ message }: TextBubbleProps) {
  const isMe = message.sender === 'me';

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] whitespace-pre-wrap break-all rounded-2xl p-2 ${
          isMe
            ? 'rounded-br-none bg-blue-500 text-white'
            : 'rounded-bl-none bg-gray-300 text-black'
        }`}
      >
        {message.content}
        <div className="mt-1 select-none text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
