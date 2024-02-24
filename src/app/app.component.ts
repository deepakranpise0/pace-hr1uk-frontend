import { Component, Inject, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, filter, map, shareReplay } from 'rxjs';
import { NavItemsContant } from './common/constant/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinkModel';
import { SpinnerService } from './services/spinner/spinner.service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'pace-hr1-uk-frontend-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'pace-hr1-uk-frontend';
  public activeIndex: number = 0;
  private breakpointObserver = inject(BreakpointObserver);

  public navItems: NavLinksModel[] = NavItemsContant;

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
}
