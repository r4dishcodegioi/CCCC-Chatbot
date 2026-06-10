import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit')
  async submit(@Body() dto: SubmitQuizDto) {
    return this.quizService.submit(dto);
  }
}
