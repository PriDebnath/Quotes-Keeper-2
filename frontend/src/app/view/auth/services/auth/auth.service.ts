import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL: string = environment.APIEndpoint
  constructor(private http: HttpClient) {}

  
  
  login(data: any) {
    return this.http.post<any>(this.API_URL + 'accounts/auth/login/', data);
  }
  
  register(data: any) {
    return this.http.post<any>(this.API_URL + 'accounts/registration/', data);
  }

  refreshToken(token: string) {
    return this.http.post<any>(this.API_URL + 'auth/refresh/', { token });
  }
}
