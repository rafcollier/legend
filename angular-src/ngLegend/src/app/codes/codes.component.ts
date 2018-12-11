import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ValidateService} from '../services/validate.service';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  currentUser: String;
  errorMessage: String = "";
  errorMessageEdit: String = "";
  validateMessage: String = "";
  validateMessageEdit: String = "";
  deleteMessage : String = "";
  deleteMessageEdit : String = "";
  successMessage : String = "";
  successMessageEdit : String = "";
  description: String;
  code: number;
  descriptionEdit: String;
  codeEdit: number;
  codeIDEdit: String;
  codeIndex: number;
  codes: object[];

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
    this.onGetCodes();
  }

  onGetCodes() {
    this.authService.getCodes().subscribe(entries => {
      this.codes = entries; 
      console.log(this.codes);
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onCodeSubmit(){
    const code = {
      description: this.description,
      code: this.code
    }

    //Required fields
    if(!this.validateService.validateCode(code)) {
      this.validateMessage = "Please fill in code description and number.";
      setTimeout(() => {
        this.validateMessage = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.addCode(code).subscribe(data => {
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

  onCodeEdit(code, index){
    this.codeIDEdit = code["_id"]; 
    this.descriptionEdit = code['description']; 
    this.codeEdit = code['code']; 
    this.codeIndex = index;
  }

  onEditSubmit() {
    const codeEdit = {
      codeID: this.codeIDEdit, //to identify this doc in database
      description: this.descriptionEdit,
      code: this.codeEdit
    }

    if(!this.validateService.validateCode(codeEdit)) {
      this.validateMessageEdit = "Please fill in code description and number.";
      setTimeout(() => {
        this.validateMessageEdit = "";
        return false;
      }, 2000);
    }
    else {
      this.authService.updateCode(codeEdit).subscribe(doc => {
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

  onCodeDelete(code, index) {
    const codeID = code["_id"]; 
    this.authService.deleteCode(codeID).subscribe(code => {
      console.log(code);
      if(code.success){
        this.deleteMessageEdit = code.msg;
        console.log(this.deleteMessageEdit);
        setTimeout(() => {
          this.ngOnInit();
        }, 2000);
      }
      else {
        this.errorMessageEdit = code.msg;
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
    this.description = "";
    this.code = null;
    this.codeIndex = null;
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
