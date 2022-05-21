import { Component, OnInit } from '@angular/core';
import {TestService} from '../app/services/test.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  title = 'test-app';
  users : User[] = [];

  constructor(private testService: TestService) { }

  ngOnInit(): void {
     console.log("component has been initialized!");
     console.log(this);

     this.testService.getUsers(0,20).subscribe(response => {
       console.log(response);

     // this.users = response;

    //     //this.cities = response;
     });
  }

}
