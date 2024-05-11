import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuoteListComponent } from './module/quote/all-quote-list/all-quote-list.component';
import { MyQuoteListComponent } from './module/quote/my-quote-list/my-quote-list.component';
import { MyProfileComponent } from './module/user/my-profile/my-profile.component';
import { HeaderComponent } from 'src/app/shared/view/header/header.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./module/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'all-quote-list', component: AllQuoteListComponent },
      { path: 'my-quote-list', component: MyQuoteListComponent },
      { path: 'my-profile', component: MyProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
