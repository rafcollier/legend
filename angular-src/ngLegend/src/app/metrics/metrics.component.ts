import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

import * as moment from 'moment';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  showResultsNumDocs: Boolean = false;
  showResultsDateDiff: Boolean = false;
  showMetricsRequest: Boolean = true;
  showNoResults: Boolean = false;
  username: String;
  sections: [String];
  displayDocs: [Object];

  docSectionNumDocs: String;
  firstDateNumDocs: Date;
  secondDateNumDocs: Date;
  firstDateNumDocsFormatted: String;
  secondDateNumDocsFormatted: String;
  docPublishDate: Date;
  docPublishDateFormatted: String;
  docAcceptDate: Date;
  docAcceptDateFormatted: String;
  numDocs: Number;

  docSectionTimeDifference: String;
  firstDateTimeDifference: Date;
  secondDateTimeDifference: Date;
  firstDateTimeDifferenceFormatted: String;
  secondDateTimeDifferenceFormatted: String;

  dateDiff: Number;

  constructor(
  	private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sections = config.sections;
    this.showMetricsRequest = true;
    this.showResultsNumDocs = false;
    this.showResultsDateDiff = false;
    this.showNoResults = false;
    console.log(this.showMetricsRequest);
    this.authService.getProfile().subscribe(profile => {
      this.username = this.authService.capitalizeFirstLetter(profile.user.username);
      },
    err => {
      console.log(err);
      return false;
    });
  }

  onNumDocsSubmit() {
    this.showMetricsRequest = false;
    this.authService.getNumDocs(
      this.docSectionNumDocs,
      this.firstDateNumDocs,
      this.secondDateNumDocs
    ).subscribe(entries => {
      if(entries.length>0) {
        this.showResultsNumDocs=true;
        this.showNoResults=false;
        this.firstDateNumDocsFormatted = this.formatDate(new Date(this.firstDateNumDocs)); 
        this.secondDateNumDocsFormatted = this.formatDate(new Date(this.secondDateNumDocs)); 
        this.showResultsNumDocs = true;
        this.displayDocs = entries; 
        this.numDocs = entries.length;
        for (let i=0; i<entries.length; i++) {
          this.displayDocs[i]['docPublishDate'] = this.formatDate(new Date(entries[i].docPublishDate)); 
        }
      } 
      else {
        this.showNoResults=true;
      }
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onTimeDifferenceSubmit() {
    this.showMetricsRequest = false;
    this.authService.getTimeDiff(
      this.docSectionTimeDifference,
      this.firstDateTimeDifference,
      this.secondDateTimeDifference
    ).subscribe(entries => {
      if(entries.length >0) {
        this.showResultsDateDiff = true;
        this.showNoResults=false;
        this.firstDateTimeDifferenceFormatted = this.formatDate(new Date(this.firstDateTimeDifference)); 
        this.secondDateTimeDifferenceFormatted = this.formatDate(new Date(this.secondDateTimeDifference)); 
        this.displayDocs = entries;
        for (let i=0; i<entries.length; i++) {
          this.displayDocs[i]['docAcceptDate'] = this.formatDate(new Date(entries[i].docAcceptDate)); 
          this.displayDocs[i]['docPublishDate'] = this.formatDate(new Date(entries[i].docPublishDate)); 
        }
        let arrDateDiff = [];
        for(let i=0; i<entries.length; i++) {
          let acceptMoment = moment(entries[i].docAcceptDate);
          let publishMoment = moment(entries[i].docPublishDate);
          let dateDiff = publishMoment.diff(acceptMoment, 'days');
          this.displayDocs[i]['dateDiff'] = dateDiff;
      	  arrDateDiff.push(dateDiff);
        }
        let sum = arrDateDiff.reduce((x,y) => x+y);
        let average = sum/arrDateDiff.length;
        this.dateDiff = average;
      }
      else {
        this.showNoResults=true;
      }
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onNewMetrics() {
  	this.docSectionNumDocs = "";
  	this.docSectionTimeDifference = "";
  	this.firstDateNumDocs = null;
  	this.secondDateNumDocs = null;
  	this.firstDateTimeDifference = null;
  	this.secondDateTimeDifference = null;
  	this.ngOnInit();
  }

  onModifyMetrics() {
  	this.ngOnInit();
  }

  onDocClick(doc, index) {
    const docID = doc["_id"]; 
    this.router.navigate(['/details', docID]);
  }

  formatDate(date) {
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
  }




}
