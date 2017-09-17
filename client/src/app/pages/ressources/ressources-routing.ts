import { Routes, RouterModule }  from '@angular/router';

import { RessourcesComponent } from './ressources.component';
import { ModuleWithProviders } from '@angular/core';
import { DatabasesComponent } from './databases/databases.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: RessourcesComponent,
    children: [
       
    ]
  }
];

export const routing = RouterModule.forChild(routes);
