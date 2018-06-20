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

  docDOI: Number;
  docSection: String;
  docDepartment: String;
  docAuthor: String;
  docTitle: String;
  docFocusArea: String;
  docNotes: String;

  //DOCUMENT DETAILS

  docOpenAccess: Boolean;
  docTranslation: Boolean;
  docPressRelease: Boolean;
  docProfessionalDev: Boolean;
  docNumPages: Number;
  docNumAppendices: Number;
  docRelatedMaterial: String;
  docOutStandingMaterial: String;
  docInvoiceNum: String;

  //MULTIMEDIA

  docMultiMedia: String;
  docPodcastEmbargoLink: String;
  docPodcastPermLink: String;
  docPodcastEmbedCode: String;
  docVideoEmbedCode: String;
  docVideoLink: String;

    //SOCIAL MEDIA

  docURL: String;
  docHashTags: String;
  docSocialSummary: String;
    
  // COLLECTION CODES

  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docCollectionCode5: String;
  docCollectionCode6: String;

  //DOCUMENT TIMELINE

  docAcceptDate: Date;
  docPaymentDate: Date;
  docETOCDate: Date;
  docOnlineIssue: Date;
  docPrintIssue: Date;

  //EDITING TIMELINE

  docEditor: String;
  docCoordinator: String;
  docProofReader: String;
  docSE1: String;
  docSE2: String;
  docEnteredDate: Date;
  docCopyEditBeginDate: Date;
  docCopyEditCompleteDate: Date;
  docSendSEDate: Date;
  docReturnSEDate: Date;
  docSendAuthorDate: Date;
  docReturnAuthorDate: Date;
  docSendFineTune: Date;
  docReturnFineTune: Date;
  docSendProofRead: Date;
  docReturnProofRead: Date;
  docFinalizeDate: Date;

  //ONLINE ISSUE

  docOnlineNotes: String;
  docFirstPageOnline: Number;
  docLastPageOnline: Number;

  //PRINT ISSUE

  docAdConflicts: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  
  //NEWS ONLY

  docPublishDateCMAJnews: Date;
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
  	//this.sections = config.sections;
    this.sections = this.authService.localGetSections(); 
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;

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

      docDOI: this.docDOI,
      docSection: this.docSection,
      docDepartment: this.docDepartment,
      docAuthor: this.docAuthor,
      docTitle: this.docTitle,
      docFocusArea: this.docFocusArea,
      docNotes: this.docNotes,
    
      //DOCUMENT DETAILS
    
      docOpenAccess: this.docOpenAccess,
      docTranslation: this.docTranslation,
      docPressRelease: this.docPressRelease,
      docProfessionalDev: this.docProfessionalDev,
      docNumPages: this.docNumPages,
      docNumAppendices: this.docNumAppendices,
      docRelatedMaterial: this.docRelatedMaterial,
      docOutStandingMaterial: this.docOutStandingMaterial,
      docInvoiceNum: this.docInvoiceNum,
    
      //MULTIMEDIA
    
      docMultiMedia: this.docMultiMedia,
      docPodcastEmbargoLink: this.docPodcastEmbargoLink,
      docPodcastPermLink: this.docPodcastPermLink,
      docPodcastEmbedCode: this.docPodcastEmbedCode,
      docVideoEmbedCode: this.docVideoEmbedCode,
      docVideoLink: this.docVideoLink,
    
      //SOCIAL MEDIA
    
      docURL: this.docURL,
      docHashTags: this.docHashTags,
      docSocialSummary: this.docSocialSummary,
        
      //COLLECTION CODES
    
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,
      docCollectionCode5: this.docCollectionCode5,
      docCollectionCode6: this.docCollectionCode6,
    
      //DOCUMENT TIMELINE
    
      docAcceptDate: this.docAcceptDate,
      docPaymentDate: this.docPaymentDate,
      docETOCDate: this.docETOCDate,
      docOnlineIssue: this.docOnlineIssue,
      docPrintIssue: this.docPrintIssue,
    
      //EDITING TIMELINE
    
      docEditor: this.docEditor,
      docCoordinator: this.docCoordinator,
      docProofReader: this.docProofReader,
      docSE1: this.docSE1,
      docSE2: this.docSE2,
      docEnteredDate: this.docEnteredDate,
      docCopyEditBeginDate: this.docCopyEditBeginDate,
      docCopyEditCompleteDate: this.docCopyEditCompleteDate,
      docSendSEDate: this.docSendSEDate,
      docReturnSEDate: this.docReturnSEDate,
      docSendAuthorDate: this.docSendAuthorDate,
      docReturnAuthorDate: this.docReturnAuthorDate,
      docSendFineTune: this.docSendFineTune,
      docReturnFineTune: this.docReturnFineTune,
      docSendProofRead: this.docSendProofRead,
      docReturnProofRead: this.docReturnProofRead,
      docFinalizeDate: this.docFinalizeDate,
    
      //ONLINE ISSUE
    
      docOnlineNotes: this.docOnlineNotes,
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
    
      //PRINT ISSUE
    
      docAdConflicts: this.docAdConflicts,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      
      //NEWS ONLY
    
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    
    }

    //ADD FORMATTED DATES IF DATES ENTERED
    /*
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
*/

    this.authService.submitDoc(doc).subscribe(data => {
      if(data.success){
        this.router.navigate(['/search']); 
      } else {
        this.router.navigate(['/enterdoc']); 
        return false;
      }
    });

  }

  /*formatDate(date) {
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
  }*/

}
