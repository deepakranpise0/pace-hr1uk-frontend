import { Component } from '@angular/core';

import { CompletedInterviewResponse } from 'src/types';

import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'pace-hr1-uk-frontend-completed-interview',
  templateUrl: './completed-interview.component.html',
  styleUrl: './completed-interview.component.css'
})
  
export class CompletedInterviewComponent {

  completedInterViewData:CompletedInterviewResponse[]=[];
  public displayedColumn: string[] = ['no', 'templateName', 'userName', 'action'];

  constructor(private _apiService: ApiService) {
    this.fetchData();
  }

  async fetchData() { 
    this.completedInterViewData = await this._apiService.fetchCompletedInterview();
    console.log(this.completedInterViewData);
  }

  async download(data: { _id: string; }): Promise<void> {
    try {
      const response = await this._apiService.generatePdf(data._id);

      const blobData = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blobData);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
