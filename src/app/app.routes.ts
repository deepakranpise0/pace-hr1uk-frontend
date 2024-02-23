import { Route } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Route[] = [
   {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  {
    path: 'ratings',
    component: RatingComponent,
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  {
    path: 'master/:type',
    component: MasterDataComponent,
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
];
