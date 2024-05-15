import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-quote-form-modal',
  templateUrl: './quote-form-modal.component.html',
  styleUrls: ['./quote-form-modal.component.css'],
})
export class QuoteFormModalComponent implements OnInit {
  quoteForm!: FormGroup;
  inputValue: any;
  allCategory: any;
  allSelectedCategory: any[] = [];

  @Input() editQuoteData: any;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.quoteForm = this.getQuoteForm();
    this.getAllCategory();
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
      //categories: [[{ 'name': 'catt'}]],
    });
  }

  addToSelectedCategory(data: { name: string; id?: number }) {
    let localVariable = this.allSelectedCategory;
    localVariable.push(data);
    this.allSelectedCategory = localVariable;
    this.inputValue = '';
  }

  removeFromSelectedCategory(clickedCategory: any) {
    let localVariable = this.allSelectedCategory;
    localVariable = localVariable.filter((category) => {
      if (clickedCategory.name != category.name) {
        return category;
      }
    });
    this.allSelectedCategory = localVariable;
  }

  getAllCategory() {
    this.quoteService.getAllCategory().subscribe({
      next: (res: any) => {
        this.allCategory = res.results;
      },
      error: (err: any) => {
        alert(JSON.stringify(err));
      },
    });
  }

  onQuoteFormSubmit() {
    let quote = {
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

  createQuote(quote: any) {
    this.quoteService.createQuote(quote).subscribe({
      next: (res: any) => {
        alert('Quote Created Successfully');
        this.activeModal.close('Added quote');
      },
      error: (err: any) => {
        alert(JSON.stringify(err));
      },
    });
  }
  updateQuote(quote: any) {
    this.quoteService.updateQuote(quote).subscribe({
      next: (res: any) => {
        alert('Quote Updated Successfully');
        this.activeModal.close('Added quote');
      },
      error: (err: any) => {
        alert(JSON.stringify(err));
      },
    });
  }
}
