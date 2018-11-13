import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

import * as moment from 'moment';

@Component({
  selector: 'app-printissues',
  templateUrl: './printissues.component.html',
  styleUrls: ['./printissues.component.css']
})

export class PrintissuesComponent implements OnInit {
  username: String;
  printIssue: String;
  errorMessage: String = "";
  successMessage: String = "";
  validateMessage: String = "";
  displayPrintIssues: [Object];

  constructor(    
  	private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router) { }

  ngOnInit() {

    //this.authService.getProfile().subscribe(profile => {
    //  this.username = profile.user.username;
    //},
    //err => {
    //  console.log(err);
    //  return false;
    //});
    //this.onGetPrintIssues();
  }

  /*

  onGetPrintIssues() {
    this.authService.getPrintIssues().subscribe(entries => {
      this.displayPrintIssues = entries; 
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onPrintIssueDelete(printIssue, index) {
    const printIssueID = printIssue["_id"]; 
    this.authService.deletePrintIssue(printIssueID).subscribe(printIssue => {
    },
    err => {
      console.log(err);
      return false;
    });
    setTimeout(() => {
      this.onGetPrintIssues();
      this.router.navigate(['/printissues']); 
    }, 1000);
  }

  onPrintIssueSubmit(){
    const printIssue = {
      printIssue: this.printIssue
    }

    console.log(printIssue);

    //Required fields
    if(!this.validateService.validatePrintIssue(printIssue)) {
      this.validateMessage = "Please fill print issue field";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addPrintIssue(printIssue).subscribe(data => {
        if(data.success){
          this.printIssue = "";
          setTimeout(() => {
            this.onGetPrintIssues();
            this.router.navigate(['/printissues']); 
          }, 1000);
        } 
        else {
          this.errorMessage = data.msg;
          this.printIssue = "";
          setTimeout(() => {
            this.errorMessage = "";
            this.router.navigate(['/printissues']); 
          }, 2000);
        }
      });
    }
  }

  */

}