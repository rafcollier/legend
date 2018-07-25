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
  docSection: String;
  docNotUsedOnline: Boolean;
  docNotUsedPrint: Boolean;
  docTitle: String;
  docAuthor: String;
  docDOI: Number;
  afterAcceptDate: Date;
  beforeAcceptDate: Date;
  sections: [String];
  displayDocs: [Object];
  username: String;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
    this.sections = this.authService.localGetSections();
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
    console.log(this.afterAcceptDate);
    this.authService.getSearchResults(
    	this.docSection,
    	this.docAuthor,
    	this.docDOI,
    	this.docTitle,
      this.docNotUsedOnline,
      this.docNotUsedPrint,
      this.afterAcceptDate,
      this.beforeAcceptDate
    ).subscribe(entries => {
      this.showResults = true;
      this.displayDocs = entries; 
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

  onDownload() {

    const fields = [
                    {
                      label: 'Title',
                      value: 'docTitle'
                    },
                    {
                      label: 'Author',
                      value: 'docAuthor'
                    },
                    {
                      label: 'DOI', 
                      value: 'docDOI'
                    },
                    {
                      label: 'Section',
                      value: 'docSection'
                    },
                    {
                      label: 'Description',
                      value: 'docDescription'
                    },
                    {
                      label: 'Collection Code 1',
                      value: 'docCollectionCode1' 
                    },
                    {
                      label: 'Collection Code 2',
                      value: 'docCollectionCode2' 
                    },
                    {
                      label: 'Collection Code 3',
                      value: 'docCollectionCode3' 
                    },
                    {
                      label: 'Collection Code 4',
                      value: 'docCollectionCode4' 
                    },
                    {
                      label: 'Commission Date',
                      value: 'docCommissionDateFormatted' 
                    },
                    {
                      label: 'Invoice Date',
                      value: 'docInvoiceDateFormatted' 
                    },
                    {
                      label: 'Invoice Amount',
                      value: 'docInvoiceAmount' 
                    },
                    {
                      label: 'Accept Date',
                      value: 'docAcceptDateFormatted' 
                    },
                    {
                      label: 'Publish Date',
                      value: 'docPublishDateFormatted' 
                    },
                    {
                      label: 'InCopy Entered Date',
                      value: 'docEnteredDateFormatted' 
                    },
                    {
                      label: 'Begin Copy Edit',
                      value: 'docCopyEditBeginDateFormatted'
                    },
                    {
                      label: 'Copy Edit Complete',
                      value: 'docCopyEditCompleteDateFormatted' 
                    },
                    {
                      label: 'Sent to SE',
                      value: 'docSendSEDateFormatted' 
                    },
                    {
                      label: 'Returned from SE',
                      value: 'docReturnSEDateFormatted' 
                    },
                    {
                      label: 'Finalized',
                      value: 'docFinalizeDateFormatted' 
                    },
                    {
                      label: 'MS Editor',
                      value: 'docEditor' 
                    },
                    {
                      label: 'MS Coordinator',
                      value: 'docCoordinator' 
                    },
                    {
                      label: 'MS Proofreader',
                      value: 'docProofReader' 
                    },
                    {
                      label: 'SE1',
                      value: 'docSE1' 
                    },
                    {
                      label: 'SE2',
                      value: 'docSE2' 
                    },
                    {
                      label: 'Open Access',
                      value: 'docOpenAccess' 
                    },
                    {
                      label: 'Translation',
                      value: 'docTranslation' 
                    },
                    {
                      label: 'Online Issue',
                      value: 'docOnlineIssue' 
                    },
                    {
                      label: 'First Page Online Issue',
                      value: 'docFirstPageOnline' 
                    },
                    {
                      label: 'Last Page Online Issue',
                      value: 'docLastPageOnline' 
                    },
                    {
                      label: 'Number of Pages Online',
                      value: 'docNumPagesOnline' 
                    },
                    {
                      label: 'Notes for Online Issue',
                      value: 'docOnlineNotes' 
                    },
                    {
                      label: 'Print Issue',
                      value: 'docPrintIssue' 
                    },
                    {
                      label: 'First Page Print Issue', 
                      value: 'docFirstPagePrint'
                    },
                    {
                      label: 'Last Page Print Issue',
                      value: 'docLastPagePrint' 
                    },
                    {
                      label: 'Number of Pages Print',
                      value: 'docNumPagesPrint' 
                    },
                    {
                      label: 'Notes for Print Issue',
                      value: 'docPrintNotes' 
                    },
                    {
                      label: 'Ad Conflicts',
                      value: 'docAdConflicts' 
                    },
                    {
                      label: 'Date Posted on CMAJ News',
                      value: 'docPublishDateCMAJnewsFormatted' 
                    },
                    {
                      label: 'News Author Type',
                      value: 'docNewsAuthorType' 
                    },
                    {
                      label: 'News Commission Date',
                      value: 'docNewsCommissionDateFormatted' 
                    },
                    {
                      label: 'News Invoice Date',
                      value: 'docNewsInvoiceDateFormatted' 
                    },
                    {
                      label: 'News Invoice Amount',
                      value: 'docNewsInvoiceAmount' 
                    }
                  ];

    const data = this.displayDocs; 
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    console.log(csv);
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([csv], { type: 'text/csv' });
    let url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Search_Results.csv';
    a.click();
    return 'success';
  }






}
