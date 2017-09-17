import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
 import { routing } from './ressources-routing';
import { RessourcesComponent } from './ressources.component';
import { AppConfig } from '../../app.config';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
 import { HttpModule, JsonpModule } from '@angular/http';
import { DataTableModule } from 'primeng/primeng';

 import { DatabasesService } from '../../services/databases.service';
@NgModule({
  imports: [
    CommonModule,NgaModule,HttpModule, JsonpModule,
    routing, AngularFormsModule, ReactiveFormsModule,DataTableModule   ],
  declarations: [RessourcesComponent],
  providers:[DatabasesService,AppConfig ]
})
export class RessourcesModule { }
