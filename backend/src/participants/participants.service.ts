import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateParticipantDto) {
    return this.prisma.participant.create({
      data: dto,
    });
  }

  async findAll() {
    // July 1, 2026 00:00:00 +07:00 is 2026-06-30T17:00:00.000Z
    const startDate = new Date('2026-06-30T17:00:00.000Z');
    const participants = await this.prisma.participant.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        results: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });


    return participants.map((p) => ({
      ...p,
      results: p.results.map((r) => ({
        ...r,
        answersJson: this.tryParseJson(r.answersJson),
        teaScoresJson: this.tryParseJson(r.teaScoresJson),
        baseScoresJson: this.tryParseJson(r.baseScoresJson),
        formulaJson: this.tryParseJson(r.formulaJson),
        answers: this.tryParseJson(r.answersJson),
        teaScores: this.tryParseJson(r.teaScoresJson),
        baseScores: this.tryParseJson(r.baseScoresJson),
        formula: this.tryParseJson(r.formulaJson),
      })),
    }));
  }

  private tryParseJson(str: string) {
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }
}

