import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './processus-routing';
import { ProcessusComponent } from './processus.component';
 @NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ProcessusComponent]
})
export class ProcessusModule { }
