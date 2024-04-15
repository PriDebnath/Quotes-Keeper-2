import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllQuoteListComponent } from './view/all-quote-list/all-quote-list.component';
import { MyQuoteListComponent } from './view/my-quote-list/my-quote-list.component';
import { MyProfileComponent } from './view/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AllQuoteListComponent,
    MyQuoteListComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
