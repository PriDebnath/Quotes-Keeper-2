import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

constructor(
  private router: Router
){}

goToLoginPage(){this.router.navigateByUrl('/auth/login')}
goToRegistrationPage(){this.router.navigateByUrl('/auth/registration')}
}
