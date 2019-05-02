import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
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
    this.authService.getLayoutSearchResults(this.printIssueFormatted).subscribe(entries => {
      if(entries.length == 0) {
        this.noResults = true;
      } 
      else {
        console.log(entries);
        for(let i = 0; i<entries.length; i++) {
          console.log(entries[i]['docFirstPagePrint']);
        }
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

  makeDoc(section, index) {
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
        console.log('Resolving another Ad');
        resolve('done ' + index);
      },
      err => {
        console.log(err);
        return false;
      });
    });
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
    console.log("hello");
    let layoutPromises = [];
    if(!this.issueSections.includes('Print Ad') ||
       !this.issueSections.includes('Cover') ||
       !this.issueSections.includes('Contents') || 
       !this.issueSections.includes('CMAJ Open') || 
       !this.issueSections.includes('Dans le CMAJ') || 
       !this.issueSections.includes('Cover blurb') || 
       !this.issueSections.includes('Filler') || 
       !this.issueSections.includes('Masthead') || 
       !this.issueSections.includes('Classified')  
      ) {

      console.log("found something to add");

      if(!this.issueSections.includes('Print Ad')) {
        for (let i = 0; i < 30; i++) {
          layoutPromises.push(this.makeDoc('Print Ad', i));
        }
      }
      if(!this.issueSections.includes('Filler')) {
        for (let i = 0; i < 10; i++) {
          layoutPromises.push(this.makeDoc('Filler', i));
        }
      }
      if(!this.issueSections.includes('Cover')) {
        layoutPromises.push(this.makeDoc('Cover', 0));
      }
      if(!this.issueSections.includes('Contents')) {
        layoutPromises.push(this.makeDoc('Contents', 0));
      }
      if(!this.issueSections.includes('CMAJ Open')) {
        layoutPromises.push(this.makeDoc('CMAJ Open', 0));
      }
      if(!this.issueSections.includes('Dans le CMAJ')) {
        layoutPromises.push(this.makeDoc('Dans le CMAJ', 0));
      }
      if(!this.issueSections.includes('Cover blurb')) {
        layoutPromises.push(this.makeDoc('Cover blurb', 0));
      }
      if(!this.issueSections.includes('Masthead')) {
        layoutPromises.push(this.makeDoc('Masthead', 0));
      }
      if(!this.issueSections.includes('Filler')) {
        layoutPromises.push(this.makeDoc('Filler', 0));
      }
      if(!this.issueSections.includes('Classified')) {
        layoutPromises.push(this.makeDoc('Classified', 0));
      }
      Promise.all(layoutPromises)
        .then((value) => {
          console.log("All done");
          console.log(value);
          this.onSearchSubmit();
       })
       .catch((e) => {
          console.log(e); 
       });

    } 
  }

  //The button to delete the layout only articles (ads, cover, etc) 
  onDeletePreload() {
    if(confirm("Are you sure you want to delete the preloaded documents?")) {
      this.authService.deleteManyDoc(this.printIssueSelect).subscribe(doc => {
        console.log(doc);
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
        console.log(doc);
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

    const data = this.displayDocsEditorial; 
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
