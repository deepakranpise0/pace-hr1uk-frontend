import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { Users } from 'src/types';

import { APIEnum } from '../common/enum/APIEnum';
import {
  MasterDataFormType,
  MasterDataType,
} from '../common/enum/AppEnum';
import { MasterDataModel } from '../common/models/MasterDataModel';
import {
  AddEditPopupComponent,
} from '../dialog/add-edit-popup/add-edit-popup.component';
import { ApiService } from '../services/api/api.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'pace-hr1-uk-frontend-interviewers',
  templateUrl: './interviewers.component.html',
  styleUrl: './interviewers.component.css',
})
export class InterviewersComponent {
  
  displayedColumns: string[] = ['no', 'name', 'email','action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  interviewersData:Users[]=[];
  action: MasterDataFormType=MasterDataFormType.ADD;

  constructor(
    public dialog: MatDialog,
    private _apiService: ApiService,
    private _spinner: SpinnerService
  ) {
    this.getData();
  }

  async getData() {
    this.interviewersData = await this._apiService.getAllUsers();
  }

  // private fetchMasterList() {
  //   this._spinner.showSpinner();
  //   let endPoint = APIEnum.GET_MASTER + this.masterType;
  //   if (this.masterType === MasterDataType.QUESTION) {
  //     endPoint = APIEnum.GET_Questions;
  //   }
  //   this._apiService.get(endPoint).subscribe(
  //     (res: any) => {
  //       if (res) {
  //         if (this.masterType === MasterDataType.QUESTION)
  //           this.questionsData.data = res;
  //         else this.masterData.data = res;
  //         this._spinner.hideSpinner();
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       this._spinner.hideSpinner();
  //     }
  //   );
  // }

  openDialog(data: any = null): void {
    let dialogData = {
      action: MasterDataFormType.ADD,
      type:MasterDataType.CANDIDATES,
      editData: null,
      masterType: MasterDataType.CANDIDATES,
    };
    if (data) {
      dialogData.action = MasterDataFormType.UPDATE;
      dialogData.editData = data;
    }
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      data: dialogData,
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((formModel) => {
      console.log(formModel);
      let id = '';
      if (this.action === MasterDataFormType.UPDATE) {
        id = formModel.id;
      }
      formModel = formModel.formModel;
      this.handleDialogSubmit(formModel, id);
    });
  }

  public handleDialogSubmit(formModel: MasterDataModel, id: string = '') {
    this._spinner.showSpinner();
    let endPoint = APIEnum.GET_USERS;
    this._apiService.post(endPoint, formModel, id).subscribe(
      (res: any) => {
        if (res) {
          this.getData()
          this._spinner.hideSpinner();
        }
      },
      (error: any) => {
        console.error('Operation failed', error);
        this._spinner.hideSpinner();
      }
    );
  }
  public editData(data: MasterDataModel) {
    this.action = MasterDataFormType.UPDATE;
    this.openDialog(data);
  }

  public deleteData(id: string) {
    this._spinner.showSpinner();
    let endPoint =APIEnum.GET_USERS
    this._apiService.delete(endPoint + `/${id}`).subscribe(
      (res: any) => {
        if (res) {
          this.getData();
          this._spinner.hideSpinner();
        }
      },
      (error: any) => {
        console.error('Operation failed', error);
        this._spinner.hideSpinner();
      }
    );
  }
}
