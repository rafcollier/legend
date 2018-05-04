import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  onLoginSubmit(){
    const user = {
      username: this.username.toLowerCase(),
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
      this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);

          if(data.user["username"]=="admin") 
            this.router.navigate(['/admin']);
          else
            this.router.navigate(['/search']);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.errorMessage = "";
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    }
  }

}
