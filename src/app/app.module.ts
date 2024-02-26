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
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.modules';
import { AuthInterceptor } from './auth-interceptor.service';
import { AddEditDialogModule } from './dialog/dialog.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RatingModule } from './rating/rating.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    LoginModule,
    RatingModule,
    AddEditDialogModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }