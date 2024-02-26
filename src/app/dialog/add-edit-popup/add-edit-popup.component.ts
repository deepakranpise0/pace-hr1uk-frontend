import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  MasterDataFormType,
  MasterDataType,
} from 'src/app/common/enum/AppEnum';
import { MasterDataList } from 'src/app/common/models/MasterDataList';
import { MasterDataModel } from 'src/app/common/models/MasterDataModel';
import { ApiService } from 'src/app/services/api/api.service';

export interface DialogData {
  type: MasterDataType;
  action: MasterDataFormType;
  editData: MasterDataList;
  masterType: MasterDataType;
}

@Component({
  selector: 'pace-hr1-uk-frontend-add-edit-popup',
  templateUrl: './add-edit-popup.component.html',
  styleUrl: './add-edit-popup.component.css',
})
export class AddEditPopupComponent {
  public masterDataType = MasterDataType;
  public masterDataFormType = MasterDataFormType;
  public isEdit: boolean = false;
  public editId!: string;
  public masterForm: FormGroup;
  foods = [
    { value: '65d68e848de0efa24950573b', viewValue: 'Steak' },
    { value: '65d68e848de0efa24950573b', viewValue: 'Pizza' },
    { value: '65d68e848de0efa24950573b', viewValue: 'Tacos' },
  ];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditPopupComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _apiService: ApiService
  ) {
    this.masterForm = this.fb.group({
      // name: ['', Validators.required],
      description: '',
    });

    if (this.data && this.data?.masterType === MasterDataType.QUESTION) {
      this.masterForm.addControl(
        'sectionId',
        this.fb.control('', Validators.required)
      );
      this.masterForm.addControl(
        'questions',
        this.fb.control('', Validators.required)
      );
    } else {
      this.masterForm.addControl(
        'name',
        this.fb.control('', Validators.required)
      );
    }
    if (this.data && this.data?.action === MasterDataFormType.UPDATE) {
      this.isEdit = true;
      this.masterForm.patchValue({
        name: this.data.editData.name,
        description: this.data.editData.description,
      });
      this.editId = this.data.editData._id;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.masterForm.valid) {
      const formModel: MasterDataModel = this.masterForm
        .value as unknown as MasterDataModel;
      // formModel.masterDataType = this.data.type;
      this.dialogRef.close({ formModel, id: this.editId });
    }
  }
}
