import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Login } from './login.component';
import { routing }       from './login.routing';
import {AuthenticationService } from '../../services/index';
import { AppConfig } from '../../app.config';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],providers: [AppConfig],
  declarations: [
    Login
  ]
})
export class LoginModule {}
