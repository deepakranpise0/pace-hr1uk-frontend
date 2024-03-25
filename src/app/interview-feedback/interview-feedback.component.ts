import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatTabChangeEvent,
  MatTabGroup,
} from '@angular/material/tabs';

import { InterviewResponse } from 'src/types';

import { ApiService } from '../services/api/api.service';

export interface Feedback {
  low: string;
  rating: number;
  high: string;
}

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.css'],
})
export class InterviewFeedbackComponent {

  interviewTemplate: any;
  users: any;
  templateData: any;
  userName: any;
  @ViewChild('tabGroup')
  tabGroup!: MatTabGroup;
  isUserSelected = false;
  hide = true;
  tabs: any[] = [];
  observations:any = [ ];
  templateConfigForm: any;

  constructor(
    private formBuilder: FormBuilder,
    public _apiService: ApiService
  ) {
    this.templateConfigForm = this.formBuilder.group({
      userName: ['', Validators.required],
      templateName: ["", Validators.required],
    });
    this.getMasterData();
  }
  ngAfterViewInit(): void { }
  
  goToStepper() {
    this.isUserSelected = true;
    console.log(this.templateConfigForm.get('userName').value)
    this.interviewTemplate = this.templateData.find(
      (a: { _id: string }) =>
        a._id === this.templateConfigForm.get('templateName').value
    );
    console.log(this.interviewTemplate);
    this.initializeTabs();
  }

  async getMasterData() {
    this.users = await this._apiService.getAllUsers();
    this.templateData = await this._apiService.fetchTemplateData();
    this.observations = await this._apiService.fetchIndicators();
  }
  setTabVisible() {
    this.isUserSelected = false;
  }
  toggleStar(behavior: any, starIndex: number) {
    behavior.controls.rating.setValue(starIndex);
  }

  tabChanged(event: MatTabChangeEvent): void {
    console.log('Tab changed:', event.index);
  }

  previousTab() {
    const selectedIndex = this.tabGroup.selectedIndex || 0;
    if (selectedIndex > 0) {
      this.tabGroup.selectedIndex = selectedIndex - 1;
    }
  }

  nextTab() {
    const selectedIndex = this.tabGroup.selectedIndex || 0;
    if (selectedIndex < this.tabGroup._tabs.length - 1) {
      this.tabGroup.selectedIndex = selectedIndex + 1;
    }
  }

  async submit() {
    console.log(
      'Form submitted:',
      this.tabs.map((tab) => tab.form.value)
    );
    const payload:InterviewResponse={
      "userId":this.templateConfigForm.get('userName').value,
      "templateId":this.templateConfigForm.get('templateName').value,
      "questionsPerSection": this.tabs.map((tab) => ({
        sectionId: tab.form.get('sectionId').value,
        questionId: tab.form.get('behaviors').value.map((a:any) => ({
          low: a.low,
          high: a.questionId,
          indicator:a.ratings
        })),
        notes:tab.form.get('notes').value
      }))
      
    }
    console.log(
      'Form submitted:',
      payload
    );
    const response = await this._apiService.submitInterviewFeedback(payload);
    console.log(response);
  }

 initializeTabs() {
  this.tabs = this.interviewTemplate.questionsPerSection.map((section: any) => ({
    label: section.sectionId.name,
    form: this.formBuilder.group({
      sectionId:section.sectionId._id,
      behaviors: this.formBuilder.array(section.questionId.map((question: any) => 
        this.formBuilder.group({
          low: [null, Validators.required],
          high: [question.name, Validators.required],
          questionId:[question._id],
          ratings: [0, Validators.required]
        }))
      ),
      notes: [section.notes || null, Validators.nullValidator]
    })
  }));
  }
  
  onClick(user: any) {
    this.userName = user.name;
  }

}
