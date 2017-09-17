import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';
import { routing } from './showMethod-routing';
import { ShowMethodComponent } from './showMethod.component';
import { ModalitiesService } from '../../../../services/modality.service';
import { AppConfig } from '../../../../app.config';
import { AddcategoryComponent } from '../category/add-category.component';
@NgModule({
  imports: [
   CommonModule,
    AngularFormsModule,
    NgaModule,
 routing,
     
  ],
   providers: [ModalitiesService,AppConfig],
  declarations: [ShowMethodComponent, AddcategoryComponent ]

})
export class ShowMethodModule { }
