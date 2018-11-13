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
      username: this.username,
      password: this.password
    }

    //Will not work if either username or password field is blank.
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
          this.onConfigSections();
        } 
        else {
          this.errorMessage = data.msg;
          this.username ="";
          this.password ="";
          setTimeout(() => {
            this.errorMessage = "";
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
    }
  }

 //Load sections for dropdown menus from section collection into an array, 
 //store into array and save in local memory.
  onConfigSections() {
    let sectionArr = [];
    let sectionArrUnique = [];
    let departmentArr = [];
    this.authService.getSections().subscribe(entries => {
      for(let i = 0; i < entries.length; i++) {
        sectionArr.push(entries[i]);
        if (entries[i]['department']) {
          departmentArr.push(entries[i]['department']); 
        }
        if(i == 0) {
          sectionArrUnique.push(entries[i]['section']);
        }
        else if(entries[i]['section'] != entries[i-1]['section']) {
          sectionArrUnique.push(entries[i]['section']);
        }
      }
      this.authService.localStoreSections(sectionArr);
      this.authService.localStoreUniqueSections(sectionArrUnique);
      this.authService.localStoreDepartments(departmentArr);
      this.onLoadConfigFile();
    }, 
    err => {
      console.log(err);
      return false;
    }); 
  }

  onLoadConfigFile() {
    let configFile = {};
    this.authService.getConfig().subscribe(entries => {
      configFile = entries[0];
      this.authService.localStoreConfigFile(configFile);
      this.onGoSearchPage();
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  //Will go to admin page if username is admin, or will go to search page for all other users.
  onGoSearchPage() {
    if(this.username == "admin") 
      this.router.navigate(['/register']);
    else
      this.router.navigate(['/search']);
  }

}
