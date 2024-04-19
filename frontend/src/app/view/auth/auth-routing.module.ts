import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from 'src/app/shared/view/header/header.component';
import { RegistrationComponent } from 'src/app/view/auth/components/registration/registration.component';


const routes: Routes = [
    { path: 'registration',  component:  RegistrationComponent },
    { path: 'login',  component:  LoginComponent },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
