import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Quote, Category } from 'src/app/models/quote.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseObject } from 'src/app/models/responseObject.model';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/services/response-error-handler/response-error-handler.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-quote-form-modal',
  templateUrl: './quote-form-modal.component.html',
  styleUrls: ['./quote-form-modal.component.css'],
  standalone: false
})
export class QuoteFormModalComponent implements OnInit {
  quoteForm!: FormGroup;
  inputValue: string = '';
  allCategory: Category[] = [];
  allSelectedCategory: Category[] = [];

  @Input() editQuoteData: Quote = {};

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private activeModal: NgbActiveModal,
    private notification: NotificationService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.quoteForm = this.getQuoteForm();
    this.getAllCategory();
    // Handle edit mode
    if (this.editQuoteData) {
      this.quoteForm.patchValue(this.editQuoteData);
      let categoryList = this.editQuoteData?.categories!;
      categoryList = categoryList.map((category: any) => {
        return category.category;
      });
      this.allSelectedCategory = categoryList;
      //alert(JSON.stringify(this.editQuoteData))
      //alert(JSON.stringify(this.allSelectedCategory))
    }
  }

  closeModal() {
    this.activeModal.close('Cross click');
  }

  getQuoteForm() {
    return this.formBuilder.group({
      text: ['', Validators.required],
      //categories: [[{ 'name': 'cat'}]],
    });
  }

  addToSelectedCategory(category: Category) {
    let localVariable = this.allSelectedCategory;
    localVariable.push(category);
    this.allSelectedCategory = localVariable;
    this.inputValue = '';
  }

  removeFromSelectedCategory(clickedCategory: Category) {
    let localVariable = this.allSelectedCategory;
    localVariable = localVariable.filter((category: Category) => {
      return clickedCategory.name !== category.name;
    });
    this.allSelectedCategory = localVariable;
  }

  getAllCategory() {
    this.quoteService.getAllCategory().subscribe({
      next: (res: ResponseObject) => {
        this.allCategory = res.results!;
      },
      error: (err: any) => {
      },
    });
  }

  onQuoteFormSubmit() {
    let quote: Quote = {
      ...this.quoteForm.value,
      category_list: this.allSelectedCategory,
    };
    if (this.editQuoteData) {
      this.updateQuote({
        ...this.editQuoteData,
        ...quote,
      });
    } else {
      this.createQuote(quote);
    }
  }

  createQuote(quote: Quote) {
    this.quoteService.createQuote(quote).subscribe({
      next: (res: Quote) => {
        this.notification.success('Quote Created Successfully');
        this.activeModal.close('Added quote');
      },
      error: (err: any) => {
      },
    });
  }

  updateQuote(quote: Quote) {
    this.quoteService.updateQuote(quote).subscribe({
      next: (res: Quote) => {
        this.notification.success('Quote Updated Successfully');
        this.activeModal.close('Added quote');
      },
      error: (err: any) => {
      },
    });
  }
}
