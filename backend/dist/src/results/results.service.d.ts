import { PrismaService } from '../prisma/prisma.service';
export declare class ResultsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByParticipantId(participantId: string): Promise<{
        answersJson: any;
        teaScoresJson: any;
        baseScoresJson: any;
        formulaJson: any;
        id: string;
        createdAt: Date;
        participantId: string;
        scentIdentity: string;
        personalityDescription: string;
        scentDescription: string;
    }>;
}
