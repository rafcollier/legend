import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  currentUser: String;
  password: String;
  errorMessage: String = "";
  validateMessage: String = "";
  displayUsers :[Object];
  deleteMessage : String = "";

  constructor(
    private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router
  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.currentUser = profile.user.username;
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
    setTimeout(() => {
      this.username = "";
      this.password = "";
      this.onGetUsers();
      this.router.navigate(['/register']); 
    }, 1000);
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    //Required fields
    if(!this.validateService.validateRegister(user)) {
      this.validateMessage = "Please fill in all fields";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      //Register User
      this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          setTimeout(() => {
            this.username = "";
            this.password = "";
            this.onGetUsers();
            this.router.navigate(['/register']); 
          }, 1000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.errorMessage = "";
            this.username = "";
      	    this.password = "";
            this.router.navigate(['/register']); 
          }, 2000);
        }
      },
      err => {
      console.log(err);
      return false;
      });
    }
  }


}
