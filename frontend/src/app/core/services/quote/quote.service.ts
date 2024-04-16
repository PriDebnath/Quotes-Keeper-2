import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private API_URL: string = ""
  constructor(private http: HttpClient) {}

  
  getAllQuoteList(){
    return this.http.get<any>(`${this.API_URL}/courses/section/`);
  }

}
