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
  docETOCDate: Date;
  docPaymentDate: Date;
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

  showNews: Boolean = false;

  constructor(
  	private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showNews = false;
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
      if(this.username == "NewsEditor") {
        this.showNews = true;
        this.docSection = 'News';
        this.getNewsDOI();
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getNewsDOI() {
    this.authService.getNewsDOI().subscribe(doi => {
      this.docDOI = doi[0].docDOI + 1;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDocSubmit(){

    let doc = {
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
      docInvoiceDate: this.docInvoiceDate,
      docInvoiceAmount: this.docInvoiceAmount,

      //TIMELINE
      docAcceptDate: this.docAcceptDate,
      docPublishDate: this.docPublishDate,
      docETOCDate: this.docETOCDate,
      docEnteredDate: this.docEnteredDate,
      docCopyEditBeginDate: this.docCopyEditBeginDate,
      docCopyEditCompleteDate: this.docCopyEditCompleteDate,
      docSendSEDate: this.docSendSEDate,
      docReturnSEDate: this.docReturnSEDate, 
      docSendAuthorDate: this.docSendAuthorDate,
      docReturnAuthorDate: this.docReturnAuthorDate,
      docFinalizeDate: this.docFinalizeDate, 
      docPaymentDate: this.docPaymentDate, 

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
      docNewsAuthorType: this.docNewsAuthorType,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    }

    //ADD FORMATTED DATES IF DATES ENTERED
    if(this.docCommissionDate) 
      doc['docCommissionDateFormatted'] = this.formatDate(new Date(this.docCommissionDate));
    if(this.docInvoiceDate) 
      doc['docInvoiceDateFormatted'] = this.formatDate(new Date(this.docInvoiceDate)); 
    if(this.docAcceptDate) 
      doc['docAcceptDateFormatted'] = this.formatDate(new Date(this.docAcceptDate)); 
    if(this.docPublishDate) 
      doc['docPublishDateFormatted'] = this.formatDate(new Date(this.docPublishDate)); 
    if(this.docETOCDate) 
      doc['docETOCDateFormatted'] = this.formatDate(new Date(this.docETOCDate)); 
    if(this.docPaymentDate) 
      doc['docPaymentDateFormatted'] = this.formatDate(new Date(this.docPaymentDate)); 
    if(this.docEnteredDate)
      doc['docEnteredDateFormatted'] = this.formatDate(new Date(this.docEnteredDate)); 
    if(this.docCopyEditBeginDate)
      doc['docCopyEditBeginDateFormatted'] = this.formatDate(new Date(this.docCopyEditBeginDate)); 
    if(this.docCopyEditCompleteDate)
      doc['docCopyEditCompleteDateFormatted'] = this.formatDate(new Date(this.docCopyEditCompleteDate)); 
    if(this.docSendSEDate)
      doc['docSendSEDateFormatted'] = this.formatDate(new Date(this.docSendSEDate)); 
    if(this.docReturnSEDate)
      doc['docReturnSEDateFormatted'] = this.formatDate(new Date(this.docReturnSEDate)); 
    if(this.docSendAuthorDate)
      doc['docSendAuthorDateFormatted'] = this.formatDate(new Date(this.docSendAuthorDate)); 
    if(this.docReturnAuthorDate)
      doc['docReturnAuthorDateFormatted'] = this.formatDate(new Date(this.docReturnAuthorDate)); 
    if(this.docFinalizeDate)
      doc['docFinalizeDateFormatted'] = this.formatDate(new Date(this.docFinalizeDate)); 
    if(this.docPublishDateCMAJnews)
      doc['docPublishDateCMAJnewsFormatted'] = this.formatDate(new Date(this.docPublishDateCMAJnews)); 
    if(this.docNewsCommissionDate)
      doc['docNewsCommissionDateFormatted'] = this.formatDate(new Date(this.docNewsCommissionDate)); 
    if(this.docNewsInvoiceDate)
      doc['docNewsInvoiceDateFormatted'] = this.formatDate(new Date(this.docNewsInvoiceDate)); 

    console.log(doc);

    this.authService.submitDoc(doc).subscribe(data => {
      if(data.success){
        this.router.navigate(['/search']); 
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
