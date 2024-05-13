import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
  SchemaMetadata,
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllQuoteListComponent } from 'src/app/module/quote/all-quote-list/all-quote-list.component';
import { MyQuoteListComponent } from 'src/app/module/quote/my-quote-list/my-quote-list.component';
import { MyProfileComponent } from 'src/app/module/user/my-profile/my-profile.component';
import { HeaderComponent } from 'src/app/shared/view/header/header.component';
import { QuoteCardComponent } from 'src/app/shared/view/quote-card/quote-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuoteFormModalComponent } from 'src/app/module/quote/quote-form-modal/quote-form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/module/auth/auth.module';
import { JwtTokenInterceptor } from 'src/app/module/auth/interceptors/jwt-token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    NgbModule,
    AuthModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true }, // Register your interceptor
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
