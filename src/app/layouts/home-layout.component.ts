import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
//import { Router, ActivatedRoute } from '@angular/router';

import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { AlertService, ApiService } from '../_services/index';
import { NotificationsComponent } from '../notifications/notifications.component';

declare const $: any;
@Component({
  selector: 'app-home-layout',
  templateUrl: 'home-layout.component.html',
  styles: ['./home-layout.component.css']
}) 
export class HomeLayoutComponent{
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private ApiService: ApiService,
    private notificationscomponent: NotificationsComponent,
    private alertService: AlertService) { }

    model: any = {};
    loading = false;
    returnUrl: string;
    authenticationFlag: boolean = true;
    errors = null;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

  ngOnInit() {

    console.log("elemMainPanel");
    $.material.init();
    
    
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    console.log(elemMainPanel);
    
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
        this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
       // this.navbar.sidebarClose();
        if (event instanceof NavigationStart) {
            if (event.url != this.lastPoppedUrl)
                this.yScrollStack.push(window.scrollY);
        } else if (event instanceof NavigationEnd) {
            if (event.url == this.lastPoppedUrl) {
                this.lastPoppedUrl = undefined;
                window.scrollTo(0, this.yScrollStack.pop());
            } else
                window.scrollTo(0, 0);
        }
    });
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        elemMainPanel.scrollTop = 0;
        elemSidebar.scrollTop = 0;
    });
}
}
