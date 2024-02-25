import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { RatingComponent } from './rating.component';

const routes: Routes = [
  { path: '', component: RatingComponent }
];

@NgModule({
  declarations: [RatingComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class RatingModule { }
