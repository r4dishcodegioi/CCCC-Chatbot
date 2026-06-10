import { QuestionsService } from './questions.service';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getAll(): {
        id: number;
        text: string;
        options: {
            label: string;
            text: string;
        }[];
    }[];
}
