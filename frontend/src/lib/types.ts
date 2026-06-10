export interface QuestionOption {
  label: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface Answer {
  questionId: number;
  option: string;
}

export interface FormulaItem {
  name: string;
  drops: number;
}

export interface QuizResult {
  scentIdentity: string;
  personalityDescription: string;
  formula: FormulaItem[];
  scentDescription: string;
  teaScores: Record<string, number>;
  baseScores: Record<string, number>;
}

export interface Participant {
  id: string;
  fullName: string;
  studentId: string;
  email: string;
}
