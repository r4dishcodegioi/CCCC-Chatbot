import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsString, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class AnswerDto {
  @IsInt()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['A', 'B', 'C', 'D'])
  option: string;
}

export class SubmitQuizDto {
  @IsString()
  @IsNotEmpty()
  participantId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  answers: AnswerDto[];
}
