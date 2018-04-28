import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-enterdoc',
  templateUrl: './enterdoc.component.html',
  styleUrls: ['./enterdoc.component.css']
})
export class EnterdocComponent implements OnInit {

  docSection: String;
  docTitle: String;
  docAuthor: String;
  docDescription: String;
  docOnlineIssue: String;
  docPrintIssue: String;
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docPublishDateCMAJnews: Date;
  docNumPagesOnline: Number;
  docNumPagesPrint: Number;
  docOnlineNotes: String;
  docPrintNotes: String;
  docAdConflicts: String;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;
  docDOI: Number;

  username: String;
  sections: [String]; 
  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.sections = config.sections;
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      },
      err => {
        console.log(err);
        return false;
    });
  }

  onDocSubmit(){

    const doc = {
      docUsername: this.username,
      docSection: this.docSection,
      docTitle: this.docTitle, 
      docAuthor: this.docAuthor, 
      docDescription: this.docDescription, 
      docOnlineIssue: this.docOnlineIssue,
      docPrintIssue: this.docPrintIssue,
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNumPagesOnline: this.docNumPagesOnline,
      docNumPagesPrint: this.docNumPagesPrint,
      docOnlineNotes: this.docOnlineNotes,
      docPrintNotes: this.docPrintNotes,
      docAdConflicts: this.docAdConflicts,
      docDOI: this.docDOI,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    }
    
    this.authService.submitDoc(doc).subscribe(data => {
      if(data.success){
        this.router.navigate(['/recent']); 
      } else {
        this.router.navigate(['/enterdoc']); 
        return false;
      }
    });

  }

}
