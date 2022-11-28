import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/animation/fade.animation';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMss: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initialize();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    if (this.authService.authenticate(this.loginForm.get('password')!.value)) {
      this.router.navigate(['/']);
      return;
    }

    this.errorMss = 'Invalid login information.';
  }

  private initialize() {
    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }
}
