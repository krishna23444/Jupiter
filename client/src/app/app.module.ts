import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/primeng';
 
/*
 * Platform and Environment providers/directives/pipes
 
 ACDB83451E596F2DBCEF8A7D50B2E38981BE641CE7940BFFD414E87C16EE29C0
 03B572947B89E11F8147BFC07C98A25ED6C160753D8447F6DD91F38DD334DC80*/
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';
import {AuthenticationService } from './services/index';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing 
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,AuthenticationService
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
