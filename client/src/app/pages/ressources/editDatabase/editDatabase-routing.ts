import { Routes, RouterModule }  from '@angular/router';

import { EditDatabaseComponent } from './editDatabase.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EditDatabaseComponent,
    children: [
  
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
