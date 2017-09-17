import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

  import {UserService } from '../../services/index';
import { AppConfig } from '../../app.config';
import { routing } from './user-routing';
import { UserComponent } from './user.component';
 @NgModule({
  imports: [
     CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ], providers: [UserService,AppConfig],
  declarations: [UserComponent]
})
export class UserModule { }
