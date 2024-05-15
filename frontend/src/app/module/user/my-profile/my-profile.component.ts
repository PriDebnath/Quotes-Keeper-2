import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/auth/services/auth/auth.service';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  user_id: number = 0;
  user: any = {};
  appTitle = 'Me';

  constructor(
    private title: Title,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let token = this.localStorageService.getParsedValue('token');
    if (token) {
      let accessToken = this.jwtHelper.decodeToken(token.access);
      this.user_id = accessToken.user_id;
    }
    if (this.user_id) {
      this.getUser(this.user_id);
    }
    this.title.setTitle(this.appTitle);
  }

  getUser(user_id?: number) {
    this.authService.getUser({ user_id: this.user_id }).subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.log({ err });
      },
    });
  }

  goToLoginPage() {
    this.router.navigateByUrl('/auth/login');
  }

  goToRegistrationPage() {
    this.router.navigateByUrl('/auth/registration');
  }
}
