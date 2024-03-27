import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import {
  ExpectedType,
  TemplateModel,
} from 'src/types';

import { APIEnum } from '../common/enum/APIEnum';
import { MasterDataType } from '../common/enum/AppEnum';
import { MasterDataList } from '../common/models/MasterDataList';
import { QuestionMarkModel } from '../common/models/QuestionMarkModel';
import { ApiService } from '../services/api/api.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'pace-hr1-uk-frontend-interview-template',
  templateUrl: './interview-template.component.html',
  styleUrl: './interview-template.component.css',
})
export class InterviewTemplateComponent implements OnInit {
  public emptyQuestionSet: ExpectedType[] = [];
  templateData = [];
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
  public domains!: MasterDataList[];
  public hide: boolean = false;
  public assessmentTypes!: MasterDataList[];
  public displayedColumns: string[] = ['no', 'section', 'name', 'action'];
  public displayedColumn: string[] = ['no', 'templateName', 'domain', 'action'];
  public selectedTemplate: any = null;
  public questions = new MatTableDataSource<QuestionMarkModel>([]);
  public selectedQuestions: QuestionMarkModel[] = [];
  public displayedSelectedQuestions: QuestionMarkModel[] = [];
  public masterDataType = MasterDataType;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  templateTab: boolean = false;
  createTab: boolean = false;
  viewTab: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _spinner: SpinnerService
  ) {
  }
  ngOnInit() {
    window.addEventListener('resize', () => {
      this.smallScreen = window.innerWidth < 768;
    });
  }
  
  async ngAfterViewInit() {
    this._spinner.showSpinner();
    this.questions.paginator = this.paginator;
    this.templateData = await this._apiService.fetchTemplateData();
    this.questions = await this._apiService.fetchQuestions();
    this.domains = await this._apiService.fetchDomains();
    this.assessmentTypes = await this._apiService.fetchAssessments();
    this.setTabVisible('templateTab');
    this._spinner.hideSpinner();
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
    if (event.previousPageIndex && event.pageIndex < event.previousPageIndex) {
      const nextPageFirstIndex = event.pageIndex * event.pageSize;
      if (this.selectedQuestions.length > nextPageFirstIndex) {
        this.paginator._changePageSize(this.paginator.pageSize);
      }
    }
  }

  async submit() {
    const templateBody: TemplateModel = {
      templateName: this.configFormGroup.get('templateName')?.value || '',
      domainId: this.configFormGroup.get('domainId')?.value || '',
      assessmentId: this.configFormGroup.get('assessmentId')?.value || '',
      questionsPerSection: [
        {
          sectionId: '',
          questionId: [],
        },
      ],
    };

    const questionSet = this.questionsFormGroup.get('questionSet')?.value || [];

    if (questionSet.length > 0) {
      questionSet.forEach((element, index) => {
        const { _id, questionsArray } = questionSet[index];
        templateBody.questionsPerSection[index] = {
          sectionId: '',
          questionId: [],
        };
        templateBody.questionsPerSection[index].sectionId = _id || '';
        templateBody.questionsPerSection[index].questionId = questionsArray.map(
          ({ _id }) => _id
        );
      });
      try {
        // Call the API service to submit the template body
        const templateResponse = await this._apiService.submitTemplate(
          templateBody
        );
        console.log(templateResponse);
        this.setTabVisible('templateTab');
      } catch (error) {
        console.error('Error submitting template:', error);
      }
    }
  }

  public getConfigName(masterDataType: MasterDataType, id: string): string {
    let masterData = [];
    switch (masterDataType) {
      case MasterDataType.DOMAIN: {
        masterData = this.domains;
        break;
      }
      case MasterDataType.ASSESSMENT_TYPE: {
        masterData = this.assessmentTypes;
        break;
      }
      default:
        return '';
    }
    return (
      (masterData && masterData.find((data) => data._id === id)?.name) || ''
    );
  }

  public viewData(data: any) {
    this.setTabVisible('viewTab');
    this.selectedTemplate = data;
    console.log(data);
  }
  setTabVisible(tab: string) {
    switch (tab) {
      case 'viewTab':
        this.viewTab = true;
        this.templateTab = false;
        this.createTab = false;
        break;
      case 'templateTab':
        this.templateTab = true;
        this.viewTab = false;
        this.createTab = false;
        break;
      case 'createTab':
        this.createTab = true;
        this.viewTab = false;
        this.templateTab = false;
        break;
      default:
        this.templateTab = true;
        this.viewTab = false;
        this.createTab = false;
        break;
    }
  }

  editData(_t45: any) {
    throw new Error('Method not implemented.');
  }
  deleteData(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
