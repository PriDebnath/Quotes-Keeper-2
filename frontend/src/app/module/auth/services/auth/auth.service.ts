import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string = environment.APIEndpoint;

  constructor(private http: HttpClient) {}

  login(data: User) {
    return this.http.post<User>(this.API_URL + 'accounts/auth/login/', data);
  }

  register(data: User) {
    return this.http.post<User>(this.API_URL + 'accounts/registration/', data);
  }

  refreshToken(token: string) {
    return this.http.post<User>(this.API_URL + 'auth/refresh/', { token });
  }

  getUser(data?: { user_id?: number }) {
    return this.http.get<User>(
      this.API_URL + 'accounts/users/' + data?.user_id! + '/'
    );
  }
}
