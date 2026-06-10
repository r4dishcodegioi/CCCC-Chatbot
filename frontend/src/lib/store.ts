import { create } from 'zustand';
import { Answer, QuizResult } from './types';

interface QuizStore {
  participantId: string | null;
  participantName: string | null;
  answers: Answer[];
  result: QuizResult | null;
  setParticipant: (id: string, name: string) => void;
  addAnswer: (answer: Answer) => void;
  setResult: (result: QuizResult) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  participantId: null,
  participantName: null,
  answers: [],
  result: null,
  setParticipant: (id, name) => set({ participantId: id, participantName: name }),
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  setResult: (result) => set({ result }),
  reset: () => set({ participantId: null, participantName: null, answers: [], result: null }),
}));
