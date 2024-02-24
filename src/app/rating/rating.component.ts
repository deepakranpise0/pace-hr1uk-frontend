import { Component } from '@angular/core';

import {
  QuestionRatingModel,
  RatingModel,
} from '../common/models/RatingModel';

@Component({
  selector: 'pace-hr1-uk-frontend-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  public currentSetIndex = 0;

  public questionsSet: RatingModel[] = [
    {
      domain: 'Tele-Communications',
      section: '',
      questions: [
        {
          question: 'What is meant by telecommunications?',
          ratings: 0,
          filledStars: 0,
        },
        {
          question:
            'What is meant by telecommunications and give a brief applications in the industry?',
          ratings: 0,
          filledStars: 0,
        },
      ],
    },
    {
      domain: 'System Architecture',
      section: '',
      questions: [
        {
          question: 'What is meant by telecommunications?',
          ratings: 0,
          filledStars: 0,
        },
        {
          question:
            'What is meant by telecommunications and give a brief applications in the industry?',
          ratings: 0,
          filledStars: 0,
        },
      ],
    },
  ];

  fillStars(questionModel: QuestionRatingModel, starNumber: number) {
    if (questionModel.ratings === 0) {
      questionModel.filledStars = starNumber;
    } else {
      questionModel.filledStars = Math.max(starNumber, questionModel.ratings);
    }
  }

  resetStars(questionModel: QuestionRatingModel) {
    if (questionModel.ratings === 0) {
      questionModel.filledStars = 0;
    } else {
      if (questionModel.ratings < questionModel.filledStars) {
        questionModel.filledStars = questionModel.ratings;
      }
    }
  }

  public handleStars(
    event: Event,
    index: number,
    questionModel: QuestionRatingModel
  ) {
    event.preventDefault();
    questionModel.ratings = index; // Save the marked stars
    this.fillStars(questionModel, index);
  }

  public handleNext() {
    if(this.currentSetIndex < this.questionsSet.length - 1) {
      this.currentSetIndex += 1;
    }
  }
  public handlePrevious() {
    if(this.currentSetIndex > 0) {
      this.currentSetIndex -= 1;
    }
  }
}
