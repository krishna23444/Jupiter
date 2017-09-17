import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { NgxTimelineModule } from 'ngx-timeline';

import { routing } from './logs-routing';
import { LogsComponent } from './logs.component';

@NgModule({
  imports: [
    CommonModule,
    routing,NgaModule,NgxTimelineModule
  ],
  declarations: [LogsComponent]
})
export class LogsModule { }
