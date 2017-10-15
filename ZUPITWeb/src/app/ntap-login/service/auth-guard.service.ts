import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// Import our authentication service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.authService.redirectUrl = state.url;

    // If user is not logged in we'll send them to the homepage 
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
