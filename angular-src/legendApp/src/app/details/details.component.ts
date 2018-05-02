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
  docCommissionDate: String;
  docInvoiceDate: Date;
  docInvoiceAmount: Number;

  //TIMELINE

  docAcceptDate: Date;
  docPublishDate: Date;
  docEnteredDate: Date;
  docCopyEditBeginDate: Date;
  docCopyEditCompleteDate: Date;
  docSendSEDate: Date;
  docReturnSEDate: Date;
  docSendAuthorDate: Date;
  docReturnAuthorDate: Date;
  docFinalizeDate: Date;

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
    this.docInvoiceDate = doc.docInvoiceDate;
    this.docInvoiceAmount = doc.docInvoiceAmount;

    //TIMELINE

    this.docAcceptDate = doc.docAcceptDate;
    this.docPublishDate = doc.docPublishDate;
    this.docEnteredDate = doc.docEnteredDate;
    this.docCopyEditBeginDate = doc.docCopyEditBeginDate;
    this.docCopyEditCompleteDate = doc.docCopyEditCompleteDate;
    this.docSendSEDate = doc.docSendSEDate;
    this.docReturnSEDate = doc.docReturnSEDate;
    this.docSendAuthorDate = doc.docSendAuthorDate;
    this.docReturnAuthorDate = doc.docReturnAuthorDate;
    this.docFinalizeDate = doc.docFinalizeDate;

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
    this.docNewsAuthorType = doc.docNewsAuthorType;
    this.docNewsCommissionDate = doc.docNewsCommissionDate;
    this.docNewsInvoiceDate = doc.docNewsInvoiceDate;
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
    this.router.navigate(['/recent']);
  }

  onEditDocSubmit() {
    this.editDoc = true;
  }

  onEditedDocSubmit() {
    const editedDoc = {
 
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
    console.log(editedDoc);

    this.authService.putUpdateDoc(editedDoc).subscribe(doc => {
    },
    err => {
      console.log(err);
      return false;
    });
    this.router.navigate(['/recent']);
  }

}
