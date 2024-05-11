import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/module/auth/components/login/login.component';
import { AuthRoutingModule } from 'src/app/module/auth/auth-routing.module';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
  SchemaMetadata,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from 'src/app/module/auth/components/registration/registration.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [LoginComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
