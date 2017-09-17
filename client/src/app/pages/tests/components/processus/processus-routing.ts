import { Routes, RouterModule }  from '@angular/router';

import { ProcessusComponent } from './processus.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ProcessusComponent,
    children: [
  
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
