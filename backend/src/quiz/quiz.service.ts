import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionsService } from '../questions/questions.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { SCENT_MAPPINGS } from './data/scent-mapping.data';

const TEA_PRIORITY = ['Trà xanh', 'Trà trắng', 'Trà đen', 'Trà olong'];
const BASE_PRIORITY = ['Hoa sen hồng', 'Gỗ hồng', 'Hoa nhài', 'Đàn hương'];

@Injectable()
export class QuizService {
  constructor(
    private prisma: PrismaService,
    private questionsService: QuestionsService,
  ) {}

  async submit(dto: SubmitQuizDto) {
    const questions = this.questionsService.getFullQuestions();

    // Initialize scores
    const teaScores: Record<string, number> = {
      'Trà xanh': 0,
      'Trà trắng': 0,
      'Trà đen': 0,
      'Trà olong': 0,
    };
    const baseScores: Record<string, number> = {
      'Hoa sen hồng': 0,
      'Gỗ hồng': 0,
      'Hoa nhài': 0,
      'Đàn hương': 0,
    };

    // Calculate scores
    for (const answer of dto.answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) throw new BadRequestException(`Invalid questionId: ${answer.questionId}`);

      const option = question.options.find(o => o.label === answer.option);
      if (!option) throw new BadRequestException(`Invalid option: ${answer.option}`);

      if (question.category === 'tea') {
        teaScores[option.note] += 2;
      } else {
        baseScores[option.note] += 2;
      }
    }

    // Get top 2 teas with tie-breaking
    const sortedTeas = TEA_PRIORITY
      .map(name => ({ name, score: teaScores[name] }))
      .sort((a, b) => b.score - a.score || TEA_PRIORITY.indexOf(a.name) - TEA_PRIORITY.indexOf(b.name));

    const tea1 = sortedTeas[0];
    const tea2 = sortedTeas[1];

    // Get top base note with tie-breaking
    const sortedBases = BASE_PRIORITY
      .map(name => ({ name, score: baseScores[name] }))
      .sort((a, b) => b.score - a.score || BASE_PRIORITY.indexOf(a.name) - BASE_PRIORITY.indexOf(b.name));

    const base1 = sortedBases[0];
    const base2 = sortedBases[1];

    // Calculate formula drops
    const teaDiff = tea1.score - tea2.score;
    const tea1Drops = teaDiff >= 3 ? 3 : 2;
    const tea2Drops = 2;

    const baseDiff = base1.score - base2.score;
    const baseDrops = baseDiff >= 3 ? 2 : 1;

    // Normalize tea pair for lookup (sort alphabetically)
    const normalizedTeas = [tea1.name, tea2.name].sort();

    // Find scent mapping
    const mapping = SCENT_MAPPINGS.find(
      m => m.teas[0] === normalizedTeas[0] && m.teas[1] === normalizedTeas[1] && m.base === base1.name,
    );

    if (!mapping) {
      throw new BadRequestException('Could not find scent mapping for this combination');
    }

    const formula = [
      { name: tea1.name, drops: tea1Drops },
      { name: tea2.name, drops: tea2Drops },
      { name: base1.name, drops: baseDrops },
    ];

    // Save result to database
    await this.prisma.result.create({
      data: {
        participantId: dto.participantId,
        answersJson: JSON.stringify(dto.answers),
        teaScoresJson: JSON.stringify(teaScores),
        baseScoresJson: JSON.stringify(baseScores),
        scentIdentity: mapping.scentIdentity,
        personalityDescription: mapping.personalityDescription,
        scentDescription: mapping.scentDescription,
        formulaJson: JSON.stringify(formula),
      },
    });

    return {
      scentIdentity: mapping.scentIdentity,
      personalityDescription: mapping.personalityDescription,
      formula,
      scentDescription: mapping.scentDescription,
      teaScores,
      baseScores,
    };
  }
}
