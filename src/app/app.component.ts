import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import {
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'pace-hr1-uk-frontend';
  public activeIndex: number = 0;
  private breakpointObserver = inject(BreakpointObserver);
  public navItems: NavLinksModel[] = NavItemsContant.filter((a) => a.roles.includes(this._apiService.role));

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  isLoggedIn: any;
  isOpened:boolean=true;

  constructor(private router: Router, public _spinner: SpinnerService,public _apiService:ApiService) {}
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
    
    this._apiService.isLoggedIn.subscribe(value => { 
      this.isLoggedIn = value;
      this.navItems = NavItemsContant.filter((a) => a.roles.includes(this._apiService.role));

    });
  }

  logout() { 
    this._apiService.logout();
  }

  toggle() { 
    this.sidenav.toggle();
  }
}
