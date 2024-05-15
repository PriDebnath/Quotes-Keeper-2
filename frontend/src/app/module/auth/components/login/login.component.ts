// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/module/auth/services/auth/auth.service';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isHidePassword: boolean = true;
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.onLogin();
    } else {
      alert('Form is invalid');
    }
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.localStorageService.saveKeyValue('token', response); // save token in local storage
        this.router.navigateByUrl('/all-quote-list');
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }

  goToLoginPage() {
    this.router.navigateByUrl('/auth/login');
  }
  
  goToRegistrationPage() {
    this.router.navigateByUrl('/auth/registration');
  }
}
