import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  username: String;
  section: String;
  errorMessage: String = "";
  successMessage: String = "";
  validateMessage: String = "";
  displaySections: [Object];

  constructor(    
  	private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetSections();
  }

  onGetSections() {
    this.authService.getSections().subscribe(entries => {
      this.displaySections = entries; 
    }, 
    err => {
        console.log(err);
        return false;
    });
  }


  onSectionDelete(section, index) {
    const sectionID = section["_id"]; 
    this.authService.deleteSection(sectionID).subscribe(section => {
    },
    err => {
      console.log(err);
      return false;
    });
    setTimeout(() => {
      this.onGetSections();
      this.router.navigate(['/sections']); 
    }, 1000);
  }

  onSectionSubmit(){
    const section = {
      section: this.section
    }

    //Required fields
    if(!this.validateService.validateSection(section)) {
      this.validateMessage = "Please fill section field";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addSection(section).subscribe(data => {
        if(data.success){
          setTimeout(() => {
            this.section = "";
            this.onGetSections();
            this.router.navigate(['/sections']); 
          }, 1000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.errorMessage = "";
            this.section = "";
            this.router.navigate(['/sections']); 
          }, 2000);
        }
      });
    }
  }

}






