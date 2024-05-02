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
    params = params.append('ordering', '-id');
    if(data?.user){
      params = params.append('user', data?.user);
    }
    return this.http.get<any>(`${this.API_URL}quotes/`,{ params });
  }
  
  createQuote(data: any){
    return this.http.post<any>(`${this.API_URL}quotes/`, data);
  }
  
  updateQuote(quote: any){
    return this.http.patch<any>(`${this.API_URL}quotes/${quote.id!}/`,quote);
  }
  
  deleteQuote(quote: any){
    return this.http.delete<any>(`${this.API_URL}quotes/${quote.id!}/`);
  }
  
  getAllCategory(){
    let params = new HttpParams();
    return this.http.get<any>(`${this.API_URL}quotes/categories/`,{ params });
  }
  
}
