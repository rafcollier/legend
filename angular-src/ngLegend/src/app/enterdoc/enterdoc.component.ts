import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

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


  //DOCUMENT DETAILS
  docOpenAccess: Boolean;
  docTranslation: Boolean;
  docPressRelease: Boolean;
  docProfessionalDev: Boolean;
  docNumPages: Number;
  docNumFigures: Number;
  docNumTables: Number;
  docNumAppendices: Number;
  docRelatedMaterial: String;
  docOutStandingMaterial: String;
  docInvoiceNum: String;
  docShortTitle: String;
  docWebBlurb: String;

  //MULTIMEDIA
  docMultiMedia1: String;
  docMultiMedia2: String;
  docMultiMedia3: String;
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
  docStatus: String;

  //NOTES
  docNotes: String;
  docOnlineNotes: String;
  docPrintNotes: String;

  //ONLINE ISSUE
  docFirstPageOnline: Number;
  docLastPageOnline: Number;
  docOnlinePosition:Number;

  //PRINT ISSUE
  docAdConflicts: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docPrintPosition: Number; 
  
  //NEWS ONLY
  docNewsReady: Date;
  docPublishDateCMAJnews: Date;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;

  //Generated from login user
  username: String;

  //loaded from config data 
  sections: Object[] = []; 
  departments: String[] = []; 
  configFile: Object;

  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 
  editors: [String]; 
  coordinators: [String]; 
  proofers: [String]; 
  se1s: [String]; 
  multimedia: [String]; 
  focusareas: [String]; 

  showNews: Boolean = false;
  showLetter: Boolean = false;

  onlineOrder: [Object];

  constructor(
  	private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.showNews = false;
    this.showLetter = false;

    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.departments = this.authService.localGetDepartments(); 

    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;
    this.multimedia = config.multimedia;
    this.focusareas = config.focusareas;
    this.onlineOrder = config.onlineorder;

    //Get name of section from previous screen.
    this.route.params.subscribe(params => {
      this.docSection = params['section'];
      if (this.docSection.toLowerCase() == "news") { 
        this.showNews = true;
        this.getNewsDOI();
      }
      else if (this.docSection.toLowerCase() == "letter") {
        this.showLetter = true;
      }

    });
  }

  //Get highest value DOI from database for news article and increment by 1 for current DOI. 
  getNewsDOI() {
    console.log(this.configFile);
    this.authService.getNewsDOI().subscribe(doi => {
      if(doi.length == 0) {
        this.docDOI = this.configFile['firstNewsDOI'] + 1;
      }
      else {
      this.docDOI = doi[0].docDOI + 1;
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getOnlinePositions() {

    let tempArr = [];

    //Use print and online position of sections with departments. 
    if(this.docDepartment) {
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i]['department'].toLowerCase() == this.docDepartment.toLowerCase()) {
          tempArr.push(this.sections[i]['onlinePosition']);
          tempArr.push(this.sections[i]['printPosition']);
          return tempArr;
        }
      }
    }

    //If no department, use print and online positions of sections.
    else if(this.docSection) {
      for (let j = 0; j < this.sections.length; j++) {
        if (!(this.sections[j]['department']) && (this.sections[j]['section'].toLowerCase() == this.docSection.toLowerCase())) {
          tempArr.push(this.sections[j]['onlinePosition']);
          tempArr.push(this.sections[j]['printPosition']);
          return tempArr;
        }
      }
    }

  }

  getStatus() {

    if(this.docFinalizeDate) {
      return "8 - Final";  
    }
    else if (this.docSendProofRead) {
      return "7 - Proof Reading";
    } 
    else if (this.docSendFineTune) {
      return "6 - Fine Tuning";
    } 
    else if (this.docSendAuthorDate) {
      return "5 - Author Review";
    } 
    else if (this.docSendSEDate) {
      return "4 - SE Review";
    } 
    else if (this.docCopyEditBeginDate) {
      return "3 - Copy Edit";
    } 
    else if (this.docEnteredDate) {
      return "2 - InCopy";
    }
    else if (this.docAcceptDate) {
      return "1 - Accepted";
    }
    else {
      return "0 - No Status";
    }

  }

  getNewsStatus() {
    if(this.docPublishDateCMAJnews) {
      return "C - News Posted";
    }
    else if(this.docNewsReady) {
      return "B - News Ready";
    }
    else {
      return "A - News In Edit";
    }
  }

  onDocSubmit(){

 
    let positions = this.getOnlinePositions(); 
    this.docOnlinePosition = positions[0];
    this.docPrintPosition = positions[1];

    if (this.docSection != "News") {
      this.docETOCDate = this.docOnlineIssue;
      this.docStatus = this.getStatus();
    } else {
      this.docStatus = this.getNewsStatus();
    }


    let doc = {

      docUsername: this.username,

      //GENERAL FIELDS

      docDOI: this.docDOI,
      docSection: this.docSection,
      docDepartment: this.docDepartment,
      docAuthor: this.docAuthor,
      docTitle: this.docTitle,
      docFocusArea: this.docFocusArea,
    
      //DOCUMENT DETAILS
    
      docOpenAccess: this.docOpenAccess,
      docTranslation: this.docTranslation,
      docPressRelease: this.docPressRelease,
      docProfessionalDev: this.docProfessionalDev,
      docNumPages: this.docNumPages,
      docNumFigures: this.docNumFigures,
      docNumTables: this.docNumTables,
      docNumAppendices: this.docNumAppendices,
      docRelatedMaterial: this.docRelatedMaterial,
      docOutStandingMaterial: this.docOutStandingMaterial,
      docInvoiceNum: this.docInvoiceNum,
      docShortTitle: this.docShortTitle,
      docWebBlurb: this.docWebBlurb,
    
      //MULTIMEDIA
    
      docMultiMedia1: this.docMultiMedia1,
      docMultiMedia2: this.docMultiMedia2,
      docMultiMedia3: this.docMultiMedia3,
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
      docStatus: this.docStatus,
   
      //NOTES 
      docNotes: this.docNotes,
      docOnlineNotes: this.docOnlineNotes,
      docPrintNotes: this.docPrintNotes,

      //ONLINE ISSUE
    
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docOnlinePosition: this.docOnlinePosition,
    
      //PRINT ISSUE
    
      docAdConflicts: this.docAdConflicts,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docPrintPosition: this.docPrintPosition,
      
      //NEWS ONLY
    
      docNewsReady: this.docNewsReady,
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    
    }

    this.authService.submitDoc(doc).subscribe(data => {
      if(data.success){
        this.router.navigate(['/search']); 
      } else {
        this.router.navigate(['/enterdoc']); 
        return false;
      }
    });

  }

}
