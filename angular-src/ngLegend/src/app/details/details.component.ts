import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  onlineOrder: [Object];

  //loaded from config data 
  sections: object[]; 
  sectionsUnique: object[]; 
  sectionsMenu: string[]; 
  departments: object[]; 
  departmentsMenu: string[]; 
  configFile: object;
  online: object [];
  codes: object [];
  editors: object []; 
  editorsMenu: string []; 
  coordinatorsMenu: string []; 
  proofersMenu: string []; 
  seMenu: string []; 
  codesMenu: string []; 
  multimedia: string []; 
  focusareas: string []; 

  prevOnlineIssue: Object;

  myControlDepartment = new FormControl();
  filteredDepartments: Observable<string[]>;
  myControlCodes1 = new FormControl();
  filteredCodes1: Observable<string[]>;
  myControlCodes2 = new FormControl();
  filteredCodes2: Observable<string[]>;
  myControlCodes3 = new FormControl();
  filteredCodes3: Observable<string[]>;
  myControlCodes4 = new FormControl();
  filteredCodes4: Observable<string[]>;
  myControlCodes5 = new FormControl();
  filteredCodes5: Observable<string[]>;
  myControlCodes6 = new FormControl();
  filteredCodes6: Observable<string[]>;

  //Same as in Enter Document Component

  //GENERAL FIELDS
  docDOI: Number;
  docSection: String;
  docDepartment: String;
  docAuthor: String;
  docTitle: String;
  docFocusArea: String;

  //DOCUMENT DETAILS
  docFlagPrint: Boolean;
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
  code1Code: Number;
  code2Code: Number;
  code3Code: Number;
  code4Code: Number;
  code5Code: Number;
  code6Code: Number;

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

    this.filteredCodes1 = this.myControlCodes1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes2 = this.myControlCodes2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes3 = this.myControlCodes3.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes4 = this.myControlCodes4.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes5 = this.myControlCodes5.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes6 = this.myControlCodes6.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.showNews = false;
    this.showLetter = false;
    this.showAd = false;
    this.showFrench = false;
    this.showOther = false;
    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.editors = this.authService.localGetEditors(); 
    this.codes = this.authService.localGetCodes();
    this.online = this.authService.localGetOnline(); 
    this.departments = this.authService.localGetDepartments();
    this.sectionsUnique = this.authService.localGetUniqueSections(); 
    this.sectionsMenu = this.authService.localGetUniqueSections().map(x => x.section); 
    this.departmentsMenu = this.authService.localGetDepartments().map(x => x.department); 
    this.editorsMenu = this.authService.localGetEditors().filter(x => x.docEditor).map(x => x.name);
    this.coordinatorsMenu = this.authService.localGetEditors().filter(x => x.docCoordinator).map(x => x.name);
    this.proofersMenu = this.authService.localGetEditors().filter(x => x.docProofReader).map(x => x.name);
    this.seMenu = this.authService.localGetEditors().filter(x => x.docSE).map(x => x.name);
    this.codesMenu = this.authService.localGetCodes().map(x => x.description);
    this.focusareas = this.authService.localGetCodes().filter(x => x.focus).map(x => x.description);
      
    const mediaArray: string [] = [
                         this.configFile['multiMedia1'], 
                         this.configFile['multiMedia2'],
                         this.configFile['multiMedia3'],
                         this.configFile['multiMedia4'],
                         this.configFile['multiMedia5'],
                         this.configFile['multiMedia6']
                       ];

    this.multimedia = mediaArray.filter(x => x.length > 0);

    this.route.params.subscribe(params => {
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
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
    
      this.docFlagPrint = doc.docFlagPrint;
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
      this.code1Code = doc.code1Code;
      this.code2Code = doc.code2Code;
      this.code3Code = doc.code3Code;
      this.code4Code = doc.code4Code;
      this.code5Code = doc.code5Code;
      this.code6Code = doc.code6Code;
    
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

  myFilter = (d: Date): boolean => {
    const onlineIssueDates = this.online.map( x => moment(x['date']).format('MMMM DD, YYYY'));
    const calendarDay = moment(d).format('MMMM DD, YYYY');
    return onlineIssueDates.includes(calendarDay); 
  }

  myFilterPrint = (d: Date): boolean => {
    const calendarDay = moment(d).format('D');
    return calendarDay == '1'; 
  }

  private _filterCode(value: string): string[] {
    const filterValueCode = value.toLowerCase();
    return this.codesMenu.filter(option => option.toLowerCase().includes(filterValueCode));
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
    if (this.docSection != "News") {
      this.getStatus();
    } 
    else {
      this.getNewsStatus();
    }
  }

  getStatus() {
    if(this.docFinalizeDate) this.docStatus = "8 - Final"; 
    else if (this.docSendProofRead) this.docStatus = "7 - Proof Reading";
    else if (this.docSendFineTune) this.docStatus = "6 - Fine Tuning";
    else if (this.docSendAuthorDate) this.docStatus = "5 - Author Review";
    else if (this.docSendSEDate) this.docStatus = "4 - SE Review";
    else if (this.docCopyEditBeginDate) this.docStatus = "3 - Copy Edit";
    else if (this.docEnteredDate) this.docStatus = "2 - InCopy";
    else if (this.docAcceptDate) this.docStatus = "1 - Accepted";
    else this.docStatus = "0 - No Status";
    this.submitEditedDoc();
  }
    
  getNewsStatus() {
    if(this.docPublishDateCMAJnews) this.docStatus = "C - News Posted";
    else if(this.docNewsReady) this.docStatus = "B - News Ready";
    else this.docStatus = "A - News In Edit";
    this.submitEditedDoc();
  }

  submitEditedDoc() { 

    const code1 = this.codes.filter(x => x['description'] == this.docCollectionCode1).map(x => x['code'])[0];
    const code2 = this.codes.filter(x => x['description'] == this.docCollectionCode2).map(x => x['code'])[0];
    const code3 = this.codes.filter(x => x['description'] == this.docCollectionCode3).map(x => x['code'])[0];
    const code4 = this.codes.filter(x => x['description'] == this.docCollectionCode4).map(x => x['code'])[0];
    const code5 = this.codes.filter(x => x['description'] == this.docCollectionCode5).map(x => x['code'])[0];
    const code6 = this.codes.filter(x => x['description'] == this.docCollectionCode6).map(x => x['code'])[0];


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
    
      docFlagPrint: this.docFlagPrint,
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
      code1Code: code1,
      code2Code: code2,
      code3Code: code3,
      code4Code: code4,
      code5Code: code5,
      code6Code: code6,
    
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

    this.authService.putUpdateDoc(editedDoc).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/recent']);
  }

}
