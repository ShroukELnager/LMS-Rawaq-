import { RefObject } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { ChatMessage } from './Types';

type Props = {
  messages: ChatMessage[];
  loading: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
};

export default function ChatMessages({
  messages,
  loading,
  bottomRef,
  
}: Props) {


  return (
    <div className="h-[154px] overflow-y-auto p-4 space-y-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
}
