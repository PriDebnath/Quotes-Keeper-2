import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuoteListComponent } from './view/all-quote-list/all-quote-list.component';
import { MyQuoteListComponent } from './view/my-quote-list/my-quote-list.component';
import { MyProfileComponent } from './view/my-profile/my-profile.component';
import { HeaderComponent } from 'src/app/shared/view/header/header.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./view/auth/auth.module').then((m) => m.AuthModule),
  },
  { 
    path: '', 
    component: HeaderComponent,
    children : [
      { path: 'all-quote-list', component: AllQuoteListComponent },
      { path: 'my-quote-list', component: MyQuoteListComponent },
      { path: 'my-profile', component: MyProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
