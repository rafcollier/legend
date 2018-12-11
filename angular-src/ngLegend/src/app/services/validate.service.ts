import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if((user.username == ("" || undefined || null)) || (user.password == ("" || undefined || null))) {
      return false;
    }  
    else if((user.username.length <= 0) || (user.password.length <= 0)) {
      return false;
    }
    else {
      return true;
    }
  }

  validateSection(section){
    console.log(section);
    if( (section.section == ("" || undefined || null)) ) {
      return false;
    } 
    else if ( (section.section.length <= 0) ) {
      return false;
    }
    else {
      return true;
    }
  }

  validateCode(code){
    console.log(code);
    if( (code.description == ("" || undefined || null)) || (code.description.length <= 0) || (code.code == ("" || undefined || null)) ) {
      return false;
    } 
    else {
      return true;
    }
  }

    validateEditor(editor){
    if( (editor.name == ("" || undefined || null)) ) {
      return false;
    } 
    else if ( (editor.name.length <= 0) ) {
      return false;
    }
    else {
      return true;
    }
  }


  validateOnline(online){
    console.log(online);
    if((online.date == ("" || undefined || null)) || (online.volume == ("" || undefined || null)) || (online.issue == ("" || undefined || null)) ) {
      return false;
    } else {
      return true;
    }
  }


  validatePrintIssue(printIssue){
    if(printIssue.printIssue == "" || undefined || null) {
      return false;
    } else {
      return true;
    }
  }

}