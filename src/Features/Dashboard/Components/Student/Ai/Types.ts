import { SingleGroup } from '@/Features/Dashboard/Types';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  createdAt: number;
}

export interface ChatRequest {
  question: string;
  group: SingleGroup;
}

export interface ChatResponse {
  answer: string;
}
