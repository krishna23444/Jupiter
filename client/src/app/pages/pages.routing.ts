import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes
// export function loadChildren(path) { return System.import(path); };
import { BaMethodComponent } from './methodes/components/baMethod/baMethod.component';
import { ProcessusComponent } from './tests/components/processus/processus.component';
import { FusionComponent } from './tests/components/fusion/fusion.component';
import { ShowMethodComponent } from './methodes/components/showMethod/showMethod.component';
import { EditMethodComponent } from './methodes/components/editMethod/editMethod.component';
import { ShowDatabaseComponent } from './ressources/showDatabase/showDatabase.component';
import { EditDatabaseComponent } from './ressources/editDatabase/editDatabase.component';
import { ResultsPageComponent } from './tests/components/resultsPage/resultsPage.component';
import { DatabasesComponent } from './ressources/databases/databases.component';
export const routes: Routes = [
{
  path: 'login',
  loadChildren: 'app/pages/login/login.module#LoginModule'
},
{
  path: 'register',
  loadChildren: 'app/pages/register/register.module#RegisterModule'
},
{
  path: '',
  component: Pages,
  children: [
  { path: '', redirectTo: 'tests', pathMatch: 'full' },
  { path: 'tests', loadChildren: './tests/tests.module#TestsModule' },
  { path: 'tests/results',  component:ResultsPageComponent},
  { path: 'tests/processus',  component:ProcessusComponent},
  { path: 'tests/fusion',  component:FusionComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'resources', loadChildren: './ressources/ressources.module#RessourcesModule' },
  { path: 'resources/create',  component:DatabasesComponent},
  { path: 'resources/show',  component:ShowDatabaseComponent},
  { path: 'resources/edit',  component:EditDatabaseComponent},
  { path: 'methods', loadChildren: './methodes/methodes.module#MethodesModule' },
  { path: 'methods/create', component:BaMethodComponent},
  { path: 'methods/show',  component:ShowMethodComponent},
  { path: 'methods/edit', component:EditMethodComponent },
  { path: 'results', loadChildren: './results/results.module#ResultsModule' },
  { path: 'logs', loadChildren: './logs/logs.module#LogsModule' },
  { path: 'faq', loadChildren: './faq/faq.module#FAQModule' } ]
}
];
//  

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
