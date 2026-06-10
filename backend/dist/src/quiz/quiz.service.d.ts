import { PrismaService } from '../prisma/prisma.service';
import { QuestionsService } from '../questions/questions.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizService {
    private prisma;
    private questionsService;
    constructor(prisma: PrismaService, questionsService: QuestionsService);
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
