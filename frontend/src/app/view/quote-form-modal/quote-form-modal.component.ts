import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms"
import { QuoteService } from 'src/app/core/services/quote/quote.service';


@Component({
  selector: 'app-quote-form-modal',
  templateUrl: './quote-form-modal.component.html',
  styleUrls: ['./quote-form-modal.component.css']
})
export class QuoteFormModalComponent implements OnInit{

  quoteForm! : FormGroup
  
  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private activeModal: NgbActiveModal,
  ){}
  
  ngOnInit(){
    this.quoteForm = this.getQuoteForm()
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
  
onQuoteFormSubmit(){
  this.createQuote(this.quoteForm.value)

  console.log(JSON.stringify(this.quoteForm.value))
}

createQuote(quote: any){
  this.quoteService.createQuote(quote).subscribe({
      next: (res: any) => {
        alert(JSON.stringify(res))
      },
      error: (err: any) => {
        alert(JSON.stringify(err))
      },
    });
}
}
