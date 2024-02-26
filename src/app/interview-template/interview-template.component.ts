import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { APIEnum } from '../common/enum/APIEnum';
import { SpinnerService } from '../services/spinner/spinner.service';
import { UserModel } from '../common/models/UserModel';
import { MasterDataType } from '../common/enum/AppEnum';
import { MasterDataList } from '../common/models/MasterDataList';
import { QuestionMarkModel } from '../common/models/QuestionMarkModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'pace-hr1-uk-frontend-interview-template',
  templateUrl: './interview-template.component.html',
  styleUrl: './interview-template.component.css',
})
export class InterviewTemplateComponent implements OnInit {
  configFormGroup = this._formBuilder.group({
    userId: ['', Validators.required],
    domainId: ['', Validators.required],
    assessmentId: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  public smallScreen: boolean = false;

  public users!: UserModel[];
  public domains!: MasterDataList[];
  public assessmentTypes!: MasterDataList[];
  // public questions!: QuestionMarkModel[];
  public displayedColumns: string[] = [
    'no',
    'section',
    'name',
    // 'description',
    'action',
  ];
  questions = new MatTableDataSource<QuestionMarkModel>([]);
  panelOpenState = false;
  public selectedQuestions: QuestionMarkModel[] = [];
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
          } else this.users = res;

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

  public onNextClick() {
    // this.fetchGetData(true);
  }

  public deleteData(id: string) {}
  public editData(id: string) {}

  public selectQuestion(event: MatCheckboxChange, question: QuestionMarkModel) {
    question.isSelected = event.checked;
    if (event.checked) {
      this.selectedQuestions.push(question);
    }
  }
  public removeQuestion(index: number, question: QuestionMarkModel) {
    if (index >= 0) this.selectedQuestions.splice(index, 1);
    let ques = this.questions.data.find((q) => q._id === question._id);
    if (ques && ques.isSelected) ques.isSelected = false;
    this.questions._updateChangeSubscription();
  }
  onPageChange(event: PageEvent) {
    // Check if there are more items on the next page
    if (event.previousPageIndex && event.pageIndex < event.previousPageIndex) {
      const nextPageFirstIndex = event.pageIndex * event.pageSize;
      if (this.selectedQuestions.length > nextPageFirstIndex) {
        const nextItem = this.selectedQuestions[nextPageFirstIndex];
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }
  }
  openDialog() {}
}
