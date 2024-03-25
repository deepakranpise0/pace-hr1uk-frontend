export type Question = {
  questionId: [];
  sectionId: string;
};

export type QuestionSet = {
  isSelected?: boolean;
  _id: string;
  sectionName: string;
  questionsArray: Question[];
};

export type TemplateModel = {
  templateName: string;
  domainId: string;
  assessmentId: string;
  questionsPerSection: [
    {
      sectionId: string;
      questionId: string[];
    }
  ];
};

export type ExpectedType = {
  _id: string;
  sectionName: string;
  questionsArray: questions[];
};

export type InterviewResponse = {
  userId: string;
  templateId: string;
  questionsPerSection: {
    sectionId: string;
    questionId: QuestionsFeedback[];
    notes: string;
  }[];
};

type QuestionsFeedback = {
  low: string;
  indicator: number;
  high: string;
};

type questions = { _id: string; name: String };

export type CompletedInterviewResponse = {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  templateId: {
    _id: string;
    templateName: string;
  };
  pdfUrlLink: string;
  questionsPerSection: [
    {
      sectionId: {
        _id: string;
        name: string;
      };
      questionId: [
        {
          low: string;
          high: {
            _id: string;
            description: string;
          };
          indicator: {
            _id: string;
            name: string;
            indicatorValue: number;
          };
        }
      ];
      notes: string;
      _id: string;
    }
  ];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
};

export type Users = {
  _id: string;
  name: string;
  email: string;
};
