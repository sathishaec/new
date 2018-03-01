import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AlertService, ApiService } from '../_services/index';
import { Board } from '../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  boardList: Array<Board>;

  constructor(  private ApiService: ApiService ) { }
 
  ngOnInit() {
    this.boardList = this.ApiService.getThreads();
    console.log(this.boardList);
  }

}
