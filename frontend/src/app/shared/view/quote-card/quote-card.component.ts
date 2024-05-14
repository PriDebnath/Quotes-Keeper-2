import { Component,Input, Output,SimpleChanges,EventEmitter,  OnChanges,OnInit,DoCheck,AfterContentInit, AfterContentChecked,AfterViewInit, AfterViewChecked,OnDestroy} from '@angular/core';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css']
})
export class QuoteCardComponent {
@Input() quote: any = {}
@Input() myQuote: boolean = false
@Input() canChange: boolean = false
@Output() deleteQuote: EventEmitter<any> = new EventEmitter<any>();
@Output() editQuote: EventEmitter<any> = new EventEmitter<any>();

constructor() {
}

handleDelete(){
  this.deleteQuote.emit(this.quote)
}

handleEdit(){
  this.editQuote.emit(this.quote)
}

}
 