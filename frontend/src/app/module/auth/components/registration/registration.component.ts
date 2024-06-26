import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/module/auth/services/auth/auth.service';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  isHidePassword: boolean = true;
  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

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
      alert('Form is invalid');
    }
  }

  register() {
    this.authService.register(this.registrationForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/auth/login');
      },
      (error) => {
        console.error('RegistrationForm error', error);
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
