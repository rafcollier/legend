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
  password: String;
  errorMessage: String = "";
  validateMessage: String = "";

  constructor(
    private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router
  ) { }

  ngOnInit() {
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
          this.router.navigate(['/login']); 
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
      });
    }
  }

}
