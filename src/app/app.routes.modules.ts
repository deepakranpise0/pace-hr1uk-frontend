import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'master/:type',
    loadChildren: () =>
      import('./master-data/master-data.module').then((m) => m.MaserDataModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'ratings',
    loadChildren: () =>
      import('./rating/rating.module').then((m) => m.RatingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-template',
    loadChildren: () =>
      import('./interview-template/interview-template.module').then(
        (m) => m.InterviewTemplateModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'interview-feedback',
    loadChildren:()=>import('./interview-feedback/interview-feedback.module').then((m)=>m.InterviewTemplateModule)
  },
   {
    path: 'completed-interview',
    loadChildren: () =>
      import('./completed-interview/completed-interview.module').then(
        (m) => m.CompletedInterviewModule
      ),
    canActivate: [AuthGuard],
  },
   {
    path: 'interviewers',
    loadChildren: () =>
      import('./interviewers/interviewers.module').then(
        (m) => m.InterviewersModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
