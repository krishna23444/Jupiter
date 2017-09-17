import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './resultsPage-routing';
import { ResultsPageComponent } from './resultsPage.component';
 @NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [ResultsPageComponent]
})
export class ResultsPageModule { }
