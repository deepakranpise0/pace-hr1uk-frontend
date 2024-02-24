import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';

import {
  filter,
  map,
  Observable,
  shareReplay,
} from 'rxjs';

import { NavItemsContant } from './common/constant/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinkModel';
import { ApiService } from './services/api/api.service';
import { SpinnerService } from './services/spinner/spinner.service';

@Component({
  selector: 'pace-hr1-uk-frontend-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'pace-hr1-uk-frontend';
  public activeIndex: number = 0;
  private breakpointObserver = inject(BreakpointObserver);

  public navItems: NavLinksModel[] = NavItemsContant.filter((a)=>a.roles===this.authService.getUserRole());

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private router: Router, public _spinner: SpinnerService,public authService:ApiService) {}
  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event: any): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.activeIndex = this.navItems.findIndex((item) =>
          event.url.includes(item.url)
        );
      });
  }

  logout() { 
    this.authService.logout();
  }
}
