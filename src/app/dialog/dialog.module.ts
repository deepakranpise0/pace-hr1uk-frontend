import { CommonModule } from '@angular/common';
// home.module.ts
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  AddEditPopupComponent,
} from './add-edit-popup/add-edit-popup.component';

const routes: Routes = [
  { path: '', component: AddEditPopupComponent }
];

@NgModule({
  declarations: [AddEditPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AddEditDialogModule { }
