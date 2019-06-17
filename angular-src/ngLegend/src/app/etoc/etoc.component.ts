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
  }

  myFilter = (d: Date): boolean => {
    const calendarDay = moment(d).format('MMMM DD, YYYY');
    return this.onlineIssueDates.includes(calendarDay); 
  }


  //onSearchSubmit() {
  //  console.log(this.docETOCDate);

  //}

  onSearchSubmit() {
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
          this.onlineIssueVolume = entries[0]["docOnlineVolume"];
          this.onlineIssueIssue = entries[0]["docOnlineIssueNumber"];
          this.showResults = true;
        }
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
