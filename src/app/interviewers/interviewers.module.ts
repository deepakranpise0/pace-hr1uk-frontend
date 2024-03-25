import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { InterviewersComponent } from './interviewers.component';

const routes: Routes = [
  { path: '', component: InterviewersComponent }
];

@NgModule({
  declarations: [InterviewersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDividerModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class InterviewersModule { }
