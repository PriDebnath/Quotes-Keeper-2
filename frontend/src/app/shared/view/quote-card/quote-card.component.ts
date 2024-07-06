import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { Quote } from 'src/app/models/quote.model';

@Component({
  selector: 'app-quote-card',
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.css'],
})
export class QuoteCardComponent {
  @Input() quote: Quote = {};
  @Input() myQuote: boolean = false;
  @Input() canChange: boolean = false;
  @Output() deleteQuote: EventEmitter<Quote> = new EventEmitter<Quote>();
  @Output() editQuote: EventEmitter<Quote> = new EventEmitter<Quote>();

  constructor() {}

  handleDelete() {
    this.deleteQuote.emit(this.quote);
  }

  handleEdit() {
    this.editQuote.emit(this.quote);
  }
}
