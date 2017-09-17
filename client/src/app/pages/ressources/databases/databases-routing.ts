import { Routes, RouterModule }  from '@angular/router';

import { DatabasesComponent } from './databases.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: DatabasesComponent,
    children: [
          
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
