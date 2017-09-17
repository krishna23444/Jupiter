import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { BaMethodComponent } from './methodes/components/baMethod/baMethod.component';
import { ShowMethodComponent } from './methodes/components/showMethod/showMethod.component';
import { AddcategoryComponent } from './methodes/components/category/add-category.component';
import { AddmodalityComponent } from './methodes/components/modality/add-modality.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProcessusComponent } from './tests/components/processus/processus.component';
import { ResultsPageComponent } from './tests/components/resultsPage/resultsPage.component';
import {PickListModule} from 'primeng/primeng';// for listing methodes for test
import { EditMethodComponent } from './methodes/components/editMethod/editMethod.component';
//import { UiSwitchModule } from 'angular2-ui-switch' // switcher sometimes works other times ngOnInit
import { UiSwitchModule }   from 'angular2-ui-switch/src'// update for same package
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodemirrorModule } from 'ng2-codemirror'; // for hihliting syntax instead of highliter
import { Pages } from './pages.component';
import {StepsModule,MenuItem,SharedModule,PanelModule} from 'primeng/primeng'; // for test
import {GrowlModule,TabViewModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';

import { TestsService } from '../services/tests.service';
import { ModalitiesService } from '../services/modality.service';
import { CategoriesService } from '../services/categories.service';
import { MethodsService } from '../services/methods.service';
import { DatabasesService } from '../services/databases.service';
import { DatabaseShared } from './ressources/databaseShared.service';
import { ResultShared } from './tests/components/resultShared.service';
import { DatabasesComponent } from './ressources/databases/databases.component';
import { MethodeShared } from './methodes/methodeShared.service';
import { ShowDatabaseComponent } from './ressources/showDatabase/showDatabase.component';
import { EditDatabaseComponent } from './ressources/editDatabase/editDatabase.component';
import { FusionComponent } from './tests/components/fusion/fusion.component';
import {FileUploadModule} from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {BusyModule, BusyConfig} from 'angular2-busy/src';
 import {TreeModule} from 'primeng/primeng';
import {DialogModule,UIChart} from 'primeng/primeng';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
 import {ChipsModule} from 'primeng/primeng';
 import { AppConfig } from '../app.config';

@NgModule({
imports: [CommonModule,ChipsModule,DialogModule,TreeModule, AppTranslationModule,SharedModule,PanelModule,
NgaModule,PickListModule,SliderModule,StepsModule,BrowserAnimationsModule,
routing,UiSwitchModule ,  BusyModule.forRoot(
        	new BusyConfig({
             
                template: `
        <div style="background: url('assets/img/app/profile/du.gif') no-repeat center 20px;  top:50px; background-size: 200px;">
            <div style="margin-top: 250px; text-align: center; font-size: 18px; font-weight: 700;">
                {{message}}
            </div>
        </div>
    `
         
            })
        ),
AngularFormsModule,ReactiveFormsModule,CodemirrorModule,
GrowlModule,TabViewModule,DropdownModule,FileUploadModule,DataTableModule,DataGridModule],
declarations: [Pages,UIChart,FusionComponent,SafeUrlPipe,ResultsPageComponent,DatabasesComponent,EditDatabaseComponent,ShowDatabaseComponent
,ProcessusComponent,ShowMethodComponent,BaMethodComponent,EditMethodComponent, AddcategoryComponent,AddmodalityComponent]
,
providers: [MethodsService,TestsService,CategoriesService,ModalitiesService,AppConfig,ResultShared,MethodeShared,DatabasesService,DatabaseShared]

})
export class PagesModule {
}
 