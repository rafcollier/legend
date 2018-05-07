import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showResults: Boolean = false;

  docSection: String;
  docTitle: String;
  docAuthor: String;
  docDOI: Number;
  docOnlineIssue: String;
  docPrintIssue: String;

  sections: [String];
  onlineIssues: [String]; 
  printIssues: [String]; 
  displayDocs: [Object];

  username: String;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }
   

  ngOnInit() {
  	this.sections = config.sections;
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.showResults = false;
    this.authService.getProfile().subscribe(profile => {
      this.username = this.authService.capitalizeFirstLetter(profile.user.username);
      },
    err => {
      console.log(err);
      return false;
    });

  }

  onSearchSubmit() {
    this.authService.getSearchResults(
    	this.docOnlineIssue,
    	this.docSection,
    	this.docPrintIssue,
    	this.docAuthor,
    	this.docDOI,
    	this.docTitle
    ).subscribe(entries => {

      this.showResults = true;
      this.displayDocs = entries; 
      console.log(entries);
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onNewSearch() {
  	this.docOnlineIssue = "";
  	this.docSection = "";
  	this.docAuthor = "";
  	this.docPrintIssue = "";
  	this.docDOI = null;
  	this.docTitle = "";
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
