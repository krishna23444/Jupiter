import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
 import { HttpModule } from "@angular/http";
 import { routing } from './methodes-routing';
import { BaMethodComponent } from './components/baMethod/baMethod.component';
import { MethodesComponent } from './methodes.component';
import { MethodsService } from '../../services/methods.service';
import { AppConfig } from '../../app.config';
import { DataTableModule } from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    NgaModule,
    routing,    
    HttpModule,MessagesModule,
    AppTranslationModule, DataTableModule   
  ],
  declarations: [MethodesComponent],
 })
export class MethodesModule { }
