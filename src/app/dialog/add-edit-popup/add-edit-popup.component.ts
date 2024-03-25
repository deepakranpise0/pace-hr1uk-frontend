import {
  Component,
  Inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

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
  sections: any;
  constructor(
    private fb: FormBuilder,
    public _apiService:ApiService,
    public dialogRef: MatDialogRef<AddEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.masterForm = this.fb.group({
      name: ['', Validators.required],
    });

    if (this.data && this.data?.masterType === MasterDataType.QUESTION) {
      this.masterForm.addControl(
        'sectionId',
        this.fb.control('', Validators.required)
      );
    }
    if (this.data && this.data?.masterType === MasterDataType.CANDIDATES) {
      this.masterForm.addControl(
        'email',
        this.fb.control('', [Validators.required,Validators.email])
      );
    } else {
       this.masterForm.addControl(
        'description',
        this.fb.control('')
      );
    }
    if (this.data && this.data?.action === MasterDataFormType.UPDATE) {
      this.isEdit = true;
      this.masterForm.patchValue({
        name: this.data.editData.name,
      });
      if (this.data.editData.email) {
         this.masterForm.patchValue({
        email: this.data.editData.email,
      });
      }
      if (this.data.editData.description) {
        this.masterForm.patchValue({
          description: this.data.editData.description,
        });
      }
      if (this.data.editData.sectionId) {
        this.masterForm.patchValue({
          sectionId: this.data.editData.sectionId._id,
        });
      }
      this.editId = this.data.editData._id;
    }
    this.section();
  }

  async section(){
    this.sections = await this._apiService.fetchSections();
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
