import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgaModule } from '../../../../theme/nga.module';
import { routing } from './baMethod-routing';
import { BaMethodComponent } from './baMethod.component';
import { ModalitiesService } from '../../../../services/modality.service';
import { AppConfig } from '../../../../app.config';
import { AddcategoryComponent } from '../category/add-category.component';
import { AddmodalityComponent } from '../modality/add-modality.component';
import {FileUploadModule} from 'primeng/primeng';
import { UiSwitchModule }   from 'angular2-ui-switch/src'// update for same package
import { CodemirrorModule } from 'ng2-codemirror'; // for hihliting syntax instead of highliter
import {GrowlModule,TabViewModule} from 'primeng/primeng';

@NgModule({
	imports: [
	CommonModule,UiSwitchModule,CodemirrorModule,GrowlModule,
	NgaModule,
	routing, FileUploadModule,
	CommonModule,
	AngularFormsModule, ReactiveFormsModule,
	NgaModule,
	routing,    
	HttpModule,
	
	],
	declarations: [BaMethodComponent, AddcategoryComponent,AddmodalityComponent ]

})
export class BaMethodModule { }
