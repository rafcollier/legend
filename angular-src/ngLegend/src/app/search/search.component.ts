import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

const config = require('../../../../../config/docs');

declare var require: any;
declare var fs: any;
let Json2csvParser = require('json2csv').Parser;
import * as moment from 'moment';

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
  afterOnline: Date;
  beforeOnline: Date;
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
  docNotFinal: Boolean;
  docEditorialOnly: Boolean;
  printIssueFormatted: string;
  numResults: number;

constructor(
  	private authService: AuthService,
    private router: Router,
) { }

  ngOnInit() {
    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetUniqueSections().map(x => x.section);
//    this.editorsMenu = this.authService.localGetEditors().filter(x => x.docEditor).map(x => x.name);
    this.editorsMenu = this.authService.localGetEditors().map(x => x.name);
    this.statusConfig = config.status;
    this.showResults = false;
    this.noResults = false;
  }

  onSearchSubmit() {
    this.authService.getSearchResults(
    	this.docSection,
    	this.docAuthor,
    	this.docDOI,
    	this.docTitle,
      this.docNotUsedOnline,
      this.docNotUsedPrint,
      this.docFlagPrint,
      this.docEditorialOnly,
      this.docNotFinal,
      this.afterAcceptDate,
      this.beforeAcceptDate,
      this.afterOnline,
      this.beforeOnline,
      this.editor,
      this.status
    ).subscribe(entries => {
      if(entries.length == 0) {
        this.noResults = true;
      } else { 
        console.log(entries);
        this.numResults = entries.length;
        this.showResults = true;
        this.displayDocs = entries;
        window.scrollTo(0, 0);
      }
    }, 
    err => {
      console.log(err);
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
    this.docEditorialOnly = null;
    this.docNotFinal = null;
    this.afterAcceptDate = null;
    this.beforeAcceptDate = null;
    this.afterOnline = null;
    this.beforeOnline = null;
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
        label: 'DOI', 
        value: 'docDOI'
      },
      {  
        label: 'Section',
        value: 'docSection' 
      },
      {
        label: 'Status',
        value: 'docStatus' 
      },
      {
        label: 'Department',
        value: 'docDepartment' 
      },
      {
        label: 'Author',
        value: 'docAuthor'
      },
      {
        label: 'Focus Area',
        value: 'docFocusArea' 
      },
      {
        label: 'Accept Date',
        value: 'docAcceptDateFormatted' 
      },
      {
        label: 'Payment Date',
        value: 'docPaymentDateFormatted' 
      },
      {
        label: 'Online Issue',
        value: 'docOnlineIssueFormatted' 
      },
      {
        label: 'Print Issue',
        value: 'docPrintIssueFormatted' 
      },

      //DOCUMENT DETAILS

      {
        label: 'Flag for Print',
        value: 'docFlagPrint' 
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
        label: 'Press Release',
        value: 'docPressRelease' 
      },
      {
        label: 'Continuing Professional Development',
        value: 'docProfessionalDev' 
      },
      {
        label: 'Number of Pages',
        value: 'docNumPages' 
      },
      {
        label: 'Number of Appendices',
        value: 'docNumAppendices' 
      },
      {
        label: 'Number of Figures',
        value: 'docNumFigures' 
      },
      {
        label: 'Number of Boxes',
        value: 'docNumBoxes' 
      },
      {
        label: 'Number of Tables',
        value: 'docNumTables' 
      },
      {
        label: 'Related Material',
        value: 'docRelatedMaterial' 
      },
      {
        label: 'Outstanding Material',
        value: 'docOutStandingMaterial' 
      },
      {
        label: 'Invoice Number',
        value: 'docInvoiceNum'
      },
      {
        label: 'Short Title',
        value: 'docShortTitle' 
      },
      {
        label: 'Web Blurb',
        value: 'docWebBlurb' 
      },
      {
        label: 'Web Image URL',
        value: 'docWebImageURL' 
      },
      {
        label: 'Web Image Credit',
        value: 'docWebImageCredit' 
      },

     //MULTIMEDIA

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
     },
     {
        label: 'Podcast Embargo Link',
        value: 'docPodcastEmbargoLink' 
     },
     {
        label: 'Podcast Permanent Link',
        value: 'docPodcastPermLink' 
     },
     {
        label: 'Podcast Embed Code',
        value: 'docPodcastEmbedCode' 
     },
     {
        label: 'Video Embed Code',
        value: 'docVideoEmbedCode' 
     },
     {
        label: 'Video Link',
        value: 'docVideoLink' 
     },

    //SOCIAL MEDIA

     {
        label: 'URL',
        value: 'docURL' 
     },
     {
        label: 'Hashtags',
        value: 'docHashTags' 
     },
     {
        label: 'Social Summary',
        value: 'docSocialSummary' 
     },
    
    // COLLECTION CODES

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
        value: 'docCollectionCode5' 
    },
    {
        label: 'Collection Code 6',
        value: 'docCollectionCode6' 
    },

  //EDITING TIMELINE

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
        value:'docProofReader' 
   },
   {
        label: 'Senior Editor 1',
        value: 'docSE1' 
   },
   {
        label: 'Senior Editor 2',
        value: 'docSE2' 
   },


  //NOTES
   {
        label: 'General Notes',
        value: 'docNotes' 
   },
   {
        label: 'Online Notes',
        value: 'docOnlineNotes' 
  },
  {
        label: 'Print Notes',
        value: 'docPrintNotes' 
  },

  //ONLINE ISSUE

  {
        label: 'Online First Page',
        value: 'docFirstPageOnline' 
  },
  {
        label: 'Online Last Page',
        value: 'docLastPageOnline' 
  },
  {
        label: 'Online position',
        value: 'docOnlinePosition' 
  },
  {
        label: 'Online Volume',
        value: 'docOnlineVolume' 
  },
  {
        label: 'Online Issue Number',
        value: 'docOnlineIssueNumber' 
  },

    //PRINT ISSUE

  {
        label: 'Print Ad Conflicts',
        value: 'docAdConflicts' 
  },
  {
        label: 'Print First Page',
        value: 'docFirstPagePrint' 
  },
  {
        label: 'Print Last Page',
        value: 'docLastPagePrint' 
  },
  {
        label: 'Print position',
        value: 'docPrintPosition' 
  },

  /*
  //PRINT ADS

  {
        label: 'Ad Client',
        value: 'docAdClient' 
  },
  {
        label: 'Ad Description',
        value: 'docAdDescription' 
  },
  {
        label: 'Ad Size',
        value: 'docAdSize' 
  },
  {
        label: 'Ad First Page',
        value: 'docAdFirstPagePrint' 
  },
  {
        label: 'Ad Last Page',
        value: 'docAdLastPagePrint' 
  },
  */
  

  { 
        label: 'InCopy Enter Date',
        value: 'docEnteredDateFormatted' 
  },
  {
        label: 'Copy Edit Begin Date',
        value: 'docCopyEditBeginDateFormatted' 
  },
  {
        label: 'Copy Edit Complete Date',
        value: 'docCopyEditCompleteDateFormatted' 
  },
  {
        label: 'Send SE Date',
        value: 'docSendSEDateFormatted' 
  },
  {
        label: 'Return SE Date',
        value: 'docReturnSEDateFormatted' 
  },
  {
        label: 'Send Author Date',
        value: 'docSendAuthorDateFormatted' 
  },
  {
        label: 'Return Author Date',
        value: 'docReturnAuthorDateFormatted' 
  },
  {
        label: 'Send Fine Tune Date',
        value: 'docSendFineTuneDateFormatted' 
  },
  {
        label: 'Return Fine Tune Date',
        value: 'docReturnFineTuneDateFormatted' 
  },
  {
        label: 'Send Proof Read Date',
        value: 'docSendProofReadDateFormatted' 
  },
  {
        label: 'Return Proof Read Date',
        value: 'docReturnProofReadDateFormatted' 
  },
  {
        label: 'Finalize Date',
        value: 'docFinalizeDateFormatted' 
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
    a.download = 'Editorial_Search_Results.csv';
    a.click();
    return 'success';
  }

  onDownloadNews() {

    const fields = [
      {
        label: 'Title',
        value: 'docTitle'
      },
      {  
        label: 'DOI', 
        value: 'docDOI'
      },
      {
        label: 'Status',
        value: 'docStatus' 
      },
      {
        label: 'Author',
        value: 'docAuthor'
      },
      {
        label: 'Commission Date',
        value: 'docNewsCommissionDateFormatted' 
      },
      {
        label: 'Receive Date',
        value: 'docAcceptDateFormatted' 
      },
      {
        label: 'Duty Edit Date',
        value: 'docSendSEDateFormatted' 
      },
      {
        label: 'Ready Date',
        value: 'docNewsReadyFormatted' 
      },
      {
        label: 'Posted Date',
        value: 'docPublishDateCMAJnewsFormatted' 
      },
      {
        label: 'ETOC Date',
        value: 'docETOCDateFormatted' 
      },
      {
        label: 'Online Issue',
        value: 'docOnlineIssueFormatted' 
      },
      {
        label: 'Print Issue',
        value: 'docPrintIssueFormatted' 
      },
      {
        label: 'Web Blurb',
        value: 'docWebBlurb' 
      },
      {
        label: 'Web Image URL',
        value: 'docWebImageURL' 
      },
      {
        label: 'Web Image Credit',
        value: 'docWebImageCredit' 
      },
      {
        label: 'Focus Area',
        value: 'docFocusArea' 
      },
      {
        label: 'Print Ad Conflicts',
        value: 'docAdConflicts' 
      },
      {
        label: 'URL',
        value: 'docURL' 
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
        value: 'docCollectionCode5' 
      },
      {
        label: 'Collection Code 6',
        value: 'docCollectionCode6' 
      },
      {
        label: 'General Notes',
        value: 'docNotes' 
      },
      {
        label: 'Online Notes',
        value: 'docOnlineNotes' 
      },
      {
        label: 'Print Notes',
        value: 'docPrintNotes' 
      },
      {
        label: 'Number of Pages',
        value: 'docNumPages' 
      },
      {
        label: 'Online First Page',
        value: 'docFirstPageOnline' 
      },
      {
        label: 'Online Last Page',
        value: 'docLastPageOnline' 
      },
      {
        label: 'Online position',
        value: 'docOnlinePosition' 
      },
      {
        label: 'Online Volume',
        value: 'docOnlineVolume' 
      },
      {
        label: 'Online Issue Number',
        value: 'docOnlineIssueNumber' 
      },
      {
        label: 'Print First Page',
        value: 'docFirstPagePrint' 
      },
      {
        label: 'Print Last Page',
        value: 'docLastPagePrint' 
      },
      {
        label: 'Print position',
        value: 'docPrintPosition' 
      }

  /*
  //PRINT ADS

  {
        label: 'Ad Client',
        value: 'docAdClient' 
  },
  {
        label: 'Ad Description',
        value: 'docAdDescription' 
  },
  {
        label: 'Ad Size',
        value: 'docAdSize' 
  },
  {
        label: 'Ad First Page',
        value: 'docAdFirstPagePrint' 
  },
  {
        label: 'Ad Last Page',
        value: 'docAdLastPagePrint' 
  },
  */
  
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
    a.download = 'News_Search_Results.csv';
    a.click();
    return 'success';
  }

}
