import { UserTypeConstant } from '../enum/UserTypeConstant';

export class RatingModel {
  public domain: string;
  public section: string;
  public questions: QuestionRatingModel[];

  constructor() {
    this.domain = '';
    this.section = '';
    this.questions = [];
  }
}

export class QuestionRatingModel {
  public question!: string;
  public ratings!: number;
  public filledStars!: number;
}
