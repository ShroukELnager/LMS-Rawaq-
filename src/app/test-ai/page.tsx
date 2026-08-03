'use client';

import { useState } from 'react';

export default function TestAI() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function handleAsk() {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await response.json();

    setAnswer(data.answer);
  }

  return (
    <div className="p-8">
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 w-full"
      />

      <button
        onClick={handleAsk}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Ask
      </button>

      <p className="mt-6">{answer}</p>
    </div>
  );
}
