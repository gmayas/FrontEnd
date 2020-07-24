import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated().getValue()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated().getValue()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
