import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
export declare class ParticipantsController {
    private readonly participantsService;
    constructor(participantsService: ParticipantsService);
    create(dto: CreateParticipantDto): Promise<{
        fullName: string;
        studentId: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
}
