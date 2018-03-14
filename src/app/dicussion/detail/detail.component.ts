import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AlertService, ApiService } from '../../_services/index';
import { Board } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dicussion-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DiscDetailComponent implements OnInit {
  boardDetail: Array<Board>;

  constructor(  private ApiService: ApiService ) { }
 
  ngOnInit() {
    this.boardDetail = this.ApiService.getThreads();
    console.log(this.boardDetail);
   
  }

}
