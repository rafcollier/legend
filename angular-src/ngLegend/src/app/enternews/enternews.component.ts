import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import * as moment from 'moment';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-enternews',
  templateUrl: './enternews.component.html',
  styleUrls: ['./enternews.component.css']
})
export class EnternewsComponent implements OnInit {

  //GENERAL FIELDS
  docDOI: Number;
  docSection: String;
  docAuthor: String;
  docTitle: String;

  //DOCUMENT TIMELINE
  docNewsCommissionDate: Date;
  docAcceptDate: Date;
  docNewsReady: Date;
  docPublishDateCMAJnews: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;
  docETOCDate: Date;
  docOnlineIssue: Date;
  docPrintIssue: Date;

  //DOCUMENT DETAILS
  docAdConflicts: String;
  docWebBlurb: String;
  docWebImageURL: String;
  docWebImageCredit: String;
  docURL: String;
  docHashTags: String;
  docFocusArea: String;  
    
  // COLLECTION CODES
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docCollectionCode5: String;
  docCollectionCode6: String;

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
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docPrintPosition: Number; 

  //Generated from login user
  username: String;

  //loaded from config data 
  sections: Object[] = []; 
  departments: String[] = []; 
  configFile: Object;
  collectionCodes: [String]; 
  multimedia: [String]; 
  focusareas: [String]; 
 
  //temp values
  prevOnlineIssue: Object;
  docStatus: String;

  constructor(
  	private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    /*
  	this.docSection = "News";
    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.departments = this.authService.localGetDepartments(); 
    this.collectionCodes = config.collectionCodes;
    this.focusareas = config.focusareas;
    this.getNewsDOI();
    */
  }


/*

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
    for (let j = 0; j < this.sections.length; j++) {
      if (this.sections[j]['section'].toLowerCase() == this.docSection.toLowerCase()) {
        this.docOnlinePosition = this.sections[j]['onlinePosition'];	
        this.docPrintPosition = this.sections[j]['printPosition'];
        break;
      }
    }
    console.log("Online position for sorting in issue:")
    console.log(this.docOnlinePosition);
    console.log("Print position for sorting in issue:")
    console.log(this.docPrintPosition);

    console.log("Calling get News status");
    this.getNewsStatus();
  }

  getNewsStatus() {

    if(this.docPublishDateCMAJnews) 
      this.docStatus = "C - News Posted";
    else if(this.docNewsReady) 
      this.docStatus = "B - News Ready";
    else 
      this.docStatus = "A - News In Edit";

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
      docAuthor: this.docAuthor,
      docTitle: this.docTitle,
      docFocusArea: this.docFocusArea,
    
      //DOCUMENT DETAILS
    
      docWebBlurb: this.docWebBlurb,
      docWebImageURL: this.docWebImageURL,
      docWebImageCredit: this.docWebImageCredit,
    
      //SOCIAL MEDIA
    
      docURL: this.docURL,
      docHashTags: this.docHashTags,
        
      //COLLECTION CODES
    
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,
      docCollectionCode5: this.docCollectionCode5,
      docCollectionCode6: this.docCollectionCode6,
    
      //DOCUMENT TIMELINE
    
      docETOCDate: this.docETOCDate,
      docOnlineIssue: this.docOnlineIssue,
      docPrintIssue: this.docPrintIssue,
    
      //EDITING TIMELINE

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
        this.router.navigate(['/enternews']); 
        return false;
      }
    });

  }


*/







}
