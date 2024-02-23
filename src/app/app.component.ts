import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomeComponent } from './home/home.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, filter, map, shareReplay } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NavItemsContant } from './common/constant/NavItemsConstant';
import { NavLinksModel } from './common/models/NavLinkModel';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerService } from './services/spinner/spinner.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from './services/api/api.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NxWelcomeComponent,
    RouterModule,
    HomeComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    AsyncPipe,
    MatMenuModule,
    MatProgressSpinnerModule  
  ],
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
