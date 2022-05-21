
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService} from '../app/services/message.service';
import { HttpErrorHandler } from '../app/services/http-error-handler.service';
import {UserService} from '../app/services/user.service';
import {TestService} from '../app/services/test.service';

import { AppComponent } from './app.component';
import {UserComponent} from '../app/components/user/user.component';
import {UserDetailsComponent} from '../app/components/user-details/user-details.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from './models/user';

import { Routes, RouterModule } from '@angular/router';
const appRoute: Routes=[
  { path:'', component:UsersComponent},
  { path:'user-details', component:UserDetailsComponent}
]
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    UserDetailsComponent
  ],

  providers: [TestService,
    UserService,MessageService,HttpErrorHandler
    ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
