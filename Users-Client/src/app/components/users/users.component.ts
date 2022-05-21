import { Component, OnInit } from '@angular/core';
import { IUser, User } from '../../models/user';
import {TestService} from '../../services/test.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users : IUser[] = new Array<User>();
  user : IUser = new User();
  pages:number ;
  active:number = 1;
  pageArr: Array<number>;
  selectedIndex: number = null;

  setIndex(index: number) {
     this.selectedIndex = index;
  }
  constructor(private router:Router, private testService: TestService, 
    private userService:UserService) { }
  counter(i: number) {
    return new Array(i);
}
  ngOnInit(): void {
     console.log("component has been initialized!");
     console.log(this);

     this.testService.getUsers(0,20).subscribe(response => {
      this.users = response.users;
        this.pages = Math.ceil(response.count/20)  ;

        console.log(this.pages);
         //this.cities = response;
     });

  }

  getPage(i:number){
    this.users = [];
    console.log(i);
    this.active = i;
    this.testService.getUsers(i*20, 20).subscribe(response => {
      this.users = response.users;
        this.pages = Math.ceil(response.count/20)  ;
        this.selectedIndex = i;
        console.log(this.pages);
         //this.cities = response;
     });
  }

  filterPage( i:number){
    //let = this.selectedIndex;
    if(i <= this.active + 4 && i >= this.active - 4){
      console.log(i);
      return 'inline-block';
    }
    return 'none';
  }

  nextPrevPage(s:string){
    s==">>"? this.selectedIndex++ : (s == "<<" ? this.selectedIndex-- : 
      this.selectedIndex = this.selectedIndex);
      this.getPage(this.selectedIndex);
  }
  newUser(){
    this.user = new User();
    this.user.edit = true;
  this.userService.setUserInfo(this.user);
  this.router.navigate(['user-details']);
    }
  

}
