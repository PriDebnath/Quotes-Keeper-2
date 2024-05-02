import { Component,Input, Output,EventEmitter} from '@angular/core';

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

handleDelete(){
  this.deleteQuote.emit(this.quote)
}

handleEdit(){
  this.editQuote.emit(this.quote)
}
}
