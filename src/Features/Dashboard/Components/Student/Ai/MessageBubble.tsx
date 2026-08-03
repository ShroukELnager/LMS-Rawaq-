import { ChatMessage } from './Types';

type Props = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-[8px] px-4 py-3 text-sm leading-6 break-words ${
          isUser
            ? 'bg-[#00535C] text-white rounded-tr-none'
            : 'bg-[#EDF2F8] text-[#111C2C] rounded-tl-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>

        <span
          className={`mt-2 block text-[10px] ${
            isUser ? 'text-white/70' : 'text-[#7B8794]'
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
