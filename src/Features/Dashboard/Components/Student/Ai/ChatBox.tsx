'use client';

import { useEffect, useRef, useState } from 'react';

import Chat from '@/assets/icons/chat.svg';

import ChatMessages from './ChatMessages';
import ErrorState from './ErrorState';
import ChatInput from './ChatInput';
import { ChatMessage } from './Types';

import { SingleGroup } from '@/Features/Dashboard/Types';
import { useAppSelector } from '@/redux/hooks';

type Props = {
  group: SingleGroup;
};

export default function ChatBox({ group }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastQuestion, setLastQuestion] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state) => state.user.user);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  // Load messages
  useEffect(() => {
    if (!group?.id) return;

    const key = `chat-${user?.id}-${group.id}`;

    const saved = localStorage.getItem(key);

    if (saved) {
      setMessages(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, [group?.id, user?.id]);

  // Save messages
  useEffect(() => {
    if (!group?.id || !user?.id || !isLoaded) return;

    localStorage.setItem(
      `chat-${user.id}-${group.id}`,
      JSON.stringify(messages.slice(-50))
    );
  }, [messages, group?.id, user?.id, isLoaded]);

  const sendMessage = async (question: string) => {
    if (!question.trim()) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          group,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate response.');
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: data.answer,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();

    setLastQuestion(question);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: question,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput('');

    await sendMessage(question);
  };

  const handleRetry = () => {
    if (!lastQuestion) return;

    sendMessage(lastQuestion);
  };

  return (
    <div
      className={`mt-8 overflow-hidden rounded-[12px] bg-white transition-all duration-300 hidden md:block ${
        isOpen ? 'h-[356px]' : 'h-[64px]'
      }`}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center bg-[#EDF2F8] p-[20px] cursor-pointer"
      >
        <Chat className="mr-[8px]" />

        <h1 className="font-inter text-[1rem] font-[700] leading-[1.5rem] text-[#111C2C]">
          AI Learning Assistant
        </h1>
      </button>
      {isOpen && (
        <>
          {/* Content */}
          {error ? (
            <div className="h-[154px] p-4">
              <ErrorState message={error} onRetry={handleRetry} />
            </div>
          ) : (
            <ChatMessages
              messages={messages}
              loading={loading}
              bottomRef={bottomRef}
            />
          )}

          {/* Footer */}
          <ChatInput
            value={input}
            loading={loading}
            onChange={setInput}
            onSend={handleSend}
          />
        </>
      )}
    </div>
  );
}
