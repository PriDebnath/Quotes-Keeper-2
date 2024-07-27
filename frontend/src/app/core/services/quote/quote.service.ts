import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Quote } from 'src/app/models/quote.model';
import { ResponseObject } from 'src/app/models/responseObject.model';
@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private API_URL: string = environment.APIEndpoint;

  constructor(private http: HttpClient) {}

  getAllQuoteList(data?: { user?: number; search?: string }) {
    let params = new HttpParams();
    params = params.append('ordering', '-id');
    if (data?.user) {
      params = params.append('user', data?.user);
    }
    if (data?.search) {
      params = params.append('search', data?.search);
    }
    return this.http.get<ResponseObject>(`${this.API_URL}quotes/`, { params });
  }

  createQuote(data: Quote) {
    return this.http.post<Quote>(`${this.API_URL}quotes/`, data);
  }

  updateQuote(quote: Quote) {
    return this.http.patch<Quote>(`${this.API_URL}quotes/${quote.id!}/`, quote);
  }

  deleteQuote(quote: Quote) {
    return this.http.delete<Quote>(`${this.API_URL}quotes/${quote.id!}/`);
  }

  getAllCategory() {
    let params = new HttpParams();
    return this.http.get<ResponseObject>(`${this.API_URL}quotes/categories/`, {
      params,
    });
  }
}
