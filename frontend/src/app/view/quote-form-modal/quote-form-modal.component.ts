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
  allSelectedCategory: any[]  = []
  inputValue: any 
  
  fruitCtrl = new FormControl();
  separatorKeysCodes: number[] = [13, 188]; // Enter and comma key codes
  fruits: string[] = ['Apple', 'Banana', 'Orange'];
  filteredFruits!: Observable<string[]> ;
allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
sFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private activeModal: NgbActiveModal,
  ){}
  
  ngOnInit(){
    this.quoteForm = this.getQuoteForm()
    this.getAllCategory()
    
this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.fruits.slice())
    );
    
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
    console.log(this.allSelectedCategory)
    console.log(this.inputValue)
   this.inputValue = ""
  }
  
getAllCategory(){
this.quoteService.getAllCategory().subscribe({
      next: (res: any) => {
        console.log({ res });
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
    categories: this.allSelectedCategory,
    category_list: this.allSelectedCategory,
    category: this.allSelectedCategory
  }
  this.createQuote(quote)

  console.log({quote})
}

createQuote(quote: any){
  this.quoteService.createQuote(quote).subscribe({
      next: (res: any) => {
        console.log({res})
        alert(JSON.stringify(res))
      },
      error: (err: any) => {
        console.log({err})
        alert(JSON.stringify(err))
      },
    });
}




  

  add(event: any): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  ss(event: any): void {
    console.log({event})
  }
  
  selected(event: any): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl?.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  
}







