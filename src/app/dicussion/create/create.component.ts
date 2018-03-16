import { Component, OnInit, Injectable, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, ApiService } from '../../_services/index';
import { Http } from '@angular/http';
import { countries_list } from 'app/interfaces';
import { CountryService } from 'app/_services/api.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';



@Component({
      moduleId: module.id,
      selector: 'app-disc-create',
      templateUrl: './create.component.html',
      styleUrls: ['./create.component.css'],
      host: {
            '(document:click)': 'handleClick($event)',
      },
})


export class DiscCreateComponent implements OnInit {

      model: any = {};
      public query = '';
      public user = ["Sathish Kumar", "AnandRaj Venkatesan", "Arunkumar", "Jaiganesh", "Logan", "John", "Prabha", "Shameem", "Syed"];
      /* public users_list = [{ "id": 2, "name": "Sathish" }, { "id": 6, "name": "AnandRaj" }, { "id": 7, "name": "Arunkumar" }, { "id": 9, "name": "Jaiganesh" }, { "id": 1, "name": "Logan" }, { "id": 3, "name": "Prabha" }]; */
      public users_list = [];
      public selected = [];
      public selectedId = [];
      public filteredList = [];
      public elementRef;
      list: string[] = [];
      constructor(myElement: ElementRef,
            private countryService: CountryService,
            private ApiService: ApiService,
            private notificationscomponent: NotificationsComponent) {
            this.elementRef = myElement;
      }


      ngOnInit(): void {
            this.ApiService.getusers()
                  .subscribe(
                  data => {
                        console.log(data);
                        if (data.status == "201") {
                              console.log("false");

                        } else {
                              this.users_list = data;
                              for (let i = 0; i < this.users_list.length; i++) {
                                    console.log(this.users_list[i]['fname']);
                                    this.list.push(this.users_list[i]['fname']);
                              }
                        }
                  },
                  error => {

                  });


      }

      filter() {
            if (this.query !== "") {
                  /* this.filteredList = this.countries.filter(function (el) {
                        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                  }.bind(this)); */
                  this.filteredList = this.list.filter(function (el) {
                        return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                  }.bind(this));

            } else {
                  this.filteredList = [];
            }
      }

      select(item) {
            for (let i = 0; i < this.users_list.length; i++) {
                  if (this.users_list[i].fname === item) {
                        if (!this.selected.includes(this.users_list[i])) {
                              this.selected.push(this.users_list[i]);
                              this.selectedId.push(this.users_list[i].uid);
                        }

                  }
            }
            this.query = '';
            this.filteredList = [];
      }
      remove(item) {
            this.selected.splice(this.selected.indexOf(item), 1);
            this.selectedId.splice(this.selectedId.indexOf(item), 1);
      }

      handleClick(event) {
            var clickedComponent = event.target;
            var inside = false;
            do {
                  if (clickedComponent === this.elementRef.nativeElement) {
                        inside = true;
                  }
                  clickedComponent = clickedComponent.parentNode;
            } while (clickedComponent);
            if (!inside) {
                  this.filteredList = [];
            }
      }

      discSubmit(value, valid) {
            let userId = localStorage.getItem('userId');
            this.selectedId.push(userId);
            if (this.model.discName === undefined ||
                  this.model.discName == null ||
                  this.model.discName == "" ||
                  this.model.discDesc === undefined ||
                  this.model.discDesc == null ||
                  this.model.discDesc == "" ||
                  this.selectedId.length == 0) {
                  this.notificationscomponent.showNotification('top', 'right', "Please enter all fields", "danger");
            } else {
                  console.log(this.selectedId.toString());
                  this.notificationscomponent.showNotification('top', 'right', "Data Submitted successfully!!!", "success");
                  this.ApiService.discCreate(this.model.discName, this.model.discDesc, this.selectedId.toString())
                        .subscribe(
                        data => {
                              if (data.status == "201") {
                              } else {
                                    console.log(data);
                              }
                        },
                        error => {

                        });
            }

      }

}
