import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { DiscListComponent } from './dicussion/list/list.component';
import { DiscDetailComponent } from './dicussion/detail/detail.component';

import { DiscCreateComponent } from './dicussion/create/create.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { AuthGuard } from './_guards/index';
import { HomeLayoutComponent } from './layouts/home-layout.component';


const routes: Routes = [
  {path: 'notifications', component: NotificationsComponent },
  /* {path: '',component: HomeLayoutComponent,canActivate: [AuthGuard],children: [{path: '',component: DiscListComponent}]}, */
  {path: '',component: HomeLayoutComponent,children: [{path: '',component: DiscDetailComponent}]},
  {path: '',component: HomeLayoutComponent,children: [{ path: 'discussion', component: DiscListComponent },]},
  {path: '',component: HomeLayoutComponent,children: [{path: 'discussion/create',component: DiscCreateComponent}]},
  {path: '',component: HomeLayoutComponent,children: [{path: 'discussion/detail',component: DiscDetailComponent}]},
  {path: 'login',component: LoginComponent,children: [{path: 'login',component: LoginComponent}]},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
