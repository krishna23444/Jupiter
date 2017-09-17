import { Routes, RouterModule }  from '@angular/router';

import { LogsComponent } from './logs.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
    children: [
  
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
