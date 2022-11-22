import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean | Observable<boolean> {
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login']);
     return false;
  }
}
