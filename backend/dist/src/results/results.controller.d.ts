import { ResultsService } from './results.service';
export declare class ResultsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
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
