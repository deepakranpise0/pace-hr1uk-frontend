import { Route } from '@angular/router';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { MasterDataComponent } from './master-data/master-data.component';

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
  {
    path: 'master/:type',
    component: MasterDataComponent,
    pathMatch: 'full',
  },
];
