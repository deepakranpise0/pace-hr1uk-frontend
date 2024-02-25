import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard] },
  { path: 'master/:type',
    loadChildren: () => import('./master-data/master-data.module').then(m => m.MaserDataModule),
    canActivate: [AuthGuard] },
  { path: 'ratings',
    loadChildren: () => import('./rating/rating.module').then(m => m.RatingModule),
    canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

