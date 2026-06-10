import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    submit(dto: SubmitQuizDto): Promise<{
        scentIdentity: string;
        personalityDescription: string;
        formula: {
            name: string;
            drops: number;
        }[];
        scentDescription: string;
        teaScores: Record<string, number>;
        baseScores: Record<string, number>;
    }>;
}
