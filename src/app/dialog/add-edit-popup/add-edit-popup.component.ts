import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {
  MasterDataFormType,
  MasterDataType,
} from 'src/app/common/enum/AppEnum';
import { Router } from '@angular/router';

export interface DialogData {
  type: MasterDataType;
  action: MasterDataFormType;
}
@Component({
  selector: 'pace-hr1-uk-frontend-add-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-popup.component.html',
  styleUrl: './add-edit-popup.component.css',
})
export class AddEditPopupComponent {
  public masterDataType = MasterDataType;
  public masterDataFormType = MasterDataFormType;
  masterForm = this.fb.group({
    name: ['', Validators.required],
    description: '',
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditPopupComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.masterForm.valid) {
      const formModel: MasterDataType = this.masterForm
        .value as unknown as MasterDataType;
      console.log(formModel);

      // this._apiService
      //   .post(
      //     this.data.type === 'Add'
      //       ? APIConstant.EDIT_MEDICALTEAM
      //       : APIConstant.ADD_MEDICALTEAM,
      //       formModel
      //   )
      //   .subscribe(
      //     (res: any) => {
      //       if (res && res.status) {
      //         this.router.navigate(['/medical-team']);
      //       } else {
      //         // this.showSpinner = false;
      //       }
      //     },
      //     (error: any) => {
      //       // this.showSpinner = false;
      //       console.error('Operation failed', error);
      //     }
      //   );
    }
  }
}
