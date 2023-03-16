import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private notification : NzNotificationService){};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    let isLoggedIn = this.loginService.isAuthenticated();
    if (isLoggedIn){
      return true
    } else {
      this.notification.error(
        'Login first',
        'Access denied for not logged in user.'
      );
      this.router.navigate(['/admin/login']);
      return false;
    }
  }

}
