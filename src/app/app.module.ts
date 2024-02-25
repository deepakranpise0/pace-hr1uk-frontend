import {
  AsyncPipe,
  CommonModule,
} from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  StarRatingConfigService,
  StarRatingModule,
} from 'angular-star-rating';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.modules';
import { AuthInterceptor } from './auth-interceptor.service';
import {
  AddEditPopupComponent,
} from './dialog/add-edit-popup/add-edit-popup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        AddEditPopupComponent,
        RatingComponent,
        MasterDataComponent
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      CommonModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatInputModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatFormFieldModule,
      MatMenuModule,
      BrowserAnimationsModule,
      MatProgressSpinnerModule,
      MatPaginatorModule,
      AsyncPipe,
      ReactiveFormsModule,
      MatDividerModule,
      MatTableModule,
      HttpClientModule,
      MatGridListModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatProgressBarModule,
      StarRatingModule
  ],
  providers: [
    StarRatingConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }