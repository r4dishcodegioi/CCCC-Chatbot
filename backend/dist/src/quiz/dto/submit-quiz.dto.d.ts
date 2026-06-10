export declare class AnswerDto {
    questionId: number;
    option: string;
}
export declare class SubmitQuizDto {
    participantId: string;
    answers: AnswerDto[];
}
