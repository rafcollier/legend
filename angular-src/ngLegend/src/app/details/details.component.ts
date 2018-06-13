import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
const config = require('../../../../../config/docs');

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private sub: any;
  detailsID: String;	
  username: String; //currently logged in user
  oneDoc: Object;
  editDoc: Boolean = false;
  showNews: Boolean = false;
  docUsername: String; //user who entered document originally
  docID: String; //unique ID for database entry

  //from config
  sections: [String]; 
  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 
  authortypes: [String]; 
  editors: [String]; 
  coordinators: [String]; 
  proofers: [String]; 
  se1s: [String]; 

  //Same as in Enter Document Component
    //GENERAL FIELDS
  docTitle: String;
  docAuthor: String;
  docDOI: Number;
  docSection: String;
  docDescription: String;
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docAuthorType: String;
  docCommissionDate: Date;
  docInvoiceDate: Date;
  docInvoiceAmount: Number;

  //TIMELINE

  docAcceptDate: Date;
  docPublishDate: Date;
  docETOCDate: Date;
  docEnteredDate: Date;
  docCopyEditBeginDate: Date;
  docCopyEditCompleteDate: Date;
  docSendSEDate: Date;
  docReturnSEDate: Date;
  docSendAuthorDate: Date;
  docReturnAuthorDate: Date;
  docFinalizeDate: Date;
  docPaymentDate: Date;

  //EDITORS
  docEditor: String;
  docCoordinator: String;
  docProofReader: String;
  docSE1: String;
  docSE2: String;

  //YES OR NO FIELDS
  docOpenAccess: Boolean; 
  docTranslation: Boolean;
  
  //ONLINE ISSUE

  docOnlineIssue: String;
  docFirstPageOnline: Number;
  docLastPageOnline: Number;
  docNumPagesOnline: Number;
  docOnlineNotes: String;

  //PRINT ISSUE

  docPrintIssue: String;
  docFirstPagePrint: Number;
  docLastPagePrint: Number;
  docNumPagesPrint: Number;
  docPrintNotes: String;
  docAdConflicts: String;

  //NEWS ONLY
  docPublishDateCMAJnews: Date; 
  docNewsAuthorType: String;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;

  //FORMATTED DATES FOR DISPLAY
  docCommissionDateFormatted: String;
  docInvoiceDateFormatted: String;
  docAcceptDateFormatted: String;
  docPublishDateFormatted: String;
  docETOCDateFormatted: String;
  docPaymentDateFormatted: String;
  docEnteredDateFormatted: String;
  docCopyEditBeginDateFormatted: String;
  docCopyEditCompleteDateFormatted: String;
  docSendSEDateFormatted: String;
  docReturnSEDateFormatted: String;
  docSendAuthorDateFormatted: String;
  docReturnAuthorDateFormatted: String;
  docFinalizeDateFormatted: String;
  docPublishDateCMAJnewsFormatted: String; 
  docNewsCommissionDateFormatted: String;
  docNewsInvoiceDateFormatted: String;

  constructor(
  	private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { } 

    ngOnInit() {

    this.editDoc = false;

    this.sections = config.sections;
    this.onlineIssues = config.onlineIssues;
    this.printIssues = config.printIssues;
    this.collectionCodes = config.collectionCodes;
    this.editors = config.editors;
    this.coordinators = config.coordinators;
    this.proofers = config.proofers;
    this.se1s = config.se1s;
    this.authortypes = config.authortypes;

    this.route.params.subscribe(params => {
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
      this.docID = doc._id;

      if(doc.docSection == "News") {
        this.showNews = true;
      }

      //GENERAL FIELDS
      this.docTitle = doc.docTitle;
      this.docAuthor = doc.docAuthor;
      this.docDOI = doc.docDOI;
      this.docSection = doc.docSection;
      this.docDescription = doc.docDescription;
      this.docCollectionCode1 = doc.docCollectionCode1;
      this.docCollectionCode2 = doc.docCollectionCode2;
      this.docCollectionCode3 = doc.docCollectionCode3;
      this.docCollectionCode4 = doc.docCollectionCode4;
      this.docAuthorType = doc.docAuthorType;
      this.docCommissionDate = doc.docCommissionDate;
      this.docCommissionDateFormatted = doc.docCommissionDateFormatted;
      this.docInvoiceDate = doc.docInvoiceDate;
      this.docInvoiceDateFormatted = doc.docInvoiceDateFormatted;
      this.docInvoiceAmount = doc.docInvoiceAmount;

      //TIMELINE

      this.docAcceptDate = doc.docAcceptDate;
      this.docAcceptDateFormatted = doc.docAcceptDateFormatted;
      this.docPublishDate = doc.docPublishDate;
      this.docPublishDateFormatted = doc.docPublishDateFormatted;
      this.docETOCDate = doc.docETOCDate;
      this.docETOCDateFormatted = doc.docETOCDateFormatted;
      this.docEnteredDate = doc.docEnteredDate;
      this.docEnteredDateFormatted = doc.docEnteredDateFormatted;
      this.docCopyEditBeginDate = doc.docCopyEditBeginDate;
      this.docCopyEditBeginDateFormatted = doc.docCopyEditBeginDateFormatted;
      this.docCopyEditCompleteDate = doc.docCopyEditCompleteDate;
      this.docCopyEditCompleteDateFormatted = doc.docCopyEditCompleteDateFormatted;
      this.docSendSEDate = doc.docSendSEDate;
      this.docSendSEDateFormatted = doc.docSendSEDateFormatted;
      this.docReturnSEDate = doc.docReturnSEDate;
      this.docReturnSEDateFormatted = doc.docReturnSEDateFormatted;
      this.docSendAuthorDate = doc.docSendAuthorDate;
      this.docSendAuthorDateFormatted = doc.docSendAuthorDateFormatted
      this.docReturnAuthorDate = doc.docReturnAuthorDate;
      this.docReturnAuthorDateFormatted = doc.docReturnAuthorDateFormatted
      this.docFinalizeDate = doc.docFinalizeDate;
      this.docFinalizeDateFormatted = doc.docFinalizeDateFormatted
      this.docPaymentDate = doc.docPaymentDate;
      this.docPaymentDateFormatted = doc.docPaymentDateFormatted;
 
      //EDITORS
      this.docEditor = doc.docEditor;
      this.docCoordinator = doc.docCoordinator;
      this.docProofReader = doc.docProofReader;
      this.docSE1 = doc.docSE1;
      this.docSE2 = doc.docSE2;
  
      //YES OR NO FIELDS
      this.docOpenAccess = doc.docOpenAccess; 
      this.docTranslation = doc.docTranslation;
    
      //ONLINE ISSUE
  
      this.docOnlineIssue = doc.docOnlineIssue;
      this.docFirstPageOnline = doc.docFirstPageOnline;
      this.docLastPageOnline = doc.docLastPageOnline;
      this.docNumPagesOnline = doc.docNumPagesOnline;
      this.docOnlineNotes = doc.docOnlineNotes;
  
      //PRINT ISSUE
  
      this.docPrintIssue = doc.docPrintIssue;
      this.docFirstPagePrint = doc.docFirstPagePrint;
      this.docLastPagePrint = doc.docLastPagePrint;
      this.docNumPagesPrint = doc.docNumPagesPrint;
      this.docPrintNotes = doc.docPrintNotes;
      this.docAdConflicts = doc.docAdConflicts;
  
      //NEWS ONLY
      this.docPublishDateCMAJnews = doc.docPublishDateCMAJnews;
      this.docPublishDateCMAJnewsFormatted = doc.docPublishDateCMAJnewsFormatted;
      this.docNewsAuthorType = doc.docNewsAuthorType;
      this.docNewsCommissionDate = doc.docNewsCommissionDate;
      this.docNewsCommissionDateFormatted = doc.docNewsCommissionDateFormatted;
      this.docNewsInvoiceDate = doc.docNewsInvoiceDate;
      this.docNewsInvoiceDateFormatted = doc.docNewsInvoiceDateFormatted;
      this.docNewsInvoiceAmount = doc.docNewsInvoiceAmount;
    },
    err => {
      console.log(err);
      return false;
    });


  }

  onDeleteDocSubmit() {
    this.authService.deleteOneDoc(this.docID).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/search']);
  }

  onEditDocSubmit() {
    this.editDoc = true;
  }

  onEditedDocSubmit() {
    let editedDoc = {
 
      docID: this.docID, //to identify this doc in database
      
      docTitle: this.docTitle,
      docAuthor: this.docAuthor,
      docDOI: this.docDOI,
      docSection: this.docSection,
      docDescription: this.docDescription,
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,    
      docAuthorType: this.docAuthorType,
      docCommissionDate: this.docCommissionDate,
      docInvoiceDate: this.docInvoiceDate,
      docInvoiceAmount: this.docInvoiceAmount,

      //TIMELINE
      docAcceptDate: this.docAcceptDate,
      docPublishDate: this.docPublishDate,
      docETOCDate: this.docETOCDate,
      docEnteredDate: this.docEnteredDate,
      docCopyEditBeginDate: this.docCopyEditBeginDate,
      docCopyEditCompleteDate: this.docCopyEditCompleteDate,
      docSendSEDate: this.docSendSEDate,
      docReturnSEDate: this.docReturnSEDate, 
      docSendAuthorDate: this.docSendAuthorDate,
      docReturnAuthorDate: this.docReturnAuthorDate,
      docFinalizeDate: this.docFinalizeDate, 

      //EDITORS
      docEditor: this.docEditor,
      docCoordinator: this.docCoordinator,
      docProofReader: this.docProofReader,
      docSE1: this.docSE1,
      docSE2: this.docSE2,  

      //YES OR NO FIELDS
      docOpenAccess: this.docOpenAccess,
      docTranslation: this.docTranslation,

      //ONLINE ISSUE

      docOnlineIssue: this.docOnlineIssue,
      docFirstPageOnline: this.docFirstPageOnline,
      docLastPageOnline: this.docLastPageOnline,
      docNumPagesOnline: this.docNumPagesOnline,
      docOnlineNotes: this.docOnlineNotes,

      //PRINT ISSUE

      docPrintIssue: this.docPrintIssue,
      docFirstPagePrint: this.docFirstPagePrint,
      docLastPagePrint: this.docLastPagePrint,
      docNumPagesPrint: this.docNumPagesPrint,
      docPrintNotes: this.docPrintNotes,
      docAdConflicts: this.docAdConflicts,

      //NEWS ONLY

      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNewsAuthorType: this.docNewsAuthorType,
      docNewsCommissionDate: this.docNewsCommissionDate,
      docNewsInvoiceDate: this.docNewsInvoiceDate,
      docNewsInvoiceAmount: this.docNewsInvoiceAmount
    }


    //ADD FORMATTED DATES IF DATES ENTERED
    if(this.docCommissionDate)
      editedDoc['docCommissionDateFormatted'] = this.formatDate(new Date(this.docCommissionDate));
    if(this.docInvoiceDate)
      editedDoc['docInvoiceDateFormatted'] = this.formatDate(new Date(this.docInvoiceDate)); 
    if(this.docAcceptDate)
      editedDoc['docAcceptDateFormatted'] = this.formatDate(new Date(this.docAcceptDate)); 
    if(this.docPublishDate)
      editedDoc['docPublishDateFormatted'] = this.formatDate(new Date(this.docPublishDate)); 
    if(this.docETOCDate)
      editedDoc['docETOCDateFormatted'] = this.formatDate(new Date(this.docETOCDate)); 
    if(this.docPaymentDate)
      editedDoc['docPaymentDateFormatted'] = this.formatDate(new Date(this.docPaymentDate)); 
    if(this.docEnteredDate)
      editedDoc['docEnteredDateFormatted'] = this.formatDate(new Date(this.docEnteredDate)); 
    if(this.docCopyEditBeginDate)
      editedDoc['docCopyEditBeginDateFormatted'] = this.formatDate(new Date(this.docCopyEditBeginDate)); 
    if(this.docCopyEditCompleteDate)
      editedDoc['docCopyEditCompleteDateFormatted'] = this.formatDate(new Date(this.docCopyEditCompleteDate)); 
    if(this.docSendSEDate)
      editedDoc['docSendSEDateFormatted'] = this.formatDate(new Date(this.docSendSEDate)); 
    if(this.docReturnSEDate)
      editedDoc['docReturnSEDateFormatted'] = this.formatDate(new Date(this.docReturnSEDate)); 
    if(this.docSendAuthorDate)
      editedDoc['docSendAuthorDateFormatted'] = this.formatDate(new Date(this.docSendAuthorDate)); 
    if(this.docReturnAuthorDate)
      editedDoc['docReturnAuthorDateFormatted'] = this.formatDate(new Date(this.docReturnAuthorDate)); 
    if(this.docFinalizeDate)
      editedDoc['docFinalizeDateFormatted'] = this.formatDate(new Date(this.docFinalizeDate)); 
    if(this.docPublishDateCMAJnews)
      editedDoc['docPublishDateCMAJnewsFormatted'] = this.formatDate(new Date(this.docPublishDateCMAJnews)); 
    if(this.docNewsCommissionDate)
      editedDoc['docNewsCommissionDateFormatted'] = this.formatDate(new Date(this.docNewsCommissionDate)); 
    if(this.docNewsInvoiceDate)
      editedDoc['docNewsInvoiceDateFormatted'] = this.formatDate(new Date(this.docNewsInvoiceDate)); 


    console.log(editedDoc);

    this.authService.putUpdateDoc(editedDoc).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/search']);
  }

  formatDate(date) {
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return (monthNames[month] + " " + day + ", " + year);
  }



}
