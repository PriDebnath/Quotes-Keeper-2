import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private API_URL: string = environment.APIEndpoint
  constructor(private http: HttpClient) {}

  
  getAllQuoteList(data?:{user?: any}){
    let params = new HttpParams();
    if(data?.user){
      params = params.append('user', data?.user);
    }
    return this.http.get<any>(`${this.API_URL}quotes/`,{ params });
  }
  
  createQuote(data: any){
    return this.http.post<any>(`${this.API_URL}quotes/`, data);
  }
  
  getAllCategory(){
    let params = new HttpParams();
   // if(data?.user){
     // params = params.append('user', data?.user);
   // }
    return this.http.get<any>(`${this.API_URL}quotes/categories/`,{ params });
  }
  
}
