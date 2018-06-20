import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.username == ("" || undefined) || user.password == ("" || undefined)) {
      return false;
    } else {
      return true;
    }
  }

  validateSection(section){
    if(section.section == "" || undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePrintIssue(printIssue){
    if(printIssue.printIssue == "" || undefined) {
      return false;
    } else {
      return true;
    }
  }

}