import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "src/app/view/auth/services/auth/auth.service"
import {LocalStorageService} from "src/app/view/auth/services/localStorage/local-storage.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
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
      // Handle login logic
     this.register()
      console.log(this.registrationForm.value);
    } else {
      // Display validation errors
      console.log('Form is invalid');
    }
  }
  
register() {
    this.authService.register(this.registrationForm.value)
      .subscribe(
        response => {
          // Handle successful login response
          console.log('Registration successful', response)
          alert (JSON.stringify(response))
          //this.localStorageService.saveKeyValue("token",response) // save token in local storage
          this.router.navigateByUrl('/auth/login')
           
          
        },
        error => {
          alert (JSON.stringify(error))
          // Handle login error
          console.error('RegistrationForm error', error);
        }
      );
  }
  
}
