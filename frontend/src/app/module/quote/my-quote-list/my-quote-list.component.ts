import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyProfileComponent } from 'src/app/module/user/my-profile/my-profile.component';
import { QuoteFormModalComponent } from 'src/app/module/quote/quote-form-modal/quote-form-modal.component';
import { LocalStorageService } from 'src/app/module/auth/services/localStorage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of, interval, throwError, combineLatest } from 'rxjs';
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
  selector: 'app-my-quote-list',
  templateUrl: './my-quote-list.component.html',
  styleUrls: ['./my-quote-list.component.css'],
})
export class MyQuoteListComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService();
  appTitle = 'My Quotes';
  isAddEdit = false;
  quotes: Quote[] = [];
  user_id: number = 0;
  loading: boolean = false;

  constructor(
    private title: Title,
    private ngbModal: NgbModal,
    private quoteService: QuoteService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let token = this.localStorageService.getParsedValue('token');
    let accessToken = this.jwtHelper.decodeToken(token?.access!);
    this.user_id = accessToken?.user_id!;
    //
    if (this.user_id) {
      this.getAllQuoteList({ user_id: this.user_id! });
    }
    this.title.setTitle(this.appTitle);
  }

  getAllQuoteList(data?: { user_id?: number }) {
    this.loading = true;
    this.quoteService.getAllQuoteList({ user: this.user_id! }).subscribe({
      next: (res: ResponseObject) => {
        this.loading = false;
        this.quotes = res.results as Quote[];
      },
      error: (err) => {
        this.loading = false;
        alert(JSON.stringify(err));
      },
    });
  }

  changeIsAddEdit() {
    this.isAddEdit = !this.isAddEdit;
    // this.openModal();
  }

  openModal(editQuoteData?: Quote) {
    const modalRef = this.ngbModal.open(QuoteFormModalComponent);
    modalRef.componentInstance.editQuoteData = editQuoteData!;

    modalRef.result.then(
      (result) => {
        if (result == 'Cross click') {
          this.isAddEdit = false;
        }
        if (result == 'Added quote') {
          this.getAllQuoteList({ user_id: this.user_id! });
          this.isAddEdit = false;
        }
      },
      (reason) => {
        if (reason == 0) {
          this.isAddEdit = false;
        }
      }
    );
  }

  handleDelete(quote: Quote) {
    this.quoteService.deleteQuote(quote).subscribe({
      next: (res: Quote) => {
        this.getAllQuoteList({ user_id: this.user_id! });
        alert('Quote Deleted Successfully');
      },
      error: (err: any) => {
        alert(JSON.stringify(err));
      },
    });
  }
  handleEdit(quote: Quote) {
    this.quoteService.updateQuote(quote).subscribe({
      next: (res: Quote) => {
        this.getAllQuoteList({ user_id: this.user_id! });
        alert('Quote Updated Successfully');
      },
      error: (err: any) => {
        alert(JSON.stringify(err));
      },
    });
  }
}
