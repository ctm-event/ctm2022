import { Injectable } from '@angular/core';
import { MD5 } from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userDataKey: string = 'userData';

  authenticate(password: string): boolean {
    const hashString = MD5(password).toString();

    if (this.checkPasswordHashString(hashString)) {
      this.storeUserData(hashString);
      return true;
    }

    return false;
  }

  logOut(): void {
    this.clearUserData(this.userDataKey);
  }

  isLoggedIn(): boolean {
    const userData = localStorage.getItem(this.userDataKey) || '';
    return this.checkPasswordHashString(userData);
  }

  private checkPasswordHashString(passwordHashString: string): boolean {
    return passwordHashString === environment.nasaCode;
  }

  private storeUserData(userData: string) {
    localStorage.setItem(this.userDataKey, userData);
  }

  private clearUserData(key: string) {
    localStorage.removeItem(this.userDataKey);
  }
}
