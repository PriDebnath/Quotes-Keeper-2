import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private API_URL: string = environment.APIEndpoint
  constructor(private http: HttpClient) {}

  
  getAllQuoteList(){
    return this.http.get<any>(`${this.API_URL}quotes/`);
  }

}
