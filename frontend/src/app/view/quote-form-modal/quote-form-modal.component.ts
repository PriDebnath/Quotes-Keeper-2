import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms"
import { QuoteService } from 'src/app/core/services/quote/quote.service';
import { Component, ElementRef, ViewChild,OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';



@Component({
  selector: 'app-quote-form-modal',
  templateUrl: './quote-form-modal.component.html',
  styleUrls: ['./quote-form-modal.component.css']
})
export class QuoteFormModalComponent implements OnInit{

  quoteForm! : FormGroup
  allCategory: any 
  inputValue: any 
  allSelectedCategory: any[]  = []

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private activeModal: NgbActiveModal,
  ){}
  
  ngOnInit(){
    this.quoteForm = this.getQuoteForm()
    this.getAllCategory()
  }

  closeModal() {
    this.activeModal.close('Cross click');
  }

  getQuoteForm(){
    return this.formBuilder.group({
      text: [""],
      //categories: [[{ 'name': 'catt'}]],
    })
  }
  
  addToSelectedCategory(data:{name:string; id?:number}){
    let localVariable = this.allSelectedCategory
    localVariable.push(data)
    this.allSelectedCategory = localVariable
    this.inputValue = ""
  }
  
getAllCategory(){
this.quoteService.getAllCategory().subscribe({
      next: (res: any) => {
        this.allCategory = res.results
      },
      error: (err: any) => {
        console.log({ err });
      },
    });
}
  
onQuoteFormSubmit(){
  let quote = {
    ...this.quoteForm.value,
    category_list: this.allSelectedCategory,
  }
  this.createQuote(quote)
}

createQuote(quote: any){
  this.quoteService.createQuote(quote).subscribe({
      next: (res: any) => {
      this.activeModal.close('Added quote');
      },
      error: (err: any) => {
        console.log({err})
      },
    });
  }
  
}







