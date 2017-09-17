import { NgModule }      from '@angular/core';
 import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { ChartistJs } from '../charts/components/chartistJs/chartistJs.component';
import { ChartistJsService } from '../charts/components/chartistJs/chartistJs.service';
import { AppTranslationModule } from '../../app.translation.module';
import { routing } from './results-routing';
import { ResultsComponent } from './results.component';
import { CommonModule,DatePipe } from '@angular/common';
   import { AppConfig } from '../../app.config';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
 import { HttpModule, JsonpModule } from '@angular/http';
import { DataTableModule } from 'primeng/primeng';
 import {MenubarModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

@NgModule({
  imports: [
     CommonModule,
    AppTranslationModule,
    FormsModule,DialogModule,
    NgaModule, MenubarModule,
    routing ,ReactiveFormsModule,DataTableModule 
    
  ],
  declarations: [
  ResultsComponent,
    ChartistJs
  ],
  providers: [
    ChartistJsService,DatePipe
  ]
})
export class ResultsModule { }
 