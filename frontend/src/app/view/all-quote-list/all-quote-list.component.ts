import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-quote-list',
  templateUrl: './all-quote-list.component.html',
  styleUrls: ['./all-quote-list.component.css'],
})
export class AllQuoteListComponent implements OnInit {
  appTitle = 'All Quotes';
  quotes: any = []
  constructor(private title: Title, private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.title.setTitle(this.appTitle);

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
