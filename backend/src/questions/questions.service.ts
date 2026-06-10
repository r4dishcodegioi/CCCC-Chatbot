import { Injectable } from '@nestjs/common';
import { QUESTIONS } from './data/questions.data';

@Injectable()
export class QuestionsService {
  getAll() {
    return QUESTIONS.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options.map(o => ({
        label: o.label,
        text: o.text,
      })),
    }));
  }

  getFullQuestions() {
    return QUESTIONS;
  }
}
