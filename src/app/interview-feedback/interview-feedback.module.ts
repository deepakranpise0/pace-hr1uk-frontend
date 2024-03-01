import { CommonModule } from '@angular/common';
// home.module.ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { InterviewFeedbackComponent } from './interview-feedback.component';

const routes: Routes = [
  { path: '', component: InterviewFeedbackComponent }
];

@NgModule({
  declarations: [InterviewFeedbackComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ]
})
export class InterviewTemplateModule { }
