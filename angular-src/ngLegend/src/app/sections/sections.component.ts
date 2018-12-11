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
  department: String;
  sectionID: String;
  onlinePosition: number;
  printPosition: number;
  sectionEdit: String;
  departmentEdit: String;
  sectionIDEdit: String;
  onlinePositionEdit: number;
  printPositionEdit: number;
  sectionIndex: number = null;
  errorMessage: String = "";
  errorMessageEdit: String = "";
  successMessage: String = "";
  successMessageEdit: String = "";
  validateMessage: String = "";
  validateMessageEdit: String = "";
  deleteMessage: String = "";
  deleteMessageEdit: String = "";
  displaySections: [Object];

  constructor(    
  	private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router) { }

  ngOnInit() {

    this.clearFields();

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
    if(section.success){
        this.deleteMessageEdit = section.msg;
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
      else {
        this.errorMessageEdit = section.msg;
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onSectionSubmit(){
    const section = {
      section: this.section,
      department: this.department,
      onlinePosition: this.onlinePosition,
      printPosition: this.printPosition
    }

    //Required fields
    if(!this.validateService.validateSection(section)) {
      this.validateMessage = "Please enter Section name";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addSection(section).subscribe(data => {
        if(data.success){
          this.successMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        } 
        else {
          this.errorMessage = data.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      });
    }
  }

  onSectionEdit(section, index){
    this.sectionIDEdit = section["_id"]; 
    this.sectionEdit = section['section']; 
    this.departmentEdit = section['department']; 
    this.onlinePositionEdit = section['onlinePosition']; 
    this.printPositionEdit = section['printPosition']; 
    this.sectionIndex = index;
  }

  onEditSubmit() {
    const sectionEdit = {
      sectionID: this.sectionIDEdit, //to identify this doc in database
      section: this.sectionEdit, 
      department: this.departmentEdit, 
      onlinePosition: this.onlinePositionEdit, 
      printPosition: this.printPositionEdit 
    }
    if(!this.validateService.validateSection(sectionEdit)) {
      this.validateMessageEdit = "Please fill in section name.";
      setTimeout(() => {
        this.validateMessageEdit = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.updateSection(sectionEdit).subscribe(doc => {
        if(doc.success){
          this.successMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
        else {          
          this.errorMessageEdit = doc.msg;
          setTimeout(() => {
            this.ngOnInit();
          }, 2000);
        }
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  editCancel(){
    this.sectionIndex = null;
    this.ngOnInit();
  }

  clearFields() {
    this.section = "";
    this.department = "";
    this.onlinePosition = null;
    this.printPosition = null;
    this.sectionIndex = null;
    this.errorMessage = "";
    this.errorMessageEdit = "";
    this.validateMessage = "";
    this.validateMessageEdit = "";
    this.deleteMessage = "";
    this.deleteMessageEdit = "";
    this.successMessage = "";
    this.successMessageEdit = "";
  }


}






