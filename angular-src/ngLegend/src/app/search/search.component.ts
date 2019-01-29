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
  printAd: string = "Print Ad";
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
  configFile: Object;
  editors: [String];
  statusConfig: [String];
  displayDocs: [Object];
  username: String;
  editorsMenu: string []; 
  docFlagPrint: Boolean;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {

    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetUniqueSections().map(x => x.section);
    this.editorsMenu = this.authService.localGetEditors().filter(x => x.docEditor).map(x => x.name);
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
      this.docFlagPrint,
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
    this.docFlagPrint = null;
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
