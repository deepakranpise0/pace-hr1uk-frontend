import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterDataFormType, MasterDataType } from '../common/enum/AppEnum';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api/api.service';
import { APIEnum } from '../common/enum/APIEnum';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPopupComponent } from '../dialog/add-edit-popup/add-edit-popup.component';
import { FormBuilder, Validators } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
];
@Component({
  selector: 'pace-hr1-uk-frontend-master-data',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.css',
})
export class MasterDataComponent implements OnInit {
  public masterType!: MasterDataType;
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog // private _apiService: ApiService,
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
        // this.fetchMasterList(this.masterType);
      } else {
        // Invalid type, navigate back to home
        this.router.navigate(['/']);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // private fetchMasterList(masterType: MasterDataType) {
  //   this._apiService.get(APIEnum.GET_MASTER + masterType).subscribe(
  //     (res: any) => {
  //       if (res && res.status) {
  //         console.log(res.message);
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditPopupComponent, {
      data: { action: MasterDataFormType.ADD, type: this.masterType },
      width: '600px', // Set width to 600 pixels
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
