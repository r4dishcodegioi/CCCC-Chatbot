'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { getQuestions, submitQuiz } from '@/lib/api';
import { Question, Answer } from '@/lib/types';
import ChatBubble from '@/components/ChatBubble';
import QuestionCard from '@/components/QuestionCard';
import ProgressBar from '@/components/ProgressBar';
import LoadingAnalysis from '@/components/LoadingAnalysis';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  text: string;
  questionData?: Question;
  showOptions?: boolean;
}

export default function QuizPage() {
  const router = useRouter();
  const { participantId, participantName, answers, addAnswer, setResult } = useQuizStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Redirect if no participant
  useEffect(() => {
    if (!participantId) {
      router.push('/register');
    }
  }, [participantId, router]);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Show first question
  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
      // Welcome message
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        type: 'ai',
        text: `Xin chào ${participantName || 'bạn'}! 🌿 Mình là AI Scent Assistant. Hãy trả lời 10 câu hỏi để mình tìm ra mùi hương dành riêng cho bạn nhé!`,
      };

      setMessages([welcomeMsg]);

      // Show first question after a delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const questionMsg: ChatMessage = {
            id: `q-${questions[0].id}`,
            type: 'ai',
            text: questions[0].text,
            questionData: questions[0],
            showOptions: true,
          };
          setMessages(prev => [...prev, questionMsg]);
        }, 800);
      }, 1000);
    }
  }, [questions, messages.length, participantName]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAnswer = async (option: string) => {
    if (isTransitioning || !questions[currentIndex]) return;
    setIsTransitioning(true);

    const question = questions[currentIndex];
    const selectedOption = question.options.find(o => o.label === option);

    // Add user answer message
    const userMsg: ChatMessage = {
      id: `answer-${question.id}`,
      type: 'user',
      text: `${option}. ${selectedOption?.text || ''}`,
    };
    setMessages(prev => {
      // Disable options on current question
      return prev.map(m => m.id === `q-${question.id}` ? { ...m, showOptions: false } : m).concat(userMsg);
    });

    // Store answer
    const answer: Answer = { questionId: question.id, option };
    addAnswer(answer);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= questions.length) {
      // All questions answered — show loading then submit
      setTimeout(async () => {
        setShowLoading(true);
        try {
          const allAnswers = [...answers, answer];
          const result = await submitQuiz(participantId!, allAnswers);
          setResult(result);

          // Wait for loading animation
          setTimeout(() => {
            router.push('/result');
          }, 2500);
        } catch (error) {
          console.error('Failed to submit quiz:', error);
          setShowLoading(false);
          setIsTransitioning(false);
        }
      }, 500);
    } else {
      // Show next question
      setTimeout(() => {
        setIsTyping(true);
        setCurrentIndex(nextIndex);

        setTimeout(() => {
          setIsTyping(false);
          const nextQuestion = questions[nextIndex];
          const questionMsg: ChatMessage = {
            id: `q-${nextQuestion.id}`,
            type: 'ai',
            text: nextQuestion.text,
            questionData: nextQuestion,
            showOptions: true,
          };
          setMessages(prev => [...prev, questionMsg]);
          setIsTransitioning(false);
        }, 800);
      }, 500);
    }
  };

  if (showLoading) {
    return <LoadingAnalysis />;
  }

  if (!participantId) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#261900]/80 backdrop-blur-lg border-b border-sage/10 px-6 py-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-3">
            <p className="text-xs tracking-[0.2em] uppercase text-blush font-body">
              AI Scent Personality Test
            </p>
          </div>
          <ProgressBar current={Math.min(currentIndex + 1, questions.length)} total={questions.length || 10} />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-md mx-auto">
          {messages.map((msg) => (
            <div key={msg.id}>
              <ChatBubble message={msg.text} isAI={msg.type === 'ai'}>
                {msg.showOptions && msg.questionData && (
                  <QuestionCard
                    question={msg.questionData}
                    onAnswer={handleAnswer}
                    disabled={!msg.showOptions || isTransitioning}
                  />
                )}
              </ChatBubble>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sage to-deep-green flex items-center justify-center mr-3">
                <span className="text-white text-xs">🍵</span>
              </div>
              <div className="chat-bubble-ai px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
                  <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
                  <div className="typing-dot w-2 h-2 rounded-full bg-sage"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
