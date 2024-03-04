import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { APIEnum } from '../common/enum/APIEnum';
import { MasterDataType } from '../common/enum/AppEnum';
import { MasterDataList } from '../common/models/MasterDataList';
import { QuestionMarkModel } from '../common/models/QuestionMarkModel';
import { UserModel } from '../common/models/UserModel';
import { ApiService } from '../services/api/api.service';
import { SpinnerService } from '../services/spinner/spinner.service';

type ExpectedType = {
  _id: String;
  sectionName: String;
  questionsArray: questions[];
};
type questions = { _id: String; name: String };
@Component({
  selector: 'pace-hr1-uk-frontend-interview-template',
  templateUrl: './interview-template.component.html',
  styleUrl: './interview-template.component.css',
})
export class InterviewTemplateComponent implements OnInit {
  public emptyQuestionSet: ExpectedType[] = [];

  configFormGroup = this._formBuilder.group({
    templateName: ['', Validators.required],
    domainId: ['', Validators.required],
    assessmentId: ['', Validators.required],
  });
  questionsFormGroup = this._formBuilder.group({
    questionSet: [this.emptyQuestionSet, Validators.required],
  });
  accordionItems: ExpectedType[] = [];

  isLinear = false;
  public smallScreen: boolean = false;

  public users!: UserModel[];
  public domains!: MasterDataList[];
  public assessmentTypes!: MasterDataList[];
  public displayedColumns: string[] = ['no', 'section', 'name', 'action'];
  public questions = new MatTableDataSource<QuestionMarkModel>([]);
  public selectedQuestions: QuestionMarkModel[] = [];
  public displayedSelectedQuestions: QuestionMarkModel[] = [];
  public masterDataType = MasterDataType;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _spinner: SpinnerService
  ) {}
  ngOnInit() {
    this.fetchGetData();
    this.fetchMasterData(MasterDataType.DOMAIN);
    this.fetchMasterData(MasterDataType.ASSESSMENT_TYPE);
    this.fetchGetData(true);

    window.addEventListener('resize', () => {
      this.smallScreen = window.innerWidth < 768;
    });
  }

  ngAfterViewInit() {
    this.questions.paginator = this.paginator;
  }

  private fetchGetData(questions: boolean = false) {
    let endPoint = APIEnum.GET_USERS;
    if (questions) {
      endPoint = APIEnum.GET_Questions;
    }
    this._apiService.get(endPoint).subscribe(
      (res: any) => {
        if (res) {
          if (questions) {
            res.forEach((question: QuestionMarkModel) => {
              question.isSelected = false; // Set isSelected to false for each entry
            });
            this.questions.data = res;
          } else {
            this.users = res;
          }
          this._spinner.hideSpinner();
        }
      },
      (error) => {
        console.log(error);
        this._spinner.hideSpinner();
      }
    );
  }

  private fetchMasterData(type: MasterDataType) {
    let endPoint = APIEnum.GET_MASTER + type;
    this._apiService.get(endPoint).subscribe(
      (res: any) => {
        if (res) {
          if (type === MasterDataType.DOMAIN) this.domains = res;
          else if (type === MasterDataType.ASSESSMENT_TYPE)
            this.assessmentTypes = res;

          this._spinner.hideSpinner();
        }
      },
      (error) => {
        console.log(error);
        this._spinner.hideSpinner();
      }
    );
  }

  public selectQuestion(event: MatCheckboxChange, question: QuestionMarkModel) {
    question.isSelected = event.checked;
    if (event.checked) {
      this.addSelectedRecord(question);
    }
    if (!event.checked) {
      this.removeQuestion(question);
    }
  }

  public addSelectedRecord(question: QuestionMarkModel) {
    let accordionItems: ExpectedType[] =
      this.questionsFormGroup.get('questionSet')?.value || [];
    const findSectionIndex = accordionItems.findIndex(
      (a) => a._id === question.sectionId._id
    );
    const { sectionId, name, _id } = question;
    if (findSectionIndex === -1) {
      let data = {
        _id: sectionId._id,
        sectionName: sectionId.name,
        questionsArray: [{ _id, name }],
      };
      accordionItems.push(data);
    } else {
      accordionItems[findSectionIndex].questionsArray.push({ _id, name });
    }
    this.questionsFormGroup.patchValue({
      questionSet: accordionItems,
    });
  }

  public removeQuestion(question: QuestionMarkModel) {
    let accordionItems: ExpectedType[] =
      this.questionsFormGroup.get('questionSet')?.value || [];
    const findSectionIndex = accordionItems.findIndex(
      (a) => a._id === question.sectionId._id
    );
    const { sectionId, name, _id } = question;
    if (findSectionIndex > -1) {
      const questionIndex = accordionItems[
        findSectionIndex
      ].questionsArray.findIndex((a) => a._id === _id);
      accordionItems[findSectionIndex].questionsArray.splice(questionIndex, 1);
      if (accordionItems[findSectionIndex].questionsArray.length === 0) {
        if (accordionItems.length === 1) {
          accordionItems = [];
        } else {
          accordionItems.splice(findSectionIndex, 1);
        }
      }
    }
    this.questionsFormGroup.patchValue({
      questionSet: accordionItems,
    });
  }
  onPageChange(event: PageEvent) {
    // Check if there are more items on the next page
    if (event.previousPageIndex && event.pageIndex < event.previousPageIndex) {
      const nextPageFirstIndex = event.pageIndex * event.pageSize;
      if (this.selectedQuestions.length > nextPageFirstIndex) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }
  }

  submit() {
    console.log(this.configFormGroup);
  }
  public getConfigName(masterDataType : MasterDataType, id: string): string {
    let masterData=[];
    switch(masterDataType) {
      case MasterDataType.DOMAIN : {
        masterData = this.domains;
        break;
      }
      case MasterDataType.ASSESSMENT_TYPE : {
        masterData = this.assessmentTypes;
        break;
      }
      default : return '';
    }

    return masterData.find(data => data._id === id)?.name || '';
  }
}
