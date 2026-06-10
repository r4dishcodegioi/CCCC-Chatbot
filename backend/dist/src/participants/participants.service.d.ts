import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
export declare class ParticipantsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateParticipantDto): Promise<{
        fullName: string;
        studentId: string;
        email: string;
        id: string;
        createdAt: Date;
    }>;
}
