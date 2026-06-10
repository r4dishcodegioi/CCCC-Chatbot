import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async findByParticipantId(participantId: string) {
    const result = await this.prisma.result.findFirst({
      where: { participantId },
      orderBy: { createdAt: 'desc' },
    });

    if (!result) {
      throw new NotFoundException('Result not found');
    }

    return {
      ...result,
      answersJson: JSON.parse(result.answersJson),
      teaScoresJson: JSON.parse(result.teaScoresJson),
      baseScoresJson: JSON.parse(result.baseScoresJson),
      formulaJson: JSON.parse(result.formulaJson),
    };
  }
}
