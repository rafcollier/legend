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
  prevOnlineIssue: Object;

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

  //Generated from login user
  username: String;

  //loaded from config data 
  sections: object[]; 
  sectionsUnique: object[]; 
  sectionsUniqueMenu: string[]; 
  departments: object[]; 
  departmentsMenu: string[]; 
  configFile: object;

  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 
  editors: string[]; 
  coordinators: [String]; 
  proofers: [String]; 
  se1s: [String]; 
  multimedia: [String]; 
  focusareas: [String]; 

  showNews: Boolean = false;
  showLetter: Boolean = false;
  showAd: Boolean = false;
  showFrench: Boolean = false;
  showOther: Boolean = false;

  onlineOrder: [Object];

  myControlDepartment = new FormControl();
  filteredDepartments: Observable<string[]>;

  constructor(
  	private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.filteredDepartments = this.myControlDepartment.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDepartment(value))
    );

    this.showNews = false;
    this.showLetter = false;
    this.showAd = false;
    this.showFrench = false;
    this.showOther = false;

    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.sectionsUnique = this.authService.localGetUniqueSections(); 
    this.sectionsUniqueMenu = this.authService.localGetUniqueSections().map(x => x.section); 
    this.departments = this.authService.localGetDepartments();
    this.departmentsMenu = this.authService.localGetDepartments().map(x => x.department); 

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
      else if (this.docSection.toLowerCase() == "print ad") {
        this.showAd = true;
        this.docTitle = this.docSection;
      }
      else if (this.docSection.toLowerCase() == "dans le cmaj") {
        this.showFrench = true;
        this.docTitle = this.docSection;
      }
      else {
        this.showOther = true;
      }
    });
  }

  private _filterDepartment(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departmentsMenu.filter(option => option.toLowerCase().includes(filterValue));
  }

  //Get highest value DOI from database for news article and increment by 1 for current DOI. 
  getNewsDOI() {
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

  onDocSubmit(){
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
      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i]['department'].toLowerCase() == this.docDepartment.toLowerCase()) {
          this.docOnlinePosition = this.departments[i]['onlinePosition'];
          this.docPrintPosition = this.departments[i]['printPosition'];
          break;
        }
      }
    }
    //If no department, use print and online positions of sections.
    else if(this.docSection) {
      for (let j = 0; j < this.sectionsUnique.length; j++) {
        if (this.sectionsUnique[j]['section'].toLowerCase() == this.docSection.toLowerCase()) {
          this.docOnlinePosition = this.sectionsUnique[j]['onlinePosition'];
          this.docPrintPosition = this.sectionsUnique[j]['printPosition'];
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
    this.submitNewDoc();
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
    this.submitNewDoc();
  }

  submitNewDoc(){

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

}
