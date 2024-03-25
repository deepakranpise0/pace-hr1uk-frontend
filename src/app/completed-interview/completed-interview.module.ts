import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CompletedInterviewComponent } from './completed-interview.component';

const routes: Routes = [{ path: '', component: CompletedInterviewComponent }];

@NgModule({
  declarations: [CompletedInterviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class CompletedInterviewModule { }
