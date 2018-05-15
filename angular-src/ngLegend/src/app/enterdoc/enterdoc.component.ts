import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

import * as moment from 'moment';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-enterdoc',
  templateUrl: './enterdoc.component.html',
  styleUrls: ['./enterdoc.component.css']
})
export class EnterdocComponent implements OnInit {
 
  //GENERAL FIELDS
  docTitle: String;
  docAuthor: String;
  docDOI: Number;
  docSection: String;
  docDescription: String;
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docAuthorType: String;
  docCommissionDate: Date;
  docInvoiceDate: Date;
  docInvoiceAmount: Number;

  //TIMELINE

  docAcceptDate: Date;
  docPublishDate: Date;
  docEnteredDate: Date;
  docCopyEditBeginDate: Date;
  docCopyEditCompleteDate: Date;
  docSendSEDate: Date;
  docReturnSEDate: Date;
  docSendAuthorDate: Date;
  docReturnAuthorDate: Date;
  docFinalizeDate: Date;

  //EDITORS
  docEditor: String;
  docCoordinator: String;
  docProofReader: String;
  docSE1: String;
  docSE2: String;

  //YES OR NO FIELDS
  docOpenAccess: Boolean; 
  docTranslation: Boolean;
  
  //ONLINE ISSUE

  docOnlineIssue: String;
  docFirstPageOnline: Number;
  docLastPageOnline: Number;
  docNumPagesOnline: Number;
  docOnlineNotes: String;

  //PRINT ISSUE

  docPrintIssue: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docNumPagesPrint: Number;
  docPrintNotes: String;
  docAdConflicts: String;

  //NEWS ONLY
  docPublishDateCMAJnews: Date; 
  docNewsAuthorType: String;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;

  //Generated from login user
  username: String;

  //loaded from config file
  sections: [String]; 
  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 
  authortypes: [String]; 
  editors: [String]; 
  coordinators: [String]; 
  proofers: [String]; 
  se1s: [String]; 

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  	this.sections = config.sections;
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;
    this.authortypes = config.authortypes;
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
       //GENERAL FIELDS 
    
      docTitle: this.docTitle,
      docAuthor: this.docAuthor,
      docDOI: this.docDOI,
      docSection: this.docSection,
      docDescription: this.docDescription,
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,    
      docAuthorType: this.docAuthorType,
      docCommissionDate: this.docCommissionDate,
      docCommissionDateFormatted: this.formatDate(new Date(this.docCommissionDate)), 
      docInvoiceDate: this.docInvoiceDate,
      docInvoiceDateFormatted: this.formatDate(new Date(this.docInvoiceDate)), 
      docInvoiceAmount: this.docInvoiceAmount,

      //TIMELINE
      docAcceptDate: this.docAcceptDate,
      docAcceptDateFormatted: this.formatDate(new Date(this.docAcceptDate)), 
      docPublishDate: this.docPublishDate,
      docPublishDateFormatted: this.formatDate(new Date(this.docPublishDate)), 
      docEnteredDate: this.docEnteredDate,
      docEnteredDateFormatted: this.formatDate(new Date(this.docEnteredDate)), 
      docCopyEditBeginDate: this.docCopyEditBeginDate,
      docCopyEditBeginDateFormatted: (this.formatDate(new Date(this.docCopyEditBeginDate))) || undefined, 
      docCopyEditCompleteDate: this.docCopyEditCompleteDate,
      docCopyEditCompleteDateFormatted: (this.formatDate(new Date(this.docCopyEditCompleteDate))) || undefined, 
      docSendSEDate: this.docSendSEDate,
      docSendSEDateFormatted: this.formatDate(new Date(this.docSendSEDate)), 
      docReturnSEDate: this.docReturnSEDate, 
      docReturnSEDateFormatted: this.formatDate(new Date(this.docReturnSEDate)), 
      docSendAuthorDate: this.docSendAuthorDate,
      docSendAuthorDateFormatted: this.formatDate(new Date(this.docSendAuthorDate)), 
      docReturnAuthorDate: this.docReturnAuthorDate,
      docReturnAuthorDateFormatted: this.formatDate(new Date(this.docReturnAuthorDate)), 
      docFinalizeDate: this.docFinalizeDate, 
      docFinalizeDateFormatted: this.formatDate(new Date(this.docFinalizeDate)), 

      //EDITORS
      docEditor: this.docEditor,
      docCoordinator: this.docCoordinator,
      docProofReader: this.docProofReader,
      docSE1: this.docSE1,
      docSE2: this.docSE2,  

      //YES OR NO FIELDS
      docOpenAccess: this.docOpenAccess,
      docTranslation: this.docTranslation,

      //ONLINE ISSUE

      docOnlineIssue: this.docOnlineIssue,
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docNumPagesOnline: this.docNumPagesOnline,
      docOnlineNotes: this.docOnlineNotes,

      //PRINT ISSUE

      docPrintIssue: this.docPrintIssue,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docNumPagesPrint: this.docNumPagesPrint,
      docPrintNotes: this.docPrintNotes,
      docAdConflicts: this.docAdConflicts,

      //NEWS ONLY

      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docPublishDateCMAJnewsFormatted: this.formatDate(new Date(this.docPublishDateCMAJnews)), 
      docNewsAuthorType: this.docNewsAuthorType,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsCommissionDateFormatted: this.formatDate(new Date(this.docNewsCommissionDate)), 
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceDateFormatted: this.formatDate(new Date(this.docNewsInvoiceDate)), 
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    }
   
    console.log(doc);

    this.authService.submitDoc(doc).subscribe(data => {
      if(data.success){
        this.router.navigate(['/recent']); 
      } else {
        this.router.navigate(['/enterdoc']); 
        return false;
      }
    });

  }

  formatDate(date) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return (monthNames[month] + " " + day + ", " + year);
  }

}
