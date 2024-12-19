import { useState } from 'react';

export default function ChatForm() {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="fixed bottom-24 right-10 flex h-[60%] w-96 flex-col rounded-lg bg-slate-200 shadow-2xl">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-lg rounded-br-none bg-blue-500 p-2 text-white">
            나
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[75%] rounded-lg rounded-bl-none bg-gray-300 p-2 text-black">
            상대방
          </div>
        </div>
      </div>
      <div className="relative flex items-center border-t border-gray-300 p-3">
        <input
          type="text"
          className="flex-1 rounded-xl border border-gray-300 bg-white p-2 pr-16 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={handleMessageChange}
        />
        <button className="absolute right-12 rounded-full p-1 duration-[400ms] hover:bg-blue-100">
          📎
        </button>
        <button className="absolute right-4 rounded-full p-1 duration-[400ms] hover:bg-blue-100">
          📤
        </button>
      </div>
    </div>
  );
}
