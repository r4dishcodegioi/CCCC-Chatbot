import { Controller, Get, Param } from '@nestjs/common';
import { ResultsService } from './results.service';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get(':participantId')
  async findByParticipantId(@Param('participantId') participantId: string) {
    return this.resultsService.findByParticipantId(participantId);
  }
}
