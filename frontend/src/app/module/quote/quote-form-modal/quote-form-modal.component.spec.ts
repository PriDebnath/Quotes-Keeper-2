import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteFormModalComponent } from './quote-form-modal.component';

describe('QuoteFormModalComponent', () => {
  let component: QuoteFormModalComponent;
  let fixture: ComponentFixture<QuoteFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteFormModalComponent]
    });
    fixture = TestBed.createComponent(QuoteFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
