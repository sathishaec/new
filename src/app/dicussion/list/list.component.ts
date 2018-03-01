import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AlertService, ApiService } from '../../_services/index';
import { Board } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dicussion',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DiscListComponent implements OnInit {
  boardList: Array<Board>;

  constructor(  private ApiService: ApiService ) { }
 
  ngOnInit() {
    this.boardList = this.ApiService.getThreads();
    console.log(this.boardList);
   
  }

}
