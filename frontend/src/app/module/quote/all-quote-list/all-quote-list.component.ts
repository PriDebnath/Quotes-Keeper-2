import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, interval, throwError, combineLatest, forkJoin } from 'rxjs';
import {
  map,
  filter,
  take,
  catchError,
  mergeMap,
  retry,
  finalize,
} from 'rxjs/operators';
import { Quote } from 'src/app/models/quote.model';
import { ResponseObject } from 'src/app/models/responseObject.model';

@Component({
  selector: 'app-all-quote-list',
  templateUrl: './all-quote-list.component.html',
  styleUrls: ['./all-quote-list.component.css'],
})
export class AllQuoteListComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  appTitle = 'All Quotes';
  loading: boolean = false;
  quotes: Quote[] = [];
  user_id: number = 0;
  //
  searchString: string = '';
  searchIntervalId: any;
  micListening: boolean = false;
  nums = of(1, 2, 3);

  constructor(
    private title: Title,
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let token = this.localStorageService.getParsedValue('token');
    let accessToken = this.jwtHelper.decodeToken(token?.access!);
    this.user_id = accessToken?.user_id!;
    //
    this.title.setTitle(this.appTitle);
    //
    this.getAllQuoteList();
    //
    // this.practicing();
  }

  getAllQuoteList(data?: { user?: number; search?: string }) {
    this.loading = true;
    this.quoteService.getAllQuoteList({ ...data }).subscribe({
      next: (res: ResponseObject) => {
        console.log({ res });

        this.quotes = res.results as Quote[];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.loading = false;
        this.cdr.detectChanges();

        console.log({ err });
      },
    });
  }

  handleMicClick() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      (window as any).mozSpeechRecognition ||
      (window as any).msSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      this.micListening = true;
      this.cdr.detectChanges();
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      let searchString = this.searchString + ' ' + transcript;
      this.searchString = searchString;
      this.cdr.detectChanges();
      console.log(this.searchString);
      //
      this.getAllQuoteList({ search: this.searchString });
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'not-allowed') {
        let warning =
          'Microphone access denied. Please allow microphone access.';
        alert(warning);
      } else {
        let warning = `Error occurred: ${event.error}`;
        alert(warning);
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recognition.start();
        recognition.onend = () => {
          this.micListening = false;
          this.cdr.detectChanges();

          stream.getTracks().forEach((track) => track.stop()); // Stop all tracks in the stream // Stop listening
        };
      })
      .catch((err) => {
        let warning =
          'Microphone access denied. Please allow microphone access.';
        alert(warning);
      });
  }

  handleSearchChange(event: Event) {
    // this.isSearchBar = true;
    clearInterval(this.searchIntervalId);
    this.searchIntervalId = setTimeout(() => {
      const inputElement = event.target as HTMLInputElement;
      this.getAllQuoteList({ search: inputElement.value });
    }, 700);
  }

  practicing() {
    // ignore this start -->
    this.nums.subscribe((val) => {
      console.log({ val });
    });

    let newNumsMapped = this.nums.pipe(map((v) => v + 2));
    newNumsMapped.subscribe((valMapped) => {
      console.log({ valMapped });
    });

    let filteredNums = this.nums.pipe(
      filter((v) => {
        return v > 1;
      })
    );
    filteredNums.subscribe((filterVal) => {
      console.log({ filterVal });
    });
    // ignore this end -->
  }
}
