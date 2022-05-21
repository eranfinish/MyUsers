import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user'
import {Router} from '@angular/router'
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent   {
  @Input() user : IUser;

  constructor(private router:Router, private userService:UserService) { }

  setUser(){
  this.user.edit = false;
this.userService.setUserInfo(this.user);
this.router.navigate(['user-details']);
  }

}
