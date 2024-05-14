import { Component, OnInit,OnChanges} from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import {LocalStorageService} from "src/app/module/auth/services/localStorage/local-storage.service"
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
  loading: boolean = false
  quotes: any = []
  user_id: number = 0
  nums = of(1,2,3)

  constructor(
    private title: Title,
    private quoteService: QuoteService,
    private localStorageService: LocalStorageService,
    ) {  }

  ngOnInit(): void {
    let token = this.localStorageService.getParsedValue("token")
    let accessToken = this.jwtHelper.decodeToken(token?.access!)
    this.user_id = accessToken?.user_id!
    //
    this.title.setTitle(this.appTitle);
    //
    this.getAllQuoteList();
    //
    this.practicing()
  }



  getAllQuoteList(){
    this.loading = true
    this.quoteService.getAllQuoteList().subscribe({
      next: (res: any) => {
        this.quotes = res.results
        this.loading = false
      },
      error: (err: any) => {
        this.loading = false
        console.log({ err });
      },
    });
  }
  
  
  practicing(){
    // ignore this start -->
    this.nums.subscribe((val)=>{
      console.log({val})
    })
    
    let newNumsMapped = this.nums.pipe(map((v)=>v +2))
    newNumsMapped.subscribe((valMapped)=>{
      console.log({valMapped})
    })
    
    let filteredNums = this.nums.pipe(filter((v)=>{
      return v > 1
    }))
    filteredNums.subscribe((filterVal)=>{
      console.log({filterVal})
    })
    // ignore this end -->
    
    
 
  }
}
