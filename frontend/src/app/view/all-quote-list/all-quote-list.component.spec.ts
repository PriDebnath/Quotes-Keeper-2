import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuoteListComponent } from './all-quote-list.component';

describe('AllQuoteListComponent', () => {
  let component: AllQuoteListComponent;
  let fixture: ComponentFixture<AllQuoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllQuoteListComponent]
    });
    fixture = TestBed.createComponent(AllQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
