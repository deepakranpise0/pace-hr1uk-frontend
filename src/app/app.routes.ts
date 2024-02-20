import { Route } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'ratings',
    component: RatingComponent,
    pathMatch: 'full',
  },
];
