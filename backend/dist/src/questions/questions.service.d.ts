export declare class QuestionsService {
    getAll(): {
        id: number;
        text: string;
        options: {
            label: string;
            text: string;
        }[];
    }[];
    getFullQuestions(): import("./data/questions.data").Question[];
}
