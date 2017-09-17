import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './faq-routing';
import { FAQComponent } from './faq.component';
import {AccordionModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule ,routing,NgaModule,AccordionModule
  ],
  declarations: [FAQComponent]
})
export class FAQModule { }
