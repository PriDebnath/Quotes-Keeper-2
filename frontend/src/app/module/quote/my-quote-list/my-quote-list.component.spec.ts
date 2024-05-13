import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuoteListComponent } from './my-quote-list.component';

describe('MyQuoteListComponent', () => {
  let component: MyQuoteListComponent;
  let fixture: ComponentFixture<MyQuoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyQuoteListComponent]
    });
    fixture = TestBed.createComponent(MyQuoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
