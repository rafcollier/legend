import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import * as moment from 'moment';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private sub: any;
  detailsID: String;	
  username: String; //currently logged in user
  oneDoc: Object;
  editDoc: Boolean = false;
  showNews: Boolean = false;
  showLetter: Boolean = false;
  docUsername: String; //user who entered document originally
  docID: String; //unique ID for database entry

  //from config
  configFile: Object;
  onlineOrder: [Object];

  sections: [String]; 
  departments: [String]; 
  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 
  authortypes: [String]; 
  editors: [String]; 
  coordinators: [String]; 
  proofers: [String]; 
  se1s: [String]; 
  multimedia: [String]; 
  focusareas: [String]; 

  //Same as in Enter Document Component

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

  //FORMATTED DATES FOR DISPLAY

  docAcceptDateFormatted: String;
  docPaymentDateFormatted: String;
  docETOCDateFormatted: String;
  docOnlineIssueFormatted: String;
  docPrintIssueFormatted: String;

  docEnteredDateFormatted: String;
  docCopyEditBeginDateFormatted: String;
  docCopyEditCompleteDateFormatted: String;
  docSendSEDateFormatted: String;
  docReturnSEDateFormatted: String;
  docSendAuthorDateFormatted: String;
  docReturnAuthorDateFormatted: String;
  docSendFineTuneDateFormatted: String;
  docReturnFineTuneDateFormatted: String;
  docSendProofReadDateFormatted: String;
  docReturnProofReadDateFormatted: String;
  docFinalizeDateFormatted: String;

  docNewsReadyFormatted: String;
  docPublishDateCMAJnewsFormatted: String; 
  docNewsCommissionDateFormatted: String;
  docNewsInvoiceDateFormatted: String;

  constructor(
  	private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { } 

    ngOnInit() {

    this.editDoc = false;
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

    this.route.params.subscribe(params => {
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
      this.docID = doc._id;

      if(doc.docSection == "News") {
        this.showNews = true;
      }
      else if (doc.docSection == "Letter") {
        this.showLetter = true;
      }

      //GENERAL FIELDS

      this.docDOI = doc.docDOI;
      this.docSection = doc.docSection;
      this.docDepartment = doc.docDepartment;
      this.docAuthor = doc.docAuthor;
      this.docTitle = doc.docTitle;
      this.docFocusArea = doc.docFocusArea;
    
      //DOCUMENT DETAILS
    
      this.docOpenAccess = doc.docOpenAccess;
      this.docTranslation = doc.docTranslation;
      this.docPressRelease = doc.docPressRelease;
      this.docProfessionalDev = doc.docProfessionalDev;
      this.docNumPages = doc.docNumPages;
      this.docNumFigures = doc.docNumFigures;
      this.docNumTables = doc.docNumTables;
      this.docNumAppendices = doc.docNumAppendices;
      this.docRelatedMaterial = doc.docRelatedMaterial;
      this.docOutStandingMaterial = doc.docOutStandingMaterial;
      this.docInvoiceNum = doc.docInvoiceNum;
      this.docShortTitle = doc.docShortTitle;
      this.docWebBlurb = doc.docWebBlurb;
    
      //MULTIMEDIA
    
      this.docMultiMedia1 = doc.docMultiMedia1;
      this.docMultiMedia2 = doc.docMultiMedia2;
      this.docMultiMedia3 = doc.docMultiMedia3;
      this.docPodcastEmbargoLink = doc.docPodcastEmbargoLink;
      this.docPodcastPermLink = doc.docPodcastPermLink;
      this.docPodcastEmbedCode = doc.docPodcastEmbedCode;
      this.docVideoEmbedCode = doc.docVideoEmbedCode;
      this.docVideoLink = doc.docVideoLink;
    
      //SOCIAL MEDIA
    
      this.docURL = doc.docURL;
      this.docHashTags = doc.docHashTags;
      this.docSocialSummary = doc.docSocialSummary;
        
      //COLLECTION CODES
    
      this.docCollectionCode1 = doc.docCollectionCode1;
      this.docCollectionCode2 = doc.docCollectionCode2;
      this.docCollectionCode3 = doc.docCollectionCode3;
      this.docCollectionCode4 = doc.docCollectionCode4;
      this.docCollectionCode5 = doc.docCollectionCode5;
      this.docCollectionCode6 = doc.docCollectionCode6;
    
      //DOCUMENT TIMELINE
    
      this.docAcceptDate = doc.docAcceptDate;
      this.docPaymentDate = doc.docPaymentDate;
      this.docETOCDate = doc.docETOCDate;
      this.docOnlineIssue = doc.docOnlineIssue;
      this.docPrintIssue = doc.docPrintIssue;
    
      //EDITING TIMELINE
    
      this.docEditor = doc.docEditor;
      this.docCoordinator = doc.docCoordinator;
      this.docProofReader = doc.docProofReader;
      this.docSE1 = doc.docSE1;
      this.docSE2 = doc.docSE2;
      this.docEnteredDate = doc.docEnteredDate;
      this.docCopyEditBeginDate = doc.docCopyEditBeginDate;
      this.docCopyEditCompleteDate = doc.docCopyEditCompleteDate;
      this.docSendSEDate = doc.docSendSEDate;
      this.docReturnSEDate = doc.docReturnSEDate;
      this.docSendAuthorDate = doc.docSendAuthorDate;
      this.docReturnAuthorDate = doc.docReturnAuthorDate;
      this.docSendFineTune = doc.docSendFineTune;
      this.docReturnFineTune = doc.docReturnFineTune;
      this.docSendProofRead = doc.docSendProofRead;
      this.docReturnProofRead = doc.docReturnProofRead;
      this.docFinalizeDate = doc.docFinalizeDate;
      this.docStatus = doc.docStatus;

      //NOTES
      this.docNotes = doc.docNotes;
      this.docOnlineNotes = doc.docOnlineNotes;
      this.docPrintNotes = doc.docPrintNotes;
    
      //ONLINE ISSUE
    
      this.docFirstPageOnline = doc.docFirstPageOnline;
      this.docLastPageOnline = doc.docLastPageOnline;
      this.docOnlinePosition = doc.docOnlinePosition;
    
      //PRINT ISSUE
    
      this.docAdConflicts = doc.docAdConflicts;
      this.docFirstPagePrint = doc.docFirstPagePrint;
      this.docLastPagePrint = doc.docLastPagePrint;
      this.docPrintPosition = doc.docPrintPosition;
      
      //NEWS ONLY
    
      this.docNewsReady = doc.docNewsReady;
      this.docPublishDateCMAJnews = doc.docPublishDateCMAJnews;
      this.docNewsCommissionDate = doc.docNewsCommissionDate;
      this.docNewsInvoiceDate = doc.docNewsInvoiceDate;
      this.docNewsInvoiceAmount = doc.docNewsInvoiceAmount; 

      //FORMATTED DATE FIELDS
      this.docAcceptDateFormatted = moment(doc.docAcceptDate).format('MMMM DD, YYYY');
      this.docPaymentDateFormatted = moment(doc.docPaymentDate).format('MMMM DD, YYYY');
      this.docETOCDateFormatted = moment(doc.docETOCDate).format('MMMM DD, YYYY');
      this.docOnlineIssueFormatted = moment(doc.docOnlineIssue).format('MMMM DD, YYYY');
      this.docPrintIssueFormatted = moment(doc.docPrintIssue).format('MMMM YYYY');

      this.docEnteredDateFormatted = moment(doc.docEnteredDate).format('MMMM DD, YYYY');
      this.docCopyEditBeginDateFormatted = moment(doc.docCopyEditBeginDate).format('MMMM DD, YYYY');
      this.docCopyEditCompleteDateFormatted = moment(doc.docCopyEditCompleteDate).format('MMMM DD, YYYY');
      this.docSendSEDateFormatted = moment(doc.docSendSEDate).format('MMMM DD, YYYY');
      this.docReturnSEDateFormatted = moment(doc.docReturnSEDate).format('MMMM DD, YYYY');
      this.docSendAuthorDateFormatted = moment(doc.docSendAuthorDate).format('MMMM DD, YYYY');
      this.docReturnAuthorDateFormatted = moment(doc.docReturnAuthorDate).format('MMMM DD, YYYY');
      this.docSendFineTuneDateFormatted = moment(doc.docSendFineTune).format('MMMM DD, YYYY');
      this.docReturnFineTuneDateFormatted = moment(doc.docReturnFineTune).format('MMMM DD, YYYY');
      this.docSendProofReadDateFormatted = moment(doc.docSendProofRead).format('MMMM DD, YYYY');
      this.docReturnProofReadDateFormatted = moment(doc.docReturnProofRead).format('MMMM DD, YYYY');
      this.docFinalizeDateFormatted = moment(doc.docFinalizeDate).format('MMMM DD, YYYY');

      this.docNewsReadyFormatted = moment(doc.docNewsReady).format('MMMM DD, YYYY');
      this.docPublishDateCMAJnewsFormatted = moment(doc.docPublishDateCMAJnews).format('MMMM DD, YYYY');
      this.docNewsCommissionDateFormatted = moment(doc.docNewsCommissionDate).format('MMMM DD, YYYY');
      this.docNewsInvoiceDateFormatted = moment(doc.docNewsInvoiceDate).format('MMMM DD, YYYY');

    },
    err => {
      console.log(err);
      return false;
    });

  }

  onDeleteDocSubmit() {
    if(confirm("Are you sure you want to delete this document?")) {
      this.authService.deleteOneDoc(this.docID).subscribe(doc => {
      },
      err => {
        console.log(err);
        return false;
      });
      this.router.navigate(['/search']);
    }
  }

  onEditDocSubmit() {
    this.editDoc = true;
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


  onEditedDocSubmit() {

    let positions = this.getOnlinePositions(); 
    this.docOnlinePosition = positions[0];
    this.docPrintPosition = positions[1];

    if (this.docSection != "News") {
      this.docETOCDate = this.docOnlineIssue;
      this.docStatus = this.getStatus();
    } else {
      this.docStatus = this.getNewsStatus();
    }

    let editedDoc = {
 
      docID: this.docID, //to identify this doc in database
      
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
    
      //PRINT ISSUE
    
      docAdConflicts: this.docAdConflicts,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      
      //NEWS ONLY
    
      docNewsReady: this.docNewsReady,
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount

    }

    console.log(editedDoc);

    this.authService.putUpdateDoc(editedDoc).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/search']);
  }

}
