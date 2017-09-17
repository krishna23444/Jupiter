import { Routes, RouterModule }  from '@angular/router';

import { MethodesComponent } from './methodes.component';
import { ModuleWithProviders } from '@angular/core';
import { BaMethodComponent } from './components/baMethod/baMethod.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: MethodesComponent,
    children: [
    ],
pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
