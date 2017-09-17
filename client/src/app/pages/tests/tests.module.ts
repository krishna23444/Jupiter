import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './tests-routing';
import { TestsComponent } from './tests.component';
import {TestTypes} from './components/testTypes/index';
@NgModule({
  imports: [
    CommonModule,
    routing,ReactiveFormsModule],
  declarations: [TestsComponent,TestTypes]
})
export class TestsModule { }
 