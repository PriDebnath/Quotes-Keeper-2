import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/module/auth/services/auth/auth.service';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { ErrorHandlerService } from 'src/app/core/services/response-error-handler/response-error-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: false
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  registering: boolean = false;
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
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.register();
    } else {
      // Display validation errors
      this.notification.info('Form is invalid');
    }
  }

  register() {
    this.registering = true;
    this.authService.register(this.registrationForm.value).subscribe(
      (response) => {
        this.notification.success("Registeration successfull")
        this.router.navigateByUrl('/auth/login');
        this.registering = false;
      },
      (error) => {
        this.registering = false;
        this.errorHandler.errorHandler(error);
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
