
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/view/auth/login/login.component';
import { AuthRoutingModule } from 'src/app/view/auth/auth-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule, SchemaMetadata } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA] ,
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
