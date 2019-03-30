import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as moment from 'moment';

declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {
  showResults: Boolean = false;
  noResults: Boolean = false;
  online: object [];
  onlineIssues: object [];
  onlineIssueDates: string [];
  docOnlineIssue: Date;
  selectedIssue: Date;
  onlineIssueVolume: number;
  onlineIssueIssue: number; 

  displayDocs: [Object];
  username: String;
  docID: String;
  docOnlinePosition: Number;
  docIndex: Number;
  docFirstPageOnline: Number;
  docLastPageOnline: Number;
  docOnlineNotes: String;
  docNumFigures: String;
  docNumTables: String;
  docNumAppendices: String;
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docCollectionCode5: String;
  docCollectionCode6: String;
  docRelatedMaterial: String;
  docMultiMedia1: String;
  docMultiMedia2: String;
  docMultiMedia3: String;
  docPodcastEmbargoLink: String;
  docPodcastPermLink: String;
  docPodcastEmbedCode: String;
  docVideoEmbedCode: String;
  docVideoLink: String;
  docURL: String;
  docHashTags: String;
  docSocialSummary: String;

  firstPagePrevIssue: number;
  lastPagePrevIssue: number;
  firstPageCurrentIssue: number;
  lastPageCurrentIssue: number;
  onlineIssueDateFormatted: string;
  prevOnlineIssueDateFormatted: string;

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

  onSearchSubmit() {
    this.authService.getOnlineSearchResults(this.docOnlineIssue).subscribe(entries => {
      if(entries.length == 0) {
        this.noResults = true;
      } 
      else {
        this.displayDocs = entries;
        this.onlineIssueVolume = entries[0]["docOnlineVolume"];
        this.onlineIssueIssue = entries[0]["docOnlineIssueNumber"];
        this.onlineIssueDateFormatted = moment(this.docOnlineIssue).format('MMMM DD, YYYY');

        //Find position of queried date in array and next item in array will be previous issue.
        //If current issue if first in database, there is no previous issue so return 1 as first page of current issue. 
        //If issues are in the same year, check previous issue. Otherwise current issue is first of new year.
        const posDate: number = this.onlineIssueDates.indexOf(this.onlineIssueDateFormatted);
        if (posDate == this.onlineIssueDates.length -1) {
          this.getLastPageCurrentIssue();
        }
        else {
          const prevIssue = this.onlineIssues[posDate + 1];
          this.prevOnlineIssueDateFormatted = moment(prevIssue).format('MMMM DD, YYYY');
          this.getLastPagePreviousIssue(prevIssue);
        }
      }
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  getLastPagePreviousIssue(prevIssue) {
    this.authService.getOnlineLastPage(prevIssue).subscribe(entries => {
      if(entries.length > 0) {
        this.lastPagePrevIssue = entries[0]['docLastPageOnline'];
      }
      this.getLastPageCurrentIssue();
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  getLastPageCurrentIssue() {
    this.authService.getOnlineLastPage(this.docOnlineIssue).subscribe(entries => {
      if(entries.length > 0) {
        this.lastPageCurrentIssue = entries[0]['docLastPageOnline'];
      } 
      this.getFirstPageCurrentIssue();
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  getFirstPageCurrentIssue() {
    this.authService.getOnlineFirstPage(this.docOnlineIssue).subscribe(entries => {
      console.log(entries);
      if(entries.length > 0) {
        this.firstPageCurrentIssue = entries[0]['docFirstPageOnline'];
      } 
      this.showResults = true;
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  onOnlineOrderClick(doc, index) {
    this.docID = doc["_id"]; 
    this.docOnlinePosition = doc['docOnlinePosition']; 
    this.docFirstPageOnline = doc['docFirstPageOnline']; 
    this.docLastPageOnline = doc['docLastPageOnline']; 
    this.docOnlineNotes = doc['docOnlineNotes']; 
    this.docNumFigures = doc['docNumFigures']; 
    this.docNumTables = doc['docNumTables'];
    this.docNumAppendices = doc['docNumAppendices'];
    this.docIndex = index;
  }

  onOnlineOrderSubmit() {
    const onlineOrderDoc = {
      docID: this.docID, //to identify this doc in database
      docOnlinePosition: this.docOnlinePosition,
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docOnlineNotes: this.docOnlineNotes,
      docNumFigures: this.docNumFigures,
      docNumTables: this.docNumTables,
      docNumAppendices: this.docNumAppendices
    }
    this.authService.putUpdateDoc(onlineOrderDoc).subscribe(doc => {
      this.onSearchSubmit();
      this.docIndex = null;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onOnlineOrderCancel() {
    this.onSearchSubmit();
    this.docIndex = null;
  }

  onNewSearch() {
  	this.docOnlineIssue = null;
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

/*
getVolumeIssue() {
    console.log(this.onlineIssues);
    for(let i = 0; i <this.onlineIssues.length; i++) {
      if(this.onlineIssues[i]['date'] == this.docOnlineIssue) {
        this.onlineIssuesVolume = this.onlineIssues[i]['volume'];
        this.onlineIssuesIssue = this.onlineIssues[i]['issue'];
        if(this.onlineIssues[i]['date'] == this.dateFirstIssue) { //If first issue in config file, set first and last pages
          this.firstPageCurrentIssue = this.firstPageFirstIssue;
          this.lastPageCurrentIssue = this.lastPageFirstIssue;
        }
        else {
          this.getLastPagePreviousIssue(this.onlineIssues[i + 1]['date'], this.onlineIssues[i]['date']);
        }
        break;
      }
    }
  }

  */

