import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  inject,
} from '@angular/core';

import { map } from 'rxjs/operators';

@Component({
  selector: 'pace-hr1-uk-frontend-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Interview's Done", cols: 1, rows: 1 },
          { title: "Interview Pending", cols: 1, rows: 1 },
          { title: 'User Interview Scheduled Weekly', cols: 1, rows: 1 },
          { title: 'User Interview Scheduled Monthly', cols: 1, rows: 1 }
        ];
      }

      return [
       { title: "Interview's Done", cols: 1, rows: 1 },
          { title: "Interview Pending", cols: 1, rows: 1 },
          { title: 'User Interview Scheduled Weekly', cols: 1, rows: 1 },
          { title: 'User Interview Scheduled Monthly', cols: 1, rows: 1 }
      ];
    })
  );
}
