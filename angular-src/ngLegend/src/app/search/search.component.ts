import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';


const config = require('../../../../../config/docs');

declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;
//var fs = require('fs');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showResults: Boolean = false;
  noResults: Boolean = false;
  docSection: String;
  docNotUsedOnline: Boolean;
  docNotUsedPrint: Boolean;
  docTitle: String;
  docAuthor: String;
  docDOI: Number;
  afterAcceptDate: Date;
  beforeAcceptDate: Date;
  editor: String;
  status: String;
  sections: Object[] = []; 
  departments: String[] = []; 
  configFile: Object;
  editors: [String];
  statusConfig: [String];
  displayDocs: [Object];
  username: String;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {

    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetUniqueSections();
    this.departments = this.authService.localGetDepartments(); 


    this.editors = config.alleditors;
    this.statusConfig = config.status;

    this.showResults = false;
    this.noResults = false;

  }

  onSearchSubmit() {
    console.log(this.afterAcceptDate);
    this.authService.getSearchResults(
    	this.docSection,
    	this.docAuthor,
    	this.docDOI,
    	this.docTitle,
      this.docNotUsedOnline,
      this.docNotUsedPrint,
      this.afterAcceptDate,
      this.beforeAcceptDate,
      this.editor,
      this.status
    ).subscribe(entries => {
      console.log(entries);
      if(entries.length == 0) {
        this.noResults = true;
      } else { 
        this.showResults = true;
        this.displayDocs = entries; 
      }
    }, 
    err => {
      console.log(err);
      return false;
    });
  }

  onNewSearch() {
  	this.docSection = "";
  	this.docAuthor = "";
  	this.docDOI = null;
  	this.docTitle = "";
    this.editor = null;
    this.status = null;
    this.docNotUsedOnline = null;
    this.docNotUsedPrint = null;
    this.afterAcceptDate = null;
    this.beforeAcceptDate = null;
  	this.ngOnInit();
  }

  onModifySearch() {
    this.ngOnInit();
  }

  onDocClick(doc, index) {
    const docID = doc["_id"]; 
    this.router.navigate(['/details', docID]);
  }

}
