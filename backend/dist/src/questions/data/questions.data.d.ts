export interface QuestionOption {
    label: string;
    text: string;
    note: string;
}
export interface Question {
    id: number;
    text: string;
    category: 'tea' | 'base';
    options: QuestionOption[];
}
export declare const QUESTIONS: Question[];
