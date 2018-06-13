import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  username: String;
  displayUsers :[Object];
  deleteMessage : String = "";

  constructor(
  	private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetUsers();
  }

  onGetUsers() {
    this.authService.getUsers().subscribe(entries => {
      this.displayUsers = entries; 
      console.log(entries);
    }, 
    err => {
        console.log(err);
        return false;
    });
  }


  onUserDelete(user, index) {
    console.log("delete user");
    const userID = user["_id"]; 
    this.authService.deleteUser(userID).subscribe(user => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetUsers();
  }


}
