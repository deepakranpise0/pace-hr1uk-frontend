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
  public masterDataList!: MasterDataList[];
  public action = MasterDataFormType.ADD;
  displayedColumns: string[] = ['no', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource<MasterDataList>();

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
        this.fetchMasterList();
      } else {
        // Invalid type, navigate back to home
        this.router.navigate(['/']);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getTitle(): string {
    return this.masterType === MasterDataType.ASSESSMENT_TYPE
      ? AppConstant.Assessment_Type
      : this.masterType;
  }

  private fetchMasterList() {
    this._spinner.showSpinner();
    this._apiService.get(APIEnum.GET_MASTER + this.masterType).subscribe(
      (res: any) => {
        if (res) {
          this.dataSource.data = res;
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
    };
    if (data) {
      dialogData.action = MasterDataFormType.UPDATE;
      dialogData = { ...dialogData, ...data };
    }
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      data: dialogData,
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((formModel) => {
      this.handleDialogSubmit(formModel);
    });
  }

  public handleDialogSubmit(formModel: MasterDataModel) {
    formModel.masterDataType = this.masterType;
    const apiMethod =
      this.action === MasterDataFormType.ADD ? 'post' : 'update';
    this._spinner.showSpinner();
    (this._apiService as any)
      [apiMethod](APIEnum.CREATE_MASTER, formModel)
      .subscribe(
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
    this.openDialog(data);
  }

  public deleteData(data: MasterDataModel) {}
}
