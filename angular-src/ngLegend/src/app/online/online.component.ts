import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

const config = require('../../../../../config/docs');

declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css']
})
export class OnlineComponent implements OnInit {
  showResults: Boolean;
  onlineIssues: [Object]; 
  onlineIssuesDates: Array<any>; 
  onlineIssuesVolume: String;
  onlineIssuesIssue: String; 
  displayDocs: [Object];
  onlineOrder: [Object];
  username: String;
  docOnlineIssue: String;
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

  lastPagePrevIssue: Number;
  sorted: Boolean;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
    this.username = this.authService.loadUsername(); 
    this.onlineIssues = this.authService.localGetOnline(); 
    console.log(this.onlineIssues);
    this.onlineIssuesDates = this.onlineIssues.map(a => a['date']);
    this.onlineOrder = config.onlineorder;
    this.showResults = false;
    this.sorted = true;
  }

  onSearchSubmit() {
    console.log(this.docOnlineIssue);
    this.authService.getOnlineSearchResults(this.docOnlineIssue).subscribe(entries => {
    
      this.displayDocs = entries;

      console.log(this.displayDocs);

      this.getVolumeIssue(); 
      this.checkSorted();
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  getVolumeIssue() {
    for(let i = 0; i <this.onlineIssues.length; i++) {
      if(this.onlineIssues[i]['date'] == this.docOnlineIssue) {
        this.onlineIssuesVolume = this.onlineIssues[i]['volume'];
        this.onlineIssuesIssue = this.onlineIssues[i]['issue'];
        if(this.onlineIssues[i]['date'] != 'May 7, 2018') {
          this.getLastPagePreviousIssue(this.onlineIssues[i + 1]['date']);
        }
        break;
      }
    }
  }

  getLastPagePreviousIssue(onlineIssue) {
    console.log("calling auth services" + onlineIssue);
    this.authService.getOnlineLastPage(onlineIssue).subscribe(entries => {
      console.log(entries);
      this.lastPagePrevIssue = entries[0]['docLastPageOnline'];
    }, 
    err => {
        console.log(err);
        return false;
    });
  }

  checkSorted() {
    for (let i = 0; i < this.displayDocs.length; i++) {
      if (!(this.displayDocs[i]['docOnlinePosition'])) {
        this.sorted = false;
        break;
      }
      else {
        this.sorted = true;
        this.showResults = true;
      }
    }
    if (!(this.sorted)) {
      this.getTypes();
    }
  }

  getTypes() {
    console.log(this.displayDocs);
    let types = [];
    for (let i = 0; i < this.displayDocs.length; i++) {
      if (this.displayDocs[i]['docSection'].toLowerCase() == 'practice' || this.displayDocs[i]['docSection'].toLowerCase() == 'humanities') {
        if (this.displayDocs[i]['docDepartment']) {
          types[i] = this.displayDocs[i]['docDepartment'].toLowerCase(); 
        }
        else {
          types[i] = this.displayDocs[i]['docSection'].toLowerCase(); 
        }
      }
      else {
        types[i] = this.displayDocs[i]['docSection'].toLowerCase();
      }
    }
    console.log(types);
    this.getOnlinePosition(types, 0);
  }

  
  getOnlinePosition(types, index) {

    console.log(this.onlineOrder);

    if (!(this.displayDocs[index]['docOnlinePosition'])) {
      for(let i=0; i<this.onlineOrder.length; i++) {
        if(this.onlineOrder[i]['type'].toLowerCase() == types[index].toLowerCase())  {
          console.log(this.onlineOrder[i]['type'].toLowerCase());
          console.log(this.onlineOrder[i]['position']);
          this.updateOnlinePosition(this.displayDocs[index], this.onlineOrder[i]['position']);
        }
      }
    }
  } 

  updateOnlinePosition(doc, position) {
    const docOrderUpdate = {
      docID: doc['_id'],
      docOnlinePosition: position 
    }
    this.authService.putUpdateDoc(docOrderUpdate).subscribe(doc => {
      //this.onSearchSubmit();
     // this.showResults = true;
      this.onSearchSubmit();
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
    console.log("submit online order edits");
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

  onNewSearch() {
  	this.docOnlineIssue = "";
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
