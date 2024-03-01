import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { AppConstant } from '../common/constant/AppConstant';
import { APIEnum } from '../common/enum/APIEnum';
import {
  MasterDataFormType,
  MasterDataType,
} from '../common/enum/AppEnum';
import { MasterDataList } from '../common/models/MasterDataList';
import { MasterDataModel } from '../common/models/MasterDataModel';
import { QuestionDataList } from '../common/models/QuestionDataList';
import {
  AddEditPopupComponent,
} from '../dialog/add-edit-popup/add-edit-popup.component';
import { ApiService } from '../services/api/api.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Component({
  selector: 'pace-hr1-uk-frontend-master-data',
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.css',
})
export class MasterDataComponent implements OnInit {
  public masterType!: MasterDataType;
  public MasterDataTypes = MasterDataType;
  public masterDataList!: MasterDataList[];
  public action = MasterDataFormType.ADD;
  public isQuestionsSelected: boolean = false;
  displayedColumns: string[] = ['no', 'name', 'description', 'action'];
  masterData = new MatTableDataSource<MasterDataList>();
  questionsData = new MatTableDataSource<QuestionDataList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _apiService: ApiService,
    private _spinner: SpinnerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // Retrieve the value of 'type' parameter from the URL
      const typeParam = params.get('type');
      if (
        typeParam &&
        Object.values(MasterDataType).includes(typeParam as MasterDataType)
      ) {
        this.masterType = typeParam as MasterDataType;
        if (this.masterType === MasterDataType.QUESTION) {
          this.isQuestionsSelected = true;
          // console.log(this.displayedColumns.slice(2));
          this.displayedColumns.splice(2, 0, 'section');
          // console.log(this.displayedColumns);
        }
        this.fetchMasterList();
      } else {
        // Invalid type, navigate back to home
        this.router.navigate(['/']);
      }
    });
  }
  ngAfterViewInit() {
    if (this.masterType === MasterDataType.QUESTION)
      this.questionsData.paginator = this.paginator;
    else this.masterData.paginator = this.paginator;
  }

  public getTitle(): string {
    return this.masterType === MasterDataType.ASSESSMENT_TYPE
      ? AppConstant.Assessment_Type
      : this.masterType;
  }

  private fetchMasterList() {
    this._spinner.showSpinner();
    let endPoint = APIEnum.GET_MASTER + this.masterType;
    if (this.masterType === MasterDataType.QUESTION) {
      endPoint = APIEnum.GET_Questions;
    }
    this._apiService.get(endPoint).subscribe(
      (res: any) => {
        if (res) {
          if (this.masterType === MasterDataType.QUESTION)
            this.questionsData.data = res;
          else this.masterData.data = res;
          this._spinner.hideSpinner();
        }
      },
      (error) => {
        console.log(error);
        this._spinner.hideSpinner();
      }
    );
  }

  openDialog(data: any = null): void {
    let dialogData = {
      action: MasterDataFormType.ADD,
      type: this.masterType,
      editData: null,
      masterType: this.masterType,
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
    if (this.masterType !== MasterDataType.QUESTION)
      formModel.masterDataType = this.masterType;
    this._spinner.showSpinner();
    let endPoint =
      this.masterType === this.MasterDataTypes.QUESTION
        ? APIEnum.CREATE_QUESTION
        : APIEnum.CREATE_MASTER;
    this._apiService.post(endPoint, formModel, id).subscribe(
      (res: any) => {
        if (res) {
          this.fetchMasterList();
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
    let endPoint =
      this.masterType === this.MasterDataTypes.QUESTION
        ? APIEnum.CREATE_QUESTION
        : APIEnum.CREATE_MASTER;
    this._apiService.delete(endPoint + `/${id}`).subscribe(
      (res: any) => {
        if (res) {
          this.fetchMasterList();
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
