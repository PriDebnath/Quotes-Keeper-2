import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import {LocalStorageService} from "src/app/view/auth/services/localStorage/local-storage.service"
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, interval, throwError, combineLatest,forkJoin} from 'rxjs';
import { map, filter, take, catchError, mergeMap, retry, finalize } from 'rxjs/operators';




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
    let accessToken = this.jwtHelper.decodeToken(token?.access!)
    this.user_id = accessToken?.user_id!
    //
    this.title.setTitle(this.appTitle);
    //
    this.getAllQuoteList();
    
    
const source1$ = of(1, 2, 3, 6);
const observable2$ = of('World');

console.log({source1$})
console.log({observable2$})
forkJoin({
  message1: source1$,
  message2: observable2$
}).subscribe({
  next: result => console.log(result), // Output: { message1: 'Hello', message2: 'World' }
  complete: () => console.log('All observables completed')
});

  }

  getAllQuoteList() {
    this.quoteService.getAllQuoteList().subscribe({
      next: (res: any) => {
        this.quotes = res.results
      },
      error: (err: any) => {
        console.log({ err });
      },
    });
  }
}
