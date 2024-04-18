import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import {LocalStorageService} from "src/app/view/auth/services/localStorage/local-storage.service"
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-all-quote-list',
  templateUrl: './all-quote-list.component.html',
  styleUrls: ['./all-quote-list.component.css'],
})
export class AllQuoteListComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService()
  appTitle = 'All Quotes';
  quotes: any = []
  user_id: number = 0
  

  constructor(
    private title: Title,
    private quoteService: QuoteService,
    private localStorageService: LocalStorageService,
    ) {}

  ngOnInit(): void {
    let token = this.localStorageService.getParsedValue("token")
    let accessToken = this.jwtHelper.decodeToken(token.access)
    this.user_id = accessToken.user_id
    //
    this.title.setTitle(this.appTitle);
    //
    this.getAllQuoteList();
  }

  getAllQuoteList() {
    this.quoteService.getAllQuoteList().subscribe({
      next: (res: any) => {
        this.quotes = res.results
        console.log({ res });
        // alert(res.toString());
      },
      error: (err: any) => {
        // alert(err.toString());
        let errr = err.toString();
        //alert(errr)
        console.log({ errr });
      },
    });
  }
}
