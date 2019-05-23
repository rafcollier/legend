import { Component, OnInit, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-enterdoc',
  templateUrl: './enterdoc.component.html',
  styleUrls: ['./enterdoc.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnterdocComponent implements OnInit {
 
  //GENERAL FIELDS
  docDOI: Number;
  docSection: String;
  docDepartment: String;
  docAuthor: String;
  docTitle: String;
  docFocusArea: String;  
  prevOnlineIssue: Object;

  //DOCUMENT DETAILS
  docFlagPrint: Boolean;
  docOpenAccess: Boolean;
  docTranslation: Boolean;
  docPressRelease: Boolean;
  docProfessionalDev: Boolean;
  docRelatedMaterial: String;
  docOutStandingMaterial: String;
  docInvoiceNum: String;
  docShortTitle: String;
  docWebBlurb: String;
  docWebImageURL: String;
  docWebImageCredit: String;

  //LAYOUT
  docNumPages: number = 0;
  docNumPagesOnline: number = 0;
  docNumPagesPrint: number = 0;
  docNumFigures: number = 0;
  docNumFiguresOnline: number = 0;
  docNumFiguresPrint: number = 0;
  docNumBoxes: number = 0;
  docNumBoxesOnline: number = 0;
  docNumBoxesPrint: number = 0;
  docNumTables: number = 0;
  docNumTablesOnline: number = 0;
  docNumTablesPrint: number = 0;
  docNumAppendices: number = 0;
  docNumAppendicesOnline: number = 0;
  docNumAppendicesPrint: number = 0;

  //MULTIMEDIA
  docMultiMedia1: String;
  docMultiMedia2: String;
  docMultiMedia3: String;
  docPodcastEmbargoLink: String;
  docPodcastPermLink: String;
  docPodcastEmbedCode: String;
  docVideoEmbedCode: String;
  docVideoLink: String;

  //SOCIAL MEDIA
  docURL: String;
  docHashTags: String;
  docSocialSummary: String;
    
  // COLLECTION CODES
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docCollectionCode5: String;
  docCollectionCode6: String;
 // code1Code: Number;
 // code2Code: Number;
 // code3Code: Number;
 // code4Code: Number;
 // code5Code: Number;
 // code6Code: Number;

  //DOCUMENT TIMELINE
  docAcceptDate: Date;
  docPaymentDate: Date;
  docETOCDate: Date;
  docOnlineIssue: Date;
  docPrintIssue: Date;

  //EDITING TIMELINE
  docEditor: String;
  docCoordinator: String;
  docProofReader: String;
  docSE1: String;
  docSE2: String;
  docEnteredDate: Date;
  docCopyEditBeginDate: Date;
  docCopyEditCompleteDate: Date;
  docSendSEDate: Date;
  docReturnSEDate: Date;
  docSendAuthorDate: Date;
  docReturnAuthorDate: Date;
  docSendFineTune: Date;
  docReturnFineTune: Date;
  docSendProofRead: Date;
  docReturnProofRead: Date;
  docFinalizeDate: Date;
  docStatus: String;

  //NOTES
  docNotes: String;
  docOnlineNotes: String;
  docPrintNotes: String;

  //ONLINE ISSUE
  docFirstPageOnline: number = 0;
  docLastPageOnline: number = 0;
  docOnlinePosition: number = 0;
  docOnlineVolume: number = 0;
  docOnlineIssueNumber: number = 0;

  //PRINT ISSUE
  docAdConflicts: String;
  docFirstPagePrint: number = 0;
  docLastPagePrint: number = 0;
  docPrintPosition: number = 0;

  //PRINT ADS
  docAdClient: String;
  docAdDescription: String; 
  docAdSize: Number; 
  docAdFirstPagePrint: Number;
  docAdLastPagePrint: Number; 
  
  //NEWS ONLY
  docNewsReady: Date;
  docPublishDateCMAJnews: Date;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;

  //FORMATTED DATES FOR DISPLAY

  docAcceptDateFormatted: String;
  docPaymentDateFormatted: String;
  docETOCDateFormatted: String;
  docOnlineIssueFormatted: String;
  docPrintIssueFormatted: String;
  docEnteredDateFormatted: String;
  docCopyEditBeginDateFormatted: String;
  docCopyEditCompleteDateFormatted: String;
  docSendSEDateFormatted: String;
  docReturnSEDateFormatted: String;
  docSendAuthorDateFormatted: String;
  docReturnAuthorDateFormatted: String;
  docSendFineTuneDateFormatted: String;
  docReturnFineTuneDateFormatted: String;
  docSendProofReadDateFormatted: String;
  docReturnProofReadDateFormatted: String;
  docFinalizeDateFormatted: String;
  docNewsReadyFormatted: String;
  docPublishDateCMAJnewsFormatted: String; 
  docNewsCommissionDateFormatted: String;
  docNewsInvoiceDateFormatted: String;

  //Generated from login user
  username: String;

  //loaded from config data 
  sections: object[]; 
  sectionsUnique: object[]; 
  sectionsUniqueMenu: string[]; 
  departments: object[]; 
  departmentsMenu: string[]; 
  configFile: object;
  online: object [];
  codes: object [];
  editors: object []; 
  editorsMenu: string []; 
  coordinatorsMenu: string []; 
  proofersMenu: string []; 
  seMenu: string []; 
  codesMenu: string []; 
  multimedia: string []; 
  focusareas: string []; 

  showNews: Boolean = false;
  showLetter: Boolean = false;
  showOther: Boolean = false;

  myControlCodes1 = new FormControl();
  filteredCodes1: Observable<string[]>;
  myControlCodes2 = new FormControl();
  filteredCodes2: Observable<string[]>;
  myControlCodes3 = new FormControl();
  filteredCodes3: Observable<string[]>;
  myControlCodes4 = new FormControl();
  filteredCodes4: Observable<string[]>;
  myControlCodes5 = new FormControl();
  filteredCodes5: Observable<string[]>;
  myControlCodes6 = new FormControl();
  filteredCodes6: Observable<string[]>;

  errorMessage: String = "";
  successMessage: String = "";

  constructor(
  	private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    this.filteredCodes1 = this.myControlCodes1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes2 = this.myControlCodes2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes3 = this.myControlCodes3.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes4 = this.myControlCodes4.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes5 = this.myControlCodes5.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.filteredCodes6 = this.myControlCodes6.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCode(value))
    );

    this.showNews = false;
    this.showLetter = false;
    this.showOther = false;
    this.username = this.authService.loadUsername(); 
    this.configFile = this.authService.localGetConfigFile();
    this.sections = this.authService.localGetSections(); 
    this.editors = this.authService.localGetEditors(); 
    this.codes = this.authService.localGetCodes();
    this.online = this.authService.localGetOnline(); 
    this.departments = this.authService.localGetDepartments();
    this.sectionsUnique = this.authService.localGetUniqueSections(); 
    this.departmentsMenu = this.authService.localGetDepartments().map(x => x.department); 
    this.editorsMenu = this.authService.localGetEditors().filter(x => x.docEditor).map(x => x.name);
    this.coordinatorsMenu = this.authService.localGetEditors().filter(x => x.docCoordinator).map(x => x.name);
    this.proofersMenu = this.authService.localGetEditors().filter(x => x.docProofReader).map(x => x.name);
    this.seMenu = this.authService.localGetEditors().filter(x => x.docSE).map(x => x.name);
    this.codesMenu = this.authService.localGetCodes().map(x => x.description.concat(' - ', x.code.toString()));
    this.focusareas = this.authService.localGetCodes().filter(x => x.focus).map(x => x.description);

    const mediaArray: string [] = [
                         this.configFile['multiMedia1'], 
                         this.configFile['multiMedia2'],
                         this.configFile['multiMedia3'],
                         this.configFile['multiMedia4'],
                         this.configFile['multiMedia5'],
                         this.configFile['multiMedia6']
                       ];

    this.multimedia = mediaArray.filter(x => x.length > 0);

    //Get name of section from previous screen.
    this.route.params.subscribe(params => {
      this.docSection = params['section'];
      if (this.docSection.toLowerCase() == "news") { 
        this.showNews = true;
        this.getNewsDOI();
      }
      else if (this.docSection.toLowerCase() == "letter") {
        this.showLetter = true;
      }
      else {
        this.showOther = true;
      }
    });
  }

  //For online issues, only show calendar days that are loaded in from admin page that have online issues.
  myFilter = (d: Date): boolean => {
    const onlineIssueDates = this.online.map( x => moment(x['date']).format('MMMM DD, YYYY'));
    const calendarDay = moment(d).format('MMMM DD, YYYY');
    return onlineIssueDates.includes(calendarDay); 
  }

  //For print issues, just allow selection of first day of the month.
  myFilterPrint = (d: Date): boolean => {
    const calendarDay = moment(d).format('D');
    return calendarDay == '1'; 
  }

  private _filterCode(value: string): string[] {
    const filterValueCode = value.toLowerCase();
    return this.codesMenu.filter(option => option.toLowerCase().includes(filterValueCode));
  }

  //Get highest value DOI from database for news article and increment by 1 for current DOI. 
  getNewsDOI() {
    this.authService.getNewsDOI().subscribe(doi => {
      if(doi.length == 0) {
        this.docDOI = this.configFile['firstNewsDOI'] + 1;
      }
      else {
        this.docDOI = doi[0].docDOI + 1;
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  onDocSubmit(){
    if(this.docOnlineIssue) {
      this.getVolumeIssue();
    }
    else {
      this.getPositions();
    }
  }

  //Get the volume and issue number from information entered from the admin page.
  getVolumeIssue() {
    const date1 = moment(this.docOnlineIssue).format('MMMM DD, YYYY');
    const temp = this.online.map( x => {
      x['date'] = moment(x['date']).format('MMMM DD, YYYY');
      return {'date': x['date'], 'volume': x['volume'], 'issue': x['issue']};
    });
    this.docOnlineVolume = temp.filter(x => x['date'] == date1).map(x => x['volume'])[0];
    this.docOnlineIssueNumber = temp.filter(x => x['date'] == date1).map(x => x['issue'])[0];
    this.getPositions();
  }

  //Get the positions in the table of contents for each paper based on info entered into "Sections" on admin page
  getPositions() {
    if(this.docDepartment) {
      this.docOnlinePosition = this.departments.filter(x => x['department'] == this.docDepartment).map(x => x['onlinePosition'])[0];
      this.docPrintPosition = this.departments.filter(x => x['department'] == this.docDepartment).map(x => x['printPosition'])[0];
    }
    else if (this.docSection) {
      this.docOnlinePosition = this.sectionsUnique.filter(x => x['section'] == this.docSection).map(x => x['onlinePosition'])[0];
      this.docPrintPosition = this.sectionsUnique.filter(x => x['section'] == this.docSection).map(x => x['printPosition'])[0];
    }
    if (this.docSection != "News") {
      this.docETOCDate = this.docOnlineIssue;
      this.getStatus();
    } 
    else {
      this.getNewsStatus();
    }
  }

  //Get the status of an article based on where it is in the editing process
  getStatus() {
    if(this.docFinalizeDate) this.docStatus = "8 - Final"; 
    else if (this.docSendProofRead) this.docStatus = "7 - Proof Reading";
    else if (this.docSendFineTune) this.docStatus = "6 - Fine Tuning";
    else if (this.docSendAuthorDate) this.docStatus = "5 - Author Review";
    else if (this.docSendSEDate) this.docStatus = "4 - SE Review";
    else if (this.docCopyEditBeginDate) this.docStatus = "3 - Copy Edit";
    else if (this.docEnteredDate) this.docStatus = "2 - InCopy";
    else if (this.docAcceptDate) this.docStatus = "1 - Accepted";
    else this.docStatus = "0 - No Status";
    this.submitNewDoc();
  }

  getNewsStatus() {
    if(this.docPublishDateCMAJnews) this.docStatus = "E - News Posted";
    else if(this.docNewsReady) this.docStatus = "D - News Ready";
    else if(this.docAcceptDate) this.docStatus = "C - News In Edit";
    else if(this.docNewsCommissionDate) this.docStatus = "B - News Commissioned";
    else this.docStatus = "A - News No Status";
    this.submitNewDoc();
  }

  submitNewDoc(){

    //Set default values for layout numbers (pages, figures, etc.) to match original value unless entered directly
    if( (this.docNumPages) && !(this.docNumPagesOnline) ) this.docNumPagesOnline = this.docNumPages; 
    if( (this.docNumPages) && !(this.docNumPagesPrint) ) this.docNumPagesPrint = this.docNumPages; 
    if( (this.docNumFigures) && !(this.docNumFiguresOnline) ) this.docNumFiguresOnline = this.docNumFigures; 
    if( (this.docNumFigures) && !(this.docNumFiguresPrint) ) this.docNumFiguresPrint = this.docNumFigures; 
    if( (this.docNumBoxes) && !(this.docNumBoxesOnline) ) this.docNumBoxesOnline = this.docNumBoxes; 
    if( (this.docNumBoxes) && !(this.docNumBoxesPrint) ) this.docNumBoxesPrint = this.docNumBoxes; 
    if( (this.docNumTables) && !(this.docNumTablesOnline) ) this.docNumTablesOnline = this.docNumTables; 
    if( (this.docNumTables) && !(this.docNumTablesPrint) ) this.docNumTablesPrint = this.docNumTables; 
    if( (this.docNumAppendices) && !(this.docNumAppendicesOnline) ) this.docNumAppendicesOnline = this.docNumAppendices; 
    if( (this.docNumAppendices) && !(this.docNumAppendicesPrint) ) this.docNumAppendicesPrint = this.docNumAppendices; 

    let doc = {

      docUsername: this.username,

      //GENERAL FIELDS

      docDOI: this.docDOI,
      docSection: this.docSection,
      docDepartment: this.docDepartment,
      docAuthor: this.docAuthor,
      docTitle: this.docTitle,
      docFocusArea: this.docFocusArea,
    
      //DOCUMENT DETAILS
    
      docFlagPrint: this.docFlagPrint,
      docOpenAccess: this.docOpenAccess,
      docTranslation: this.docTranslation,
      docPressRelease: this.docPressRelease,
      docProfessionalDev: this.docProfessionalDev,
      docRelatedMaterial: this.docRelatedMaterial,
      docOutStandingMaterial: this.docOutStandingMaterial,
      docInvoiceNum: this.docInvoiceNum,
      docShortTitle: this.docShortTitle,
      docWebBlurb: this.docWebBlurb,
      docWebImageURL: this.docWebImageURL,
      docWebImageCredit: this.docWebImageCredit,
   
      //LAYOUT

      docNumPages: this.docNumPages,
      docNumPagesOnline: this.docNumPagesOnline,
      docNumPagesPrint: this.docNumPagesPrint,
      docNumFigures: this.docNumFigures,
      docNumFiguresOnline: this.docNumFiguresOnline,
      docNumFiguresPrint: this.docNumFiguresPrint,
      docNumBoxes: this.docNumBoxes,
      docNumBoxesOnline: this.docNumBoxesOnline,
      docNumBoxesPrint: this.docNumBoxesPrint,
      docNumTables: this.docNumTables,
      docNumTablesOnline: this.docNumTablesOnline,
      docNumTablesPrint: this.docNumTablesPrint,
      docNumAppendices: this.docNumAppendices,
      docNumAppendicesOnline: this.docNumAppendicesOnline,
      docNumAppendicesPrint: this.docNumAppendicesPrint,

      //MULTIMEDIA
    
      docMultiMedia1: this.docMultiMedia1,
      docMultiMedia2: this.docMultiMedia2,
      docMultiMedia3: this.docMultiMedia3,
      docPodcastEmbargoLink: this.docPodcastEmbargoLink,
      docPodcastPermLink: this.docPodcastPermLink,
      docPodcastEmbedCode: this.docPodcastEmbedCode,
      docVideoEmbedCode: this.docVideoEmbedCode,
      docVideoLink: this.docVideoLink,
    
      //SOCIAL MEDIA
    
      docURL: this.docURL,
      docHashTags: this.docHashTags,
      docSocialSummary: this.docSocialSummary,
        
      //COLLECTION CODES
    
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,
      docCollectionCode5: this.docCollectionCode5,
      docCollectionCode6: this.docCollectionCode6,
      //Get number codes in admin associated with selected collection codes
      //code1Code: this.codes.filter(x => x['description'] == this.docCollectionCode1).map(x => x['code'])[0],
      //code2Code: this.codes.filter(x => x['description'] == this.docCollectionCode2).map(x => x['code'])[0],
      //code3Code: this.codes.filter(x => x['description'] == this.docCollectionCode3).map(x => x['code'])[0],
      //code4Code: this.codes.filter(x => x['description'] == this.docCollectionCode4).map(x => x['code'])[0],
      //code5Code: this.codes.filter(x => x['description'] == this.docCollectionCode5).map(x => x['code'])[0],
      //code6Code: this.codes.filter(x => x['description'] == this.docCollectionCode6).map(x => x['code'])[0],
    
      //DOCUMENT TIMELINE
    
      docAcceptDate: this.docAcceptDate,
      docPaymentDate: this.docPaymentDate,
      docETOCDate: this.docETOCDate,
      docOnlineIssue: this.docOnlineIssue,
      docPrintIssue: this.docPrintIssue,
    
      //EDITING TIMELINE
    
      docEditor: this.docEditor,
      docCoordinator: this.docCoordinator,
      docProofReader: this.docProofReader,
      docSE1: this.docSE1,
      docSE2: this.docSE2,
      docEnteredDate: this.docEnteredDate,
      docCopyEditBeginDate: this.docCopyEditBeginDate,
      docCopyEditCompleteDate: this.docCopyEditCompleteDate,
      docSendSEDate: this.docSendSEDate,
      docReturnSEDate: this.docReturnSEDate,
      docSendAuthorDate: this.docSendAuthorDate,
      docReturnAuthorDate: this.docReturnAuthorDate,
      docSendFineTune: this.docSendFineTune,
      docReturnFineTune: this.docReturnFineTune,
      docSendProofRead: this.docSendProofRead,
      docReturnProofRead: this.docReturnProofRead,
      docFinalizeDate: this.docFinalizeDate,
      docStatus: this.docStatus,
   
      //NOTES 
      docNotes: this.docNotes,
      docOnlineNotes: this.docOnlineNotes,
      docPrintNotes: this.docPrintNotes,

      //ONLINE ISSUE
    
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docOnlinePosition: this.docOnlinePosition,
      docOnlineVolume: this.docOnlineVolume,
      docOnlineIssueNumber: this.docOnlineIssueNumber,
    
      //PRINT ISSUE
    
      docAdConflicts: this.docAdConflicts,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docPrintPosition: this.docPrintPosition,

      //PRINT ADS
      docAdClient: this.docAdClient, 
      docAdDescription: this.docAdDescription, 
      docAdSize: this.docAdSize, 
      docAdFirstPagePrint: this.docAdFirstPagePrint, 
      docAdLastPagePrint: this.docAdLastPagePrint, 
      
      //NEWS ONLY
    
      docNewsReady: this.docNewsReady,
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount,

      //FORMATTED DATES

      docAcceptDateFormatted: moment(this.docAcceptDate).format('MMMM DD, YYYY'),
      docPaymentDateFormatted: moment(this.docPaymentDate).format('MMMM DD, YYYY'),
      docETOCDateFormatted: moment(this.docETOCDate).format('MMMM DD, YYYY'),
      docOnlineIssueFormatted: moment(this.docOnlineIssue).format('MMMM DD, YYYY'),
      docPrintIssueFormatted: moment(this.docPrintIssue).format('MMMM YYYY'),
      docEnteredDateFormatted: moment(this.docEnteredDate).format('MMMM DD, YYYY'),
      docCopyEditBeginDateFormatted: moment(this.docCopyEditBeginDate).format('MMMM DD, YYYY'),
      docCopyEditCompleteDateFormatted: moment(this.docCopyEditCompleteDate).format('MMMM DD, YYYY'),
      docSendSEDateFormatted: moment(this.docSendSEDate).format('MMMM DD, YYYY'),
      docReturnSEDateFormatted: moment(this.docReturnSEDate).format('MMMM DD, YYYY'),
      docSendAuthorDateFormatted: moment(this.docSendAuthorDate).format('MMMM DD, YYYY'),
      docReturnAuthorDateFormatted: moment(this.docReturnAuthorDate).format('MMMM DD, YYYY'),
      docSendFineTuneDateFormatted: moment(this.docSendFineTune).format('MMMM DD, YYYY'),
      docReturnFineTuneDateFormatted: moment(this.docReturnFineTune).format('MMMM DD, YYYY'),
      docSendProofReadDateFormatted: moment(this.docSendProofRead).format('MMMM DD, YYYY'),
      docReturnProofReadDateFormatted: moment(this.docReturnProofRead).format('MMMM DD, YYYY'),
      docFinalizeDateFormatted: moment(this.docFinalizeDate).format('MMMM DD, YYYY'),
      docNewsReadyFormatted: moment(this.docNewsReady).format('MMMM DD, YYYY'),
      docPublishDateCMAJnewsFormatted: moment(this.docPublishDateCMAJnews).format('MMMM DD, YYYY'),
      docNewsCommissionDateFormatted: moment(this.docNewsCommissionDate).format('MMMM DD, YYYY'),
      docNewsInvoiceDateFormatted: moment(this.docNewsInvoiceDate).format('MMMM DD, YYYY'),
    
    }

    this.authService.submitDoc(doc).subscribe(data => {

      if(data.success){
        this.successMessage = data.msg;
        setTimeout(() => {
          this.successMessage = "";
          this.router.navigate(['/recent']); 
        }, 2000);
      } 
      else {
        this.errorMessage = data.msg;
        setTimeout(() => {
          this.errorMessage = "";
          this.ngOnInit();
        }, 2000);
      }

    });

  }

}
