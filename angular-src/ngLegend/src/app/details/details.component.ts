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
  showAd: Boolean = false;
  showFrench: Boolean = false;
  showOther: Boolean = false;
  docUsername: String; //user who entered document originally
  docID: String; //unique ID for database entry

  //from config
  configFile: Object;
  onlineOrder: [Object];

  sections: [String]; 
  sectionsUnique: [String]; 
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

  prevOnlineIssue: Object;

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
  docNumBoxes: Number;
  docNumTables: Number;
  docNumAppendices: Number;
  docRelatedMaterial: String;
  docOutStandingMaterial: String;
  docInvoiceNum: String;
  docShortTitle: String;
  docWebBlurb: String;
  docWebImageURL: String;
  docWebImageCredit: String;

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
  docOnlineVolume:Number;
  docOnlineIssueNumber:Number;

  //PRINT ISSUE
  docAdConflicts: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docPrintPosition: Number; 


  //PRINT ADS
  docAdClient: String;
  docAdDescription: String; 
  docAdSize: Number; 
  docAdFirstPagePrint: Number;
  docAdLastPagePrint: Number; 
  
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

  docEnteredDateFormatted: String = "";
  docCopyEditBeginDateFormatted: String = "";
  docCopyEditCompleteDateFormatted: String = "";
  docSendSEDateFormatted: String = "";
  docReturnSEDateFormatted: String = "";
  docSendAuthorDateFormatted: String = "";
  docReturnAuthorDateFormatted: String = "";
  docSendFineTuneDateFormatted: String = "";
  docReturnFineTuneDateFormatted: String = "";
  docSendProofReadDateFormatted: String = "";
  docReturnProofReadDateFormatted: String = "";
  docFinalizeDateFormatted: String = "";

  docNewsReadyFormatted: String = "";
  docPublishDateCMAJnewsFormatted: String = ""; 
  docNewsCommissionDateFormatted: String = "";
  docNewsInvoiceDateFormatted: String = "";

  constructor(
  	private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { } 

    ngOnInit() {

    this.editDoc = false;
    this.showNews = false;
    this.showLetter = false;
    this.showAd = false;
    this.showFrench = false;
    this.showOther = false;

    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.sectionsUnique = this.authService.localGetUniqueSections();
    console.log(this.sections);
    this.departments = this.authService.localGetDepartments(); 


    //this.onlineIssues = config.onlineIssues;
    //this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;
    this.multimedia = config.multimedia;
    this.focusareas = config.focusareas;
    //this.onlineOrder = config.onlineorder;

    this.route.params.subscribe(params => {
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
      console.log(doc);
      this.docID = doc._id;

      if (doc.docSection.toLowerCase() == "news") { 
        this.showNews = true;
      }
      else if (doc.docSection.toLowerCase() == "letter") {
        this.showLetter = true;
      }
      else if (doc.docSection.toLowerCase() == "print ad") {
        this.showAd = true;
        this.docTitle = this.docSection;
      }
      else if (doc.docSection.toLowerCase() == "dans le cmaj") {
        this.showFrench = true;
        this.docTitle = this.docSection;
      }
      else {
        this.showOther = true;
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
      this.docNumBoxes = doc.docNumBoxes;
      this.docNumTables = doc.docNumTables;
      this.docNumAppendices = doc.docNumAppendices;
      this.docRelatedMaterial = doc.docRelatedMaterial;
      this.docOutStandingMaterial = doc.docOutStandingMaterial;
      this.docInvoiceNum = doc.docInvoiceNum;
      this.docShortTitle = doc.docShortTitle;
      this.docWebBlurb = doc.docWebBlurb;
      this.docWebImageURL = doc.docWebImageURL;
      this.docWebImageCredit = doc.docWebImageCredit;
    
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
      this.docOnlineVolume = doc.docOnlineVolume;
      this.docOnlineIssueNumber = doc.docOnlineIssueNumber; 
    
      //PRINT ISSUE
    
      this.docAdConflicts = doc.docAdConflicts;
      this.docFirstPagePrint = doc.docFirstPagePrint;
      this.docLastPagePrint = doc.docLastPagePrint;
      this.docPrintPosition = doc.docPrintPosition;


      //PRINT ADS
      this.docAdClient = doc.docAdClient; 
      this.docAdDescription = doc.docAdDescription; 
      this.docAdSize = doc.docAdSize; 
      this.docAdFirstPagePrint = doc.docAdFirstPagePrint; 
      this.docAdLastPagePrint = doc.docAdLastPagePrint;
      
      //NEWS ONLY
    
      this.docNewsReady = doc.docNewsReady;
      this.docPublishDateCMAJnews = doc.docPublishDateCMAJnews;
      this.docNewsCommissionDate = doc.docNewsCommissionDate;
      this.docNewsInvoiceDate = doc.docNewsInvoiceDate;
      this.docNewsInvoiceAmount = doc.docNewsInvoiceAmount; 

      //FORMATTED DATE FIELDS
      if(doc.docAcceptDate) {
        this.docAcceptDateFormatted = moment(doc.docAcceptDate).format('MMMM DD, YYYY');
      }
      if(doc.docPaymentDate) {
        this.docPaymentDateFormatted = moment(doc.docPaymentDate).format('MMMM DD, YYYY');
      }
      if(doc.docETOCDate) {
        this.docETOCDateFormatted = moment(doc.docETOCDate).format('MMMM DD, YYYY');
      }
      if(doc.docOnlineIssue) {
        this.docOnlineIssueFormatted = moment(doc.docOnlineIssue).format('MMMM DD, YYYY');
      }
      if(doc.docPrintIssue) {
        this.docPrintIssueFormatted = moment(doc.docPrintIssue).format('MMMM YYYY');
      }
      if(doc.docEnteredDate) {
        this.docEnteredDateFormatted = moment(doc.docEnteredDate).format('MMMM DD, YYYY');
      }
      if(doc.docCopyEditBeginDate) {
        this.docCopyEditBeginDateFormatted = moment(doc.docCopyEditBeginDate).format('MMMM DD, YYYY');
      }
      if(doc.docCopyEditCompleteDate) {
        this.docCopyEditCompleteDateFormatted = moment(doc.docCopyEditCompleteDate).format('MMMM DD, YYYY');
      }
      if(doc.docSendSEDate) {
        this.docSendSEDateFormatted = moment(doc.docSendSEDate).format('MMMM DD, YYYY');
      }
      if(doc.docReturnSEDate) {
        this.docReturnSEDateFormatted = moment(doc.docReturnSEDate).format('MMMM DD, YYYY');
      }
      if(doc.docSendAuthorDate) {
        this.docSendAuthorDateFormatted = moment(doc.docSendAuthorDate).format('MMMM DD, YYYY');
      }
      if(doc.docReturnAuthorDate) {
        this.docReturnAuthorDateFormatted = moment(doc.docReturnAuthorDate).format('MMMM DD, YYYY');
      }
      if(doc.docSendFineTune) {
        this.docSendFineTuneDateFormatted = moment(doc.docSendFineTune).format('MMMM DD, YYYY');
      }
      if(doc.docReturnFineTune) {
        this.docReturnFineTuneDateFormatted = moment(doc.docReturnFineTune).format('MMMM DD, YYYY');
      }
      if(doc.docSendProofRead) {
        this.docSendProofReadDateFormatted = moment(doc.docSendProofRead).format('MMMM DD, YYYY');
      }
      if(doc.docReturnProofRead) {
        this.docReturnProofReadDateFormatted = moment(doc.docReturnProofRead).format('MMMM DD, YYYY');
      }
      if(doc.docFinalizeDate) {
        this.docFinalizeDateFormatted = moment(doc.docFinalizeDate).format('MMMM DD, YYYY');
      }
      if(doc.docNewsReady) {
        this.docNewsReadyFormatted = moment(doc.docNewsReady).format('MMMM DD, YYYY');
      }
      if(doc.docPublishDateCMAJnews) {
        this.docPublishDateCMAJnewsFormatted = moment(doc.docPublishDateCMAJnews).format('MMMM DD, YYYY');
      }
      if(doc.docNewsCommissionDate) {
        this.docNewsCommissionDateFormatted = moment(doc.docNewsCommissionDate).format('MMMM DD, YYYY');
      }
      if(doc.docNewsInvoiceDate) {
        this.docNewsInvoiceDateFormatted = moment(doc.docNewsInvoiceDate).format('MMMM DD, YYYY');
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }
  
  //The button to edit the document was pushed so make fields ready for edit
  onEditDocSubmit() {
    this.editDoc = true;
  }
  
  //The button to delete the document was pushed
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

  //The button to submit the edited document was pushed
  onEditedDocSubmit() {
    if(this.docOnlineIssue) {
      console.log("Calling load previous issue.");
      this.loadPrevOnlineIssue();
    }
    else {
      this.getPositions();
    }
  }

  loadPrevOnlineIssue() {
    this.authService.getCheckPreviousOnlineIssue(this.docOnlineIssue).subscribe(entries => {
      if(entries.length > 0) {
        this.prevOnlineIssue = entries[0];
        console.log("Previous issue: ");
        console.log(this.prevOnlineIssue);
      }
      console.log("Calling get online issue volume.");
      this.getOnlineVolume();
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  getOnlineVolume() {
    let date1 = moment(this.docOnlineIssue);
    let date2 = moment(this.configFile["firstOnlineDate"]);
    //The date matches first date in configuration file 
    let match = date1.isSame(date2);
    let year1 = date1.year();
    let year2 = date2.year();
    let yearDiff = year1 - year2;
    
    //Add year difference from configuration volume to get current volume
    //Check if year of current issue differs from previous issue to roll over issue number for new year
    if(match) {
      this.docOnlineVolume = this.configFile["firstOnlineVolume"];
      this.docOnlineIssueNumber = this.configFile["firstOnlineIssue"];
      this.getPositions();
    }
    else {
      this.docOnlineVolume = this.configFile["firstOnlineVolume"] + yearDiff;
      let date3 = moment(this.prevOnlineIssue["docOnlineIssue"]);
      let year3 = date3.year();
      let yearDiffIssue = year1 - year3;
      this.getOnlineIssue(yearDiffIssue);
    }
  }

  getOnlineIssue(yearDiffIssue) {
    if(yearDiffIssue == 0) {
      console.log("Issue in same year as previous.");
      this.docOnlineIssueNumber =  this.prevOnlineIssue["docOnlineIssueNumber"] + 1;
    }
    else {
      console.log("Issue in new year compared to previous issue.");
      this.docOnlineIssueNumber = 1;
    }
    console.log("Online Issue Number:")
    console.log(this.docOnlineIssueNumber);
    console.log("Calling Get Positions");
    this.getPositions();
  }

  getPositions() {
    //Use print and online position of sections with departments. 
    if(this.docDepartment) {
      console.log(this.docDepartment);
      for (let i = 0; i < this.sections.length; i++) {
      console.log(i);
      console.log(this.sections[i]['section']);
      console.log(this.sections[i]['department']);
        if (this.sections[i]['department'].toLowerCase() == this.docDepartment.toLowerCase()) {
          this.docOnlinePosition = this.sections[i]['onlinePosition'] || null;
          this.docPrintPosition = this.sections[i]['printPosition'] || null;
          break;
        }
      }
    }
    //If no department, use print and online positions of sections.
    else if(this.docSection) {
      console.log(this.docSection);
      for (let j = 0; j < this.sections.length; j++) {
        console.log(this.sections[j]['section']);
        if (!(this.sections[j]['department']) && (this.sections[j]['section'].toLowerCase() == this.docSection.toLowerCase())) {
          this.docOnlinePosition = this.sections[j]['onlinePosition'] || null;
          this.docPrintPosition = this.sections[j]['printPosition'] || null;
          break;
        }
      }
    }
    
    console.log("Online position for sorting in issue:")
    console.log(this.docOnlinePosition);
    console.log("Print position for sorting in issue:")
    console.log(this.docPrintPosition);

    if (this.docSection != "News") {
      this.docETOCDate = this.docOnlineIssue;
      console.log("Calling get regular status.");
      this.getStatus();
    } 
    else {
      console.log("Calling get News status");
      this.getNewsStatus();
    }
  }

  getStatus() {

    if(this.docFinalizeDate) {
      this.docStatus = "8 - Final";  
    }
    else if (this.docSendProofRead) {
      this.docStatus = "7 - Proof Reading";
    } 
    else if (this.docSendFineTune) {
      this.docStatus = "6 - Fine Tuning";
    } 
    else if (this.docSendAuthorDate) {
      this.docStatus = "5 - Author Review";
    } 
    else if (this.docSendSEDate) {
      this.docStatus = "4 - SE Review";
    } 
    else if (this.docCopyEditBeginDate) {
      this.docStatus = "3 - Copy Edit";
    } 
    else if (this.docEnteredDate) {
      this.docStatus = "2 - InCopy";
    }
    else if (this.docAcceptDate) {
      this.docStatus = "1 - Accepted";
    }
    else {
      this.docStatus = "0 - No Status";
    }
    
    console.log("Status for this document:");
    console.log(this.docStatus);
    this.submitEditedDoc();
  }

  getNewsStatus() {
    if(this.docPublishDateCMAJnews) {
      this.docStatus = "C - News Posted";
    }
    else if(this.docNewsReady) {
      this.docStatus = "B - News Ready";
    }
    else {
      this.docStatus = "A - News In Edit";
    }
    console.log("Status for this document:");
    console.log(this.docStatus);
    this.submitEditedDoc();
  }

  submitEditedDoc() { 
    console.log("Ready to submit edited document.");

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
      docNumBoxes: this.docNumBoxes,
      docNumTables: this.docNumTables,
      docNumAppendices: this.docNumAppendices,
      docRelatedMaterial: this.docRelatedMaterial,
      docOutStandingMaterial: this.docOutStandingMaterial,
      docInvoiceNum: this.docInvoiceNum,
      docShortTitle: this.docShortTitle,
      docWebBlurb: this.docWebBlurb,
      docWebImageURL: this.docWebImageURL,
      docWebImageCredit: this.docWebImageCredit,
    
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
      docOnlineVolume: this.docOnlineVolume,
      docOnlineIssueNumber: this.docOnlineIssueNumber,
    
      //PRINT ISSUE
    
      docAdConflicts: this.docAdConflicts,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docPrintPosition: this.docPrintPosition,

      //PRINT ADS
      docAdClient: this.docAdClient, 
      docAdDescription: this.docAdDescription, 
      docAdSize: this.docAdSize, 
      docAdFirstPagePrint: this.docAdFirstPagePrint, 
      docAdLastPagePrint: this.docAdLastPagePrint, 
      
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
