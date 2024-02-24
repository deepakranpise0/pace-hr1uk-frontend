import {
  Component,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  MasterDataFormType,
  MasterDataType,
} from 'src/app/common/enum/AppEnum';
import { MasterDataModel } from 'src/app/common/models/MasterDataModel';
import { ApiService } from 'src/app/services/api/api.service';

export interface DialogData {
  type: MasterDataType;
  action: MasterDataFormType;
}
@Component({
  selector: 'pace-hr1-uk-frontend-add-edit-popup',
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _apiService: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.masterForm.valid) {
      const formModel: MasterDataModel = this.masterForm
        .value as unknown as MasterDataModel;
      formModel.masterDataType = this.data.type;
      console.log(formModel);
      this.dialogRef.close(formModel);
    }
  }
}
