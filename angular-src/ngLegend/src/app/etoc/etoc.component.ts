import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;

@Component({
  selector: 'app-etoc',
  templateUrl: './etoc.component.html',
  styleUrls: ['./etoc.component.css'],
    providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})

export class EtocComponent implements OnInit {

  showResults: Boolean = false;
  noResults: Boolean = false;
  errorMessage: String = "";
  successMessage: String = "";
  online: object [];
  onlineIssues: object [];
  onlineIssueDates: string [];
  docETOCDate: Date;
  ETOCDateFormatted: string;
  dateETOC = new FormControl(moment());
  username: string;
  displayDocs: [Object];
  onlineIssueVolume: number;
  onlineIssueIssue: number; 
  docIndex: number;
  ETOCSections: [Object];
  ETOCSectionsOnly;
  issueSections: [string];

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
  	this.username = this.authService.loadUsername(); 
    this.online = this.authService.localGetOnline(); 
    this.onlineIssues = this.online.map( x => x['date']);
    this.onlineIssueDates = this.online.map( x => moment(x['date']).format('MMMM DD, YYYY'));
    this.showResults = false;
    this.noResults = false;
    let sections = this.authService.localGetSections(); 
    this.ETOCSections = this.authService.localGetSections().filter(x => x.ETOCOnly);
    this.ETOCSectionsOnly = this.ETOCSections.map( x => x['section']);
  }

  myFilter = (d: Date): boolean => {
    const calendarDay = moment(d).format('MMMM DD, YYYY');
    return this.onlineIssueDates.includes(calendarDay); 
  }

  onSearchSubmit() {
    console.log("In search");
    this.ETOCDateFormatted = moment(this.docETOCDate).format('MMMM DD, YYYY');
    if(!this.onlineIssueDates.includes(this.ETOCDateFormatted)) {
      this.errorMessage = "Invalid ETOC date"; 
        setTimeout(() => {
          this.errorMessage = "";
          this.ngOnInit();
      }, 3000); 
    }
    else { 
      this.authService.getETOCSearchResults(this.ETOCDateFormatted).subscribe(entries => {
        console.log(entries);
        if(entries.length == 0) {
          this.noResults = true;
        } 
        else {
          this.displayDocs = entries;
          console.log(this.displayDocs);
          this.issueSections = entries.map(x => x.docSection);
          this.showResults = true;
        }
      }, 
      err => {
        console.log(err);
        return false;
      });
    }
  }

  onLoadNonEditorial() {
    let layoutPromises = [];
    console.log(this.issueSections);
    if(!this.issueSections.includes('10 Health Stories That Mattered This Week') ||
       !this.issueSections.includes('CMAJ Blogs') ||
       !this.issueSections.includes('CMAJ Open') || 
       !this.issueSections.includes('Canadian Journal of Surgery') || 
       !this.issueSections.includes('ETOC Bottom Ad') || 
       !this.issueSections.includes('ETOC Middle Ad') || 
       !this.issueSections.includes('ETOC Top Ad') || 
       !this.issueSections.includes('From the Archives') || 
       !this.issueSections.includes('Journal of Psychiatry and Neuroscience') || 
       !this.issueSections.includes('Memoriam') || 
       !this.issueSections.includes('Sante Inc')  
      ) {


     // if(!this.issueSections.includes('10 Health Stories That Mattered This Week')) {
     //     layoutPromises.push(this.makeDoc('10 Health Stories That Mattered This Week'));
      //}
      if(!this.issueSections.includes('CMAJ Blogs')) {
        layoutPromises.push(this.makeDoc('CMAJ Blogs'));
      }
     // if(!this.issueSections.includes('CMAJ Open')) {
     //   layoutPromises.push(this.makeDoc('CMAJ Open'));
     // }
     // if(!this.issueSections.includes('Canadian Journal of Surgery')) {
     //   layoutPromises.push(this.makeDoc('Canadian Journal of Surgery'));
     // }
     // if(!this.issueSections.includes('ETOC Bottom Ad'')) {
     //   layoutPromises.push(this.makeDoc('ETOC Bottom Ad'));
     // }

      Promise.all(layoutPromises)
        .then((value) => {
          this.onSearchSubmit();
       })
       .catch((e) => {
          console.log(e); 
       });
    } 
  }

  makeDoc(section) {
    return new Promise( (resolve, reject) => {
      let doc = {
                   docETOCOnly: true,
                   docSection: section,
                   docTitle: "",
                   docWebBlurb: "",
                   docETOCDate: this.docETOCDate,
                   docETOCDateFormatted: this.ETOCDateFormatted, 
                   docETOCPosition: this.ETOCSections.filter(x => x['section']==section).map(x => x['ETOCPosition'])[0],
                   docOnlineNotes: "",
                   docNotes: ""
                };
      console.log(doc);
      this.authService.submitDoc(doc).subscribe(data => {
      },
      err => {
        console.log(err);
        return false;
      });
    });
  }

  //The button to delete the ETOC only articles (ads, blogs, etc) 
  onDeleteManyETOC() {
    if(confirm("Are you sure you want to delete the ETOC-only documents?")) {
      this.authService.deleteManyETOC(this.ETOCDateFormatted).subscribe(doc => {
        this.onSearchSubmit();
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  onOnlineOrderCancel() {
    this.onSearchSubmit();
    this.docIndex = null;
  }

  onNewSearch() {
  	this.docETOCDate = null;
  	this.ngOnInit();
  }

  onDocClick(doc, index) {
    const docID = doc["_id"]; 
    this.router.navigate(['/details', docID]);
  }

}
