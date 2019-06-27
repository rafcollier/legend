import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class OnlineComponent implements OnInit {
  showResults: Boolean = false;
  noResults: Boolean = false;
  online: object [];
  onlineIssues: object [];
  onlineIssueDates: string [];
  docOnlineIssue: Date;
  dateOnline = new FormControl(moment());
  selectedIssue: Date;
  onlineIssueVolume: number;
  onlineIssueIssue: number; 
  displayDocs: [Object];
  username: String;
  docID: String;
  docOnlinePosition: number;
  docIndex: number;
  docFirstPageOnline: number;
  docLastPageOnline: number;
  docOnlineNotes: string;
  docNumPagesOnline: number;
  docNumFiguresOnline: number;
  docNumBoxesOnline: number;
  docNumTablesOnline: number;
  docNumAppendicesOnline: number;
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
  editorialView: boolean;
  layoutView: boolean;

  errorMessage: String = "";
  successMessage: String = "";

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
    this.editorialView = true;
    this.layoutView = false;
  }

  myFilter = (d: Date): boolean => {
    const calendarDay = moment(d).format('MMMM DD, YYYY');
    return this.onlineIssueDates.includes(calendarDay); 
  }

  onSearchSubmit() {
    this.onlineIssueDateFormatted = moment(this.docOnlineIssue).format('MMMM DD, YYYY');
    if(!this.onlineIssueDates.includes(this.onlineIssueDateFormatted)) {
      this.errorMessage = "Invalid online issue date"; 
        setTimeout(() => {
          this.errorMessage = "";
          this.ngOnInit();
      }, 3000); 
    }
    else { 
      this.authService.getOnlineSearchResults(this.onlineIssueDateFormatted).subscribe(entries => {
        if(entries.length == 0) {
          this.noResults = true;
        } 
        else {
          this.displayDocs = entries;
          console.log(this.displayDocs);
          this.onlineIssueVolume = entries[0]["docOnlineVolume"];
          this.onlineIssueIssue = entries[0]["docOnlineIssueNumber"];

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
    this.docNumPagesOnline = doc['docNumPagesOnline']; 
    this.docNumFiguresOnline = doc['docNumFiguresOnline']; 
    this.docNumTablesOnline = doc['docNumTablesOnline'];
    this.docNumBoxesOnline = doc['docNumBoxesOnline']; 
    this.docNumAppendicesOnline = doc['docNumAppendicesOnline'];
    this.docIndex = index;
  }

  onOnlineOrderSubmit() {
    const onlineOrderDoc = {
      docID: this.docID, //to identify this doc in database
      docOnlinePosition: this.docOnlinePosition,
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docOnlineNotes: this.docOnlineNotes,
      docNumPagesOnline: this.docNumPagesOnline,
      docNumFiguresOnline: this.docNumFiguresOnline,
      docNumTablesOnline: this.docNumTablesOnline,
      docNumBoxesOnline: this.docNumBoxesOnline,
      docNumAppendicesOnline: this.docNumAppendicesOnline
    }
    console.log(onlineOrderDoc);
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

  onViewLayout() {
    this.layoutView = true;
    this.editorialView = false;
  }

  onViewEditorial() {
    this.editorialView = true;
    this.layoutView = false;
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
                      label: 'Area of Focus',
                      value: 'docFocusArea'
                    },
                    {
                      label: 'Related Material',
                      value: 'docRelatedMaterial'
                    },
                    {
                      label: 'Continuing Professional Development',
                      value: 'docProfessionalDev' 
                    },
                    {
                      label: 'Multimedia 1',
                      value: 'docMultiMedia1' 
                    },
                    {
                      label: 'Multimedia 2',
                      value: 'docMultiMedia2' 
                    },
                    {
                      label: 'Multimedia 3',
                      value: 'docMultiMedia3' 
                    }
                  ];

    const data = this.displayDocs; 
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([csv], { type: 'text/csv' });
    let url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Online_Issue_Download.csv';
    a.click();
    return 'success';
  }

  onDownloadSM() {

    const fields = [
                    {
                      label: 'Short Title',
                      value: 'docShortTitle'
                    },
                    {
                      label: 'Web Blurb',
                      value: 'docWebBlurb'
                    },
                    {  
                      label: 'Social Summary',
                      value: 'docSocialSummary' 
                    },
                    {
                      label: 'Document URL',
                      value: 'docURL' 
                    },
                    {
                      label: 'Podcast Permanent Link',
                      value: 'docPodcastPermLink' 
                    },
                    {
                      label: 'Video Link',
                      value: 'docVideoLink' 
                    },
                    {
                      label: 'Hashtags',
                      value: 'docHashTags' 
                    },
                    {
                      label: 'Ad Conflicts',
                      value: 'docAdConflicts' 
                    },
                    {
                      label: 'Online Issue Date',
                      value: 'docOnlineIssueFormatted' 
                    },
                    {
                      label: 'DOI', 
                      value: 'docDOI'
                    },
                    {
                      label: 'Author',
                      value: 'docAuthor'
                    },
                    {
                      label: 'Section',
                      value: 'docSection'
                    }
                  ];

    const data = this.displayDocs; 
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([csv], { type: 'text/csv' });
    let url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'Social_Media_Download.csv';
    a.click();
    return 'success';
  }

}



