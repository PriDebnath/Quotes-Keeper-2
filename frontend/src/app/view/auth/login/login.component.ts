// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "src/app/view/auth/services/auth/auth.service"
import {LocalStorageService} from "src/app/view/auth/services/localStorage/local-storage.service"
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic
      this.onLogin()
      console.log(this.loginForm.value);
    } else {
      // Display validation errors
      console.log('Form is invalid');
    }
  }
  
onLogin() {
    this.authService.login(this.loginForm.value)
      .subscribe(
        response => {
          // Handle successful login response
          console.log('Login successful', response)
          alert (JSON.stringify(response))
          this.localStorageService.saveKeyValue("token",response) // save token in local storage
          this.router.navigateByUrl('/')
           
          
        },
        error => {
          alert (JSON.stringify(error))
          // Handle login error
          console.error('Login error', error);
        }
      );
  }
}
