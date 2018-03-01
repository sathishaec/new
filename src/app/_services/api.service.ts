
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Post, Board, Topic, countries_list } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Globals } from 'app/globals';



@Injectable()
export class ApiService {
    private tokenID = '$1$N5wpkeKt$5cUsiaPfX4r19jOdGHgLT1';
    private apiUrl = "http://192.168.64.2/trackR";
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private globals: Globals) { }
    // MOCK DATA
    debugDefaultBoards: Array<Board> = [
        { id: 1, name: 'Discusstion Thread - 1', updatedat: '27/06/2017 13:48' },
        { id: 2, name: 'Discusstion Thread - 2', updatedat: '11/06/2017 13:48' },
        { id: 3, name: 'Discusstion Thread - 3', updatedat: '07/06/2017 13:48' },
        { id: 4, name: 'Discusstion Thread - 4', updatedat: '01/06/2017 13:48' },
        { id: 5, name: 'Discusstion Thread - 5', updatedat: '27/05/2017 13:48' }
    ];
    countries: Array<countries_list> = [
        { countries: "Albania" },
        { countries: "Andorra" },
        { countries: "Armenia" },
        { countries: "Austria" },
        { countries: "Azerbaijan" },
        { countries: "Lithuania" },
    ];

    /* public countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus",
        "Belgium", "Bosnia & Herzegovina", "Bulgaria", "Croatia", "Cyprus",
        "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
        "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo",
        "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta",
        "Moldova", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland",
        "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia",
        "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"]; */

    login(empid: string, password: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        let url = JSON.stringify(
            { "empid": empid, "password": password }
        )
        return this.http.post<any>(this.apiUrl + '/index.php/auth/login', url, httpOptions)
            .map(user => {

                // login successful if there's a jwt token in the response
                console.log(user.token_id);
                if (user && user.token_id) {
                    this.loggedIn.next(true);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userToken', user.token_id);
                    localStorage.setItem('userId', user.id);
                    //localStorage.setItem('token', JSON.stringify(user));
                }

                return user;
            });

    }

    dicsCreate() {

        // return this.http.post<any>('http://10.98.20.104/simple-codeigniter-rest-api-master/index.php/auth/login', { empid : "IN002", password: '123' },{headers: new HttpHeaders().set('Content-Type', 'application/json')}); 
        return this.http.post<any>(this.apiUrl + 'index.php/task/create', {
            token: this.tokenID,
            uid: "2",
            converge_id: "aaaLaogan",
            jobtype: "Refresh",
            complexity: "3",
            scheduled_start_date: "2018-02-07",
            scheduled_end_date: "2018-02-11",
            publisher: "WM",
            task_status: '1',
            pocs: "Shameem",
            scheduled_hours: "24"
        })
    }

    getusers() {
        let token = localStorage.getItem('userToken');
        let userId = localStorage.getItem('userId');
        return this.http.get<any>(this.apiUrl + '/index.php/userprofile/list?token=' + token + '&uid=' + userId)
            .map(user => {
                return user;
            });
    }

    discCreate(name: string, desc: string, members: string) {
        return this.http.post<any>(this.apiUrl + '/index.php/auth/login', {
            name: name,
            description: desc,
            members: members,
        }).map(user => {
            return user;
        });

    }

    getThreads(): Array<Board> {
        console.log(this.globals.token);
        return this.debugDefaultBoards;
    }


    logout() {
        // remove user from local storage to log user out
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get<any>('assets/data/countries.json')
            .toPromise()
            .then(res => <any[]>res.data)
            .then(data => { return data; });
    }
}