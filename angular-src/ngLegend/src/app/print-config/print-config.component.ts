import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-print-config',
  templateUrl: './print-config.component.html',
  styleUrls: ['./print-config.component.css']
})
export class PrintConfigComponent implements OnInit {
  printDate: string;
  date: Date;
  dateEdit: Date;
  currentUser: String;
  errorMessage: String = "";
  errorMessageEdit: String = "";
  validateMessage: String = "";
  validateMessageEdit: String = "";
  deleteMessage : String = "";
  deleteMessageEdit : String = "";
  successMessage : String = "";
  successMessageEdit : String = "";
  printIssues : object[];
  printIDEdit: String;
  printEdit: string;
  printIndex: number = null;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService, 
    private router: Router
  ) { }

  ngOnInit() {

    this.clearFields();

    this.authService.getProfile().subscribe(profile => {
      this.currentUser = profile.user.username;
    },
    err => {
      console.log(err);
      return false;
    });
    this.onGetPrint();
  }

  onGetPrint() {
    this.authService.getPrint().subscribe(entries => {
      this.printIssues = entries; 
      console.log(this.printIssues);
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onPrintSubmit(){
    const print = {
      printIssue: this.printDate
    }

    console.log(print.printIssue);

    //Required fields
    if(!this.validateService.validatePrint(print)) {
      this.validateMessage = "Please fill in print date in following format: MMM YYYY.";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addPrint(print).subscribe(data => {
        console.log(data);
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
      },
      err => {
      console.log(err);
      return false;
      });
    }
  }

  onPrintEdit(issue, index){
    this.printIDEdit = issue["_id"]; 
    this.printEdit = issue['printIssue']; 
    this.printIndex = index;
  }

  onEditSubmit() {
    const printEdit = {
      printID: this.printIDEdit, //to identify this doc in database
      printIssue: this.printEdit 
    }

    if(!this.validateService.validatePrint(printEdit)) {
      this.validateMessage = "Please fill in print date in following format: MMM YYYY.";
      setTimeout(() => {
        this.validateMessageEdit = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.updatePrint(printEdit).subscribe(doc => {
        console.log(doc);
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

  onPrintDelete(print, index) {
    const printID = print["_id"]; 
    this.authService.deletePrint(printID).subscribe(print => {
      console.log(print);
      if(print.success){
        this.deleteMessageEdit = print.msg;
        console.log(this.deleteMessageEdit);
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
      else {
        this.errorMessageEdit = print.msg;
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

  editCancel(){
    this.ngOnInit();
  }

  clearFields() {
    this.printDate = "";
    this.printIndex = null;
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
