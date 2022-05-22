    import { Component, OnInit , Input, Output} from '@angular/core';
    import {UserService} from '../../services/user.service';
    import { IUser, User } from '../../models/user'
    import { HttpClient, HttpHeaders  } from '@angular/common/http';
    import { NavigationService} from '../../services/navigation.service';

    import { Observable } from 'rxjs';

    @Component({
      selector: 'app-user-details',
      templateUrl: './user-details.component.html',
      styleUrls: ['./user-details.component.scss']
    })

    export class UserDetailsComponent implements OnInit {

      url:string = 'https://localhost:44359/api/Test';
      @Input() user : IUser;
      @Output() userSave : User;
      showComment: boolean = false;
      comment:string =  "";
      newUser:boolean = false;
      constructor(private userService:UserService,
         private http:HttpClient, private navigation:NavigationService) {}

      ngOnInit() {
        this.user = this.userService.getUserInfo();

        if (this.user == undefined || this.user.edit == true) {
          this.newUser = true;
          this.userSave = new User();
         this.user = new User();
         this.user.pic="https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/1.png";
          this.user.edit = true;
        }
        console.log(this.user);
      }
     
    addUser(){//Add New User
      if(this.userSave.pic == ""){
        this.userSave.pic = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/1.png";
      }
      this.user = this.userSave;
      this.userService.addUser(this.userSave).subscribe(res=>{
          console.log('addUser:',res);

    if(res == "Success"){
    setTimeout(function(){
      this.navigation.back();
      },1000);
    }
     })


    }
    deleteUser(id:number){
      this.userService.deleteUser(id).subscribe(res=>{
      console.log('deleteUser',res);
      this.comment = res;
      this.showComment = true;
  if(res == "Deleted"){
    setTimeout(function(){
      this.navigation.back();
    },1000);
  }
    //  return JSON.stringify(promise);
      })

    }
    //Update an Existing User Data
    updateUser(){
      console.log(this.userSave);
      this.userService.updateUser(this.userSave).subscribe(res=>{
        console.log('updateUser',res);
        this.user.edit = false;
        if(res == "Success!"){
          setTimeout(function(){
            this.navigation.back();
            },1000);
          }
      });
    }



 update(name:string, val:any){
      switch(name){
        case 'first':
            this.userSave.first_name = val;
          break;
          case 'last':
            this.userSave.last_name = val;
          break;
          case 'email':
            this.userSave.email = val;
          break;
          case 'city':
            this.userSave.city = val;
          break;
          case 'street':
            this.userSave.strt_addrss = val;
          break;
          case 'phone':
            this.userSave.phone = val;
          break;
      }
      }


      showImg(){
        return this.imageSrc == '';
      }

          editUser(){
            this.user.edit = true;
            this.userSave = this.user;
          }

          saveUser(){
            if(this.newUser){
               this.addUser();
            }
            else{
            this.updateUser();

            }
            this.user.edit = false;
          }

    //Upload image and
    //Convert to base64

          imageSrc: string = '';

          handleInputChange(e) {
            var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
            var pattern = /image-*/;
            var reader = new FileReader();
            if (!file.type.match(pattern)) {
              alert('invalid format');
              return;
            }
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsDataURL(file);
          }
          _handleReaderLoaded(e) {
            let reader = e.target;
            this.imageSrc = reader.result;
            this.userSave.pic = this.imageSrc;
            console.log(this.imageSrc)
          }
        }
