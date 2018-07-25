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
  //docDOI: String;
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
  //docNumPages: Number;
  docNumPages: String;
  docNumTables: String;
  docNumFigures: String;
  //docNumAppendices: Number;
  docNumAppendices: String;
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

  //NOTES 
  docNotes: String;
  docOnlineNotes: String;
  docPrintNotes: String;

  //ONLINE ISSUE

  docFirstPageOnline: Number;
  docLastPageOnline: Number;
  docOnlinePosition: Number;

  //PRINT ISSUE

  docAdConflicts: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  
  //NEWS ONLY

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
    this.sections = this.authService.localGetSections(); 
    this.departments = config.departments;
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;
    this.multimedia = config.multimedia;
    this.focusareas = config.focusareas;
    this.authortypes = config.authortypes;

    this.username = this.authService.loadUsername();

    this.route.params.subscribe(params => {
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
      this.docID = doc._id;

      if(doc.docSection == "News") {
        console.log("news");
        this.showNews = true;
      }
      else if (doc.docSection == "Letter") {
        console.log("letter");
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

      //NOTES
      this.docNotes = doc.docNotes;
      this.docOnlineNotes = doc.docOnlineNotes;
      this.docPrintNotes = doc.docPrintNotes;
    
      //ONLINE ISSUE
    
      this.docFirstPageOnline = doc.docFirstPageOnline;
      this.docLastPageOnline = doc.docLastPageOnline;
    
      //PRINT ISSUE
    
      this.docAdConflicts = doc.docAdConflicts;
      this.docFirstPagePrint = doc.docFirstPagePrint;
      this.docLastPagePrint = doc.docLastPagePrint;
      
      //NEWS ONLY
    
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
      this.docReturnAuthorDateFormatted = moment(doc.docReturnAuthorDateF).format('MMMM DD, YYYY');
      this.docSendFineTuneDateFormatted = moment(doc.docSendFineTuneDate).format('MMMM DD, YYYY');
      this.docReturnFineTuneDateFormatted = moment(doc.docReturnFineTuneDate).format('MMMM DD, YYYY');
      this.docSendProofReadDateFormatted = moment(doc.docSendProofReadDate).format('MMMM DD, YYYY');
      this.docReturnProofReadDateFormatted = moment(doc.docReturnProofReadDate).format('MMMM DD, YYYY');
      this.docFinalizeDateFormatted = moment(doc.docFinalizeDate).format('MMMM DD, YYYY');

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
    this.authService.deleteOneDoc(this.docID).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/search']);
  }

  onEditDocSubmit() {
    this.editDoc = true;
  }

  onEditedDocSubmit() {
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
    
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount

    }

    this.authService.putUpdateDoc(editedDoc).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/search']);
  }

}
