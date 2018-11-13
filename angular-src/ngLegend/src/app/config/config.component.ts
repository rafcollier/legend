import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  username: String;
  firstNewsDOI: Number;
  configID: String;
  errorMessage: String = "";

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.getConfig();
  }

  getConfig() {
    this.authService.getConfig().subscribe(entries => {
      console.log(entries);
      if(entries.length == 0) {
        this.initializeConfig();
      }
      else {
        this.configID = entries[0]["_id"];
        this.firstNewsDOI = entries[0]["firstNewsDOI"]; 
      }
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  initializeConfig(){

    const config = {
      firstNewsDOI: 0 
    }

    this.authService.addConfig(config).subscribe(data => {
      if(data.success){
        setTimeout(() => {
          this.getConfig();
          this.router.navigate(['/config']); 
        }, 1000);
      } 
      else {
        this.errorMessage = data.msg;
        setTimeout(() => {
          this.errorMessage = "";
          this.router.navigate(['/config']); 
        }, 2000);
      }
    });

  }

  updateConfig() {
    
    let editedConfig = {
      configID: this.configID,
      firstNewsDOI: this.firstNewsDOI
    }

    this.authService.putUpdateConfig(editedConfig).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/config']);

  }


}
