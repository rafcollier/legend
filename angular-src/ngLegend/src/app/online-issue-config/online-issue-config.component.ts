import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-online-issue-config',
  templateUrl: './online-issue-config.component.html',
  styleUrls: ['./online-issue-config.component.css']
})
export class OnlineIssueConfigComponent implements OnInit {
  date: String;
  volume: String;
  issue: String;
  currentUser: String;
  errorMessage: String = "";
  validateMessage: String = "";
  deleteMessage : String = "";
  onlineIssues :[Object];

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
    this.onGetOnline();
  }

  onGetOnline() {
    this.authService.getOnline().subscribe(entries => {
      this.onlineIssues = entries; 
      console.log(entries);
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onOnlineDelete(online, index) {
    const onlineID = online["_id"]; 
    this.authService.deleteOnline(onlineID).subscribe(online => {
    },
    err => {
      console.log(err);
      return false;
    });
    setTimeout(() => {
      this.date = "";
      this.volume = "";
      this.issue = "";
      this.onGetOnline();
      this.router.navigate(['/online-issue-config']); 
    }, 1000);
  }

  onOnlineSubmit(){
    const online = {
      date: this.date,
      volume: this.volume,
      issue: this.issue
    }

    console.log(online);

    //Required fields
    if(!this.validateService.validateOnline(online)) {
      this.validateMessage = "Please fill in all fields";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      //Register User
      this.authService.addOnline(online).subscribe(data => {
        if(data.success){
          setTimeout(() => {
            this.date = "";
            this.volume = "";
            this.issue = "";
            this.onGetOnline();
            this.router.navigate(['/online-issue-config']); 
          }, 1000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.date = "";
            this.volume = "";
            this.issue = "";
            this.router.navigate(['/online-issue-config']); 
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
