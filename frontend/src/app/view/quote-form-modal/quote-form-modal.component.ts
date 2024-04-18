import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from "@angular/forms"
@Component({
  selector: 'app-quote-form-modal',
  templateUrl: './quote-form-modal.component.html',
  styleUrls: ['./quote-form-modal.component.css']
})
export class QuoteFormModalComponent implements OnInit{

  quoteForm! : FormGroup
  
  constructor(
    private formBuilder: FormBuilder,
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
      text: [""]
    })
  }
  
onQuoteFormSubmit(){
  alert(JSON.stringify(this.quoteForm.value))
}
}
