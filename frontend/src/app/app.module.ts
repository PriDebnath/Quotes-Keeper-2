import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, SchemaMetadata } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllQuoteListComponent } from 'src/app/view/all-quote-list/all-quote-list.component';
import { MyQuoteListComponent } from 'src/app/view/my-quote-list/my-quote-list.component';
import { MyProfileComponent } from 'src/app/view/my-profile/my-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/view/header/header.component';
import { QuoteCardComponent } from 'src/app/shared/view/quote-card/quote-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteFormModalComponent } from 'src/app/view/quote-form-modal/quote-form-modal.component';

 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MyProfileComponent,
    QuoteCardComponent,
    MyQuoteListComponent,
    AllQuoteListComponent,
    QuoteFormModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] ,
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
