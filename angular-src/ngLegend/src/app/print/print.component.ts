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
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class PrintComponent implements OnInit {
  showResults: Boolean = false;
  noResults: Boolean = false;
  docIndex: Number = null;
  username: String; 
  docID: String; 
  docTitle: String;
  docDOI: Number;
  docPrintIssue: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docPrintPosition: Number;
  docPrintNotes: String;
  docNumPagesPrint: number;
  docNumFiguresPrint: number;
  docNumTablesPrint: number;
  docNumBoxesPrint: number;
  docNumAppendicesPrint: number;
  printIssues: [String]; 
  displayDocsEditorial: [Object];
  displayDocsLayout: [Object];
  sections: Object[] = []; 
  configFile: Object;
  printIssueSelect: Date;
  datePrint = new FormControl(moment());
  printIssueFormatted: String;
  layoutSections: [Object];
  layoutSectionsOnly;
  editorialView: boolean;
  layoutView: boolean;
  needPreload: boolean;
  issueSections: [string];
  editorialPages: number = 0;
  layoutPages: number = 0;
  adPages: number = 0;
  totalPages: number = 0;
  errorMessage: String = "";
  successMessage: String = "";

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
    this.username = this.authService.loadUsername(); 
    this.showResults = false;
    this.noResults = false;
    this.editorialView = true;
    this.layoutView = false;
    let sections = this.authService.localGetSections(); 
    this.layoutSections = this.authService.localGetSections().filter(x => x.layout);
    this.layoutSectionsOnly = this.layoutSections.map( x => x['section']);
  }

  onSearchSubmit() {
    this.printIssueFormatted = moment(this.printIssueSelect).format('MMMM YYYY');
    const printIssueDay = moment(this.printIssueSelect).format('DD');
    if(printIssueDay != "01") {
      this.errorMessage = "Print issue date must be first day of the month"; 
      setTimeout(() => {
        this.errorMessage = "";
        this.ngOnInit();
      }, 3000); 
    } else {
      this.authService.getLayoutSearchResults(this.printIssueFormatted).subscribe(entries => {
        if(entries.length == 0) {
          this.noResults = true;
        } 
        else {
          console.log(entries);
          this.adPages = entries.filter(x => x.docLayoutOnly)
                                    .filter(x => x.docSection == 'Print Ad')
                                    .filter(x => x.docNumPagesPrint)
                                    .map(x => x.docNumPagesPrint)
                                    .reduce((a, b) => a + b, 0);
          this.layoutPages = entries.filter(x => x.docLayoutOnly)
                                    .filter(x => x.docSection != 'Print Ad')
                                    .filter(x => x.docNumPagesPrint)
                                    .map(x => x.docNumPagesPrint)
                                    .reduce((a, b) => a + b, 0);
          this.editorialPages = entries.filter(x => !x.docLayoutOnly)
                                       .filter(x => x.docNumPagesPrint)
                                       .map(x => x.docNumPagesPrint)
                                       .reduce((a, b) => a + b, 0);
          this.totalPages = entries.filter(x => x.docNumPagesPrint).map(x => x.docNumPagesPrint).reduce((a, b) => a + b, 0);
          this.issueSections = entries.map(x => x.docSection);
          this.displayDocsLayout = entries;
          this.displayDocsEditorial = entries.filter( x => !this.layoutSectionsOnly.includes(x.docSection) );
          this.showResults = true;
        }
      }, 
      err => {
          console.log(err);
          return false;
      });
    }
  }

  myFilterPrint = (d: Date): boolean => {
    const calendarDay = moment(d).format('D');
    return calendarDay == '1'; 
  }

  onPrintOrderClick(doc, index) {
    this.docID = doc["_id"]; 
    this.docTitle = doc["docTitle"];
    this.docPrintPosition = doc['docPrintPosition']; 
    this.docFirstPagePrint = doc['docFirstPagePrint']; 
    this.docLastPagePrint = doc['docLastPagePrint']; 
    this.docPrintNotes = doc['docPrintNotes']; 
    this.docNumPagesPrint = doc['docNumPagesPrint']; 
    this.docNumFiguresPrint = doc['docNumFiguresPrint']; 
    this.docNumTablesPrint = doc['docNumTablesPrint'];
    this.docNumBoxesPrint = doc['docNumBoxesPrint'];
    this.docNumAppendicesPrint = doc['docNumAppendicesPrint'];
    this.docIndex = index;
  }

  onPrintOrderSubmit() {
    const printOrderDoc = {
      docID: this.docID, //to identify this doc in database
      docTitle: this.docTitle,
      docPrintPosition: this.docPrintPosition,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docPrintNotes: this.docPrintNotes,
      docNumPagesPrint: this.docNumPagesPrint,
      docNumFiguresPrint: this.docNumFiguresPrint,
      docNumTablesPrint: this.docNumTablesPrint,
      docNumBoxesPrint: this.docNumBoxesPrint,
      docNumAppendicesPrint: this.docNumAppendicesPrint
    }
    console.log(printOrderDoc);
    this.authService.putUpdateDoc(printOrderDoc).subscribe(doc => {
      this.docIndex = null;
      this.onSearchSubmit();
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onPrintOrderCancel() {
    this.onSearchSubmit();
    this.docIndex = null;
  }

  onNewSearch() {
    this.printIssueSelect = null;
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

  //Load standard noneditorial parts of a print issue

  onLoadNonEditorial() {
    let layoutPromises = [];

      if(!this.issueSections.includes('Cover')) {
        layoutPromises.push(this.makeDoc('Cover'));
      }
      if(!this.issueSections.includes('Contents')) {
        layoutPromises.push(this.makeDoc('Contents'));
      }
      if(!this.issueSections.includes('CMAJ Open')) {
        layoutPromises.push(this.makeDoc('CMAJ Open'));
      }
      if(!this.issueSections.includes('Dans le CMAJ')) {
        layoutPromises.push(this.makeDoc('Dans le CMAJ'));
      }
      if(!this.issueSections.includes('Cover blurb')) {
        layoutPromises.push(this.makeDoc('Cover blurb'));
      }
      if(!this.issueSections.includes('Masthead')) {
        layoutPromises.push(this.makeDoc('Masthead'));
      }
      if(!this.issueSections.includes('Classified')) {
        layoutPromises.push(this.makeDoc('Classified'));
      }

      Promise.all(layoutPromises)
        .then((value) => {
          this.onSearchSubmit();
        })
        .catch((e) => {
          console.log(e); 
        });

  }

  makeDoc(section) {
    return new Promise( (resolve, reject) => {
      let doc = {
                   docLayoutOnly: true,
                   docSection: section,
                   docTitle: section,
                   docPrintIssue: this.printIssueSelect,
                   docPrintIssueFormatted: this.printIssueFormatted, 
                   docPrintPosition: this.layoutSections.filter(x => x['section']==section).map(x => x['printPosition'])[0],
                   docNumPagesPrint: 0,
                   docFirstPagePrint: 0,
                   docLastPagePrint: 0,
                   docNumFiguresPrint: 0,
                   docNumTablesPrint: 0,
                   docNumBoxesPrint: 0,
                   docPrintNotes: ""
                };
      this.authService.submitDoc(doc).subscribe(data => {
        this.onSearchSubmit();
      },
      err => {
        console.log(err);
        return false;
      });
    });
  }

  onCreateAd() {
    this.makeDoc('Print Ad');
  }

  onCreateFiller() {
    this.makeDoc('Filler');
  }

  //The button to delete the layout only articles (ads, cover, etc) 
  onDeletePreload() {
    if(confirm("Are you sure you want to delete the preloaded documents?")) {
      this.authService.deleteManyDoc(this.printIssueSelect).subscribe(doc => {
        this.onSearchSubmit();
      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  onDeleteDocSubmit(doc, index) {
    if(confirm("Are you sure you want to delete this document?")) {
    const docID = doc["_id"]; 
      this.authService.deleteOneDoc(docID).subscribe(doc => {
        this.onSearchSubmit();
      },
      err => {
        console.log(err);
        return false;
      });
    }
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
                      label: 'Open Access',
                      value: 'docOpenAccess' 
                    },
                    {
                      label: 'Continued Professional Development',
                      value: 'docProfessionalDev'
                    },
                    {
                      label: 'MS Editor',
                      value: 'docEditor' 
                    },
                    {
                      label: 'Online Issue',
                      value: 'docOnlineIssueFormatted' 
                    },
                    {
                      label: 'Ad Conflicts',
                      value: 'docAdConflicts' 
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
                      label: 'Collection Code 5',
                      value: 'docCollectionCode4' 
                    },
                    {
                      label: 'Collection Code 6',
                      value: 'docCollectionCode4' 
                    }
                  ];

    const data = this.displayDocsEditorial; 
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    let a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    let blob = new Blob([csv], { type: 'text/csv' });
    let url= window.URL.createObjectURL(blob);
    a.href = url;
    a.download = this.printIssueFormatted + ' Print Issue.csv';
    a.click();
    return 'success';
  }



}
