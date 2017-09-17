import { Routes, RouterModule }  from '@angular/router';

import { AddmodalityComponent } from './add-modality.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AddmodalityComponent,
    children: [
          
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
