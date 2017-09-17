import { Routes, RouterModule }  from '@angular/router';

import { AddcategoryComponent } from './add-category.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: AddcategoryComponent,
    children: [
          
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
