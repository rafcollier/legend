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

  sections: [String]; 
  onlineIssues: [String]; 
  printIssues: [String]; 
  collectionCodes: [String]; 

  //Same as in Enter Document Component
  docSection: String;
  docTitle: String;
  docAuthor: String;
  docDescription: String;
  docOnlineIssue: String;
  docPrintIssue: String;
  docCollectionCode1: String;
  docCollectionCode2: String;
  docCollectionCode3: String;
  docCollectionCode4: String;
  docPublishDateCMAJnews: Date;
  docNumPagesOnline: Number;
  docNumPagesPrint: Number;
  docOnlineNotes: String;
  docPrintNotes: String;
  docAdConflicts: String;
  docNewsCommissionDate: Date;
  docNewsInvoiceDate: Date;
  docNewsInvoiceAmount: Number;
  docDOI: Number;

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

    this.route.params.subscribe(params => {
      console.log(params);
      this.detailsID = params['doc'];
      }
    );

    this.authService.getOneDoc(this.detailsID).subscribe(doc => {
      this.oneDoc = doc; 
      this.docUsername = doc.docUsername;
      this.docID = doc._id;
  
      //Below same as in Enter Document Component
      this.docSection = doc.docSection;
      this.docTitle = doc.docTitle;
      this.docAuthor = doc.docAuthor;
      this.docDescription = doc.docDescription;
      this.docOnlineIssue = doc.docOnlineIssue;
      this.docPrintIssue = doc.docPrintIssue;
      this.docCollectionCode1 = doc.docCollectionCode1;
      this.docCollectionCode2 = doc.docCollectionCode2;
      this.docCollectionCode3 = doc.docCollectionCode3;
      this.docCollectionCode4 = doc.docCollectionCode4;
      this.docPublishDateCMAJnews = doc.docPublishDateCMAJnews;
      this.docNumPagesOnline = doc.docNumPagesOnline;
      this.docNumPagesPrint = doc.docNumPagesPrint ;
      this.docOnlineNotes = doc.docOnlineNotes;
      this.docPrintNotes = doc.docPrintNotes;
      this.docAdConflicts = doc.docAdConflicts;
      this.docNewsCommissionDate = doc.docNewsCommissionDate;
      this.docNewsInvoiceDate = doc.docNewsInvoiceDate;
      this.docNewsInvoiceAmount = doc.docNewsInvoiceAmount;
      this.docDOI = doc.docDOI;

      if(this.docSection == "News") {
        this.showNews = true;
      }
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
      
      docSection: this.docSection,
      docTitle: this.docTitle, 
      docAuthor: this.docAuthor, 
      docDescription: this.docDescription, 
      docOnlineIssue: this.docOnlineIssue,
      docPrintIssue: this.docPrintIssue,
      docCollectionCode1: this.docCollectionCode1,
      docCollectionCode2: this.docCollectionCode2,
      docCollectionCode3: this.docCollectionCode3,
      docCollectionCode4: this.docCollectionCode4,
      docPublishDateCMAJnews: this.docPublishDateCMAJnews,
      docNumPagesOnline: this.docNumPagesOnline,
      docNumPagesPrint: this.docNumPagesPrint,
      docOnlineNotes: this.docOnlineNotes,
      docPrintNotes: this.docPrintNotes,
      docAdConflicts: this.docAdConflicts,
      docDOI: this.docDOI,
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
