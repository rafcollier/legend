import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

const config = require('../../../../../config/docs');

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  showResults: Boolean = false;
  docIndex: Number = null;

  docID: String; 
  docTitle: String;
  docDOI: Number;
  docPrintIssue: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;

  printIssues: [String]; 
  displayDocs: [Object];

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
  	this.printIssues = config.printIssues;
    this.showResults = false;
    this.docIndex = null;
  }

  onLayoutSearchSubmit() {
    this.authService.getLayoutSearchResults(this.docPrintIssue).subscribe(entries => {
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
    this.docPrintIssue = "";
    this.ngOnInit();
  }

  onModifySearch() {
    this.ngOnInit();
  }

  onDocClick(doc, index) {
    this.docID = doc["_id"]; 
    this.docFirstPagePrint = doc["docFirstPagePrint"];
    this.docLastPagePrint = doc["docLastPagePrint"];
    this.docIndex = index;
  }

  onDocSubmit() {
    const pagesDoc = {
      docID: this.docID, //to identify this doc in database
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint
    }
    this.authService.putUpdateDoc(pagesDoc).subscribe(doc => {
      this.onLayoutSearchSubmit();
      this.docIndex = null;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
