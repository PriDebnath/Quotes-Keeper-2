import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError,throwError} from 'rxjs';
import {LocalStorageService} from "src/app/view/auth/services/localStorage/local-storage.service"
import { Router } from '@angular/router';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localStorageService.getParsedValue("token")
    let actualRequest = request
    let modifiedRequest = this.addToken(actualRequest, token.access)
    return next.handle(modifiedRequest).pipe(
        catchError((err) => {
            if (err.status === 401) {
               this.router.navigateByUrl('/auth/login')
               return throwError(err)
            }
            this.router.navigateByUrl('/auth/login')
            return throwError(err)
        }))
  }
  
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ 
      setHeaders: { Authorization: 'Bearer ' + token } 
    });
  }

}
