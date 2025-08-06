// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/module/auth/services/auth/auth.service';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ErrorHandlerService } from 'src/app/core/services/response-error-handler/response-error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  logging: boolean = false;
  isHidePassword: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService,
    private localStorageService: LocalStorageService
  ) { }

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
      this.notification.info('Form is invalid');
    }
  }

  onLogin() {
    this.logging = true;
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.notification.success("Login successfull")
        this.localStorageService.saveKeyValue('token', response); // save token in local storage
        this.router.navigateByUrl('/all-quote-list');
        this.logging = false;
      },
      (error) => {
        console.log({error});
        this.errorHandler.errorHandler(error);  
        this.logging = false;
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
