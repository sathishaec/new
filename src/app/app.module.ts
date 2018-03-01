import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AlertService, ApiService,CountryService } from './_services/index';
import { LoginComponent } from './login/index';
import { DiscListComponent } from './dicussion/list/list.component';
import { DashboardComponent } from './dicussion/dashboard.component';

import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuard } from './_guards/index';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { DiscCreateComponent } from 'app/dicussion/create/create.component';
import { Globals } from 'app/globals';
import { AutoCompleteModule } from 'primeng/autocomplete';

/* import { AutoCompleteModule } from 'primeng/autocomplete'; */


@NgModule({
  declarations: [ 
    AppComponent,
    DiscListComponent,
    DiscCreateComponent,
    IconsComponent,
    NotificationsComponent,
    LoginComponent,  
    HomeLayoutComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AutoCompleteModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    ApiService,
    CountryService,
    NotificationsComponent,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
