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
  multiMedia1: String;
  multiMedia2: String;
  multiMedia3: String;
  multiMedia4: String;
  multiMedia5: String;
  multiMedia6: String;
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
      if(entries.length > 0) {
        this.configID = entries[0]["_id"];
        this.firstNewsDOI = entries[0]["firstNewsDOI"]; 
        this.multiMedia1 = entries[0]["multiMedia1"];
        this.multiMedia2 = entries[0]["multiMedia2"];
        this.multiMedia3 = entries[0]["multiMedia3"];
        this.multiMedia4 = entries[0]["multiMedia4"];
        this.multiMedia5 = entries[0]["multiMedia5"];
        this.multiMedia6 = entries[0]["multiMedia6"];
      }
      else this.initializeConfig();
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  //Write once to config in datatbase to set default values
  initializeConfig(){

    const config = {
      firstNewsDOI: 0,
      multiMedia1: "",
      multiMedia2: "",
      multiMedia3: "",
      multiMedia4: "",
      multiMedia5: "",
      multiMedia6: ""
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
      firstNewsDOI: this.firstNewsDOI,
      multiMedia1: this.multiMedia1,
      multiMedia2: this.multiMedia2,
      multiMedia3: this.multiMedia3,
      multiMedia4: this.multiMedia4,
      multiMedia5: this.multiMedia5,
      multiMedia6: this.multiMedia6
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
