import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

import { ApiService } from './services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn) {
      return true;
    } else {
      // Redirect to the login page if the user is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
