import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ParticipantsModule } from './participants/participants.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    PrismaModule,
    ParticipantsModule,
    QuestionsModule,
    QuizModule,
    ResultsModule,
  ],
})
export class AppModule {}
