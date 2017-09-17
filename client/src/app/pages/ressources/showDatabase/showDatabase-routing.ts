
import { Routes, RouterModule }  from '@angular/router';

import { ShowDatabaseComponent } from './showDatabase.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ShowDatabaseComponent,
    children: [
  
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);

