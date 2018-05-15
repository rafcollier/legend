let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database'); 

let DocSchema = new Schema({

    //GENERAL FIELDS	

	dateEntered: {
	  type: Date, default: Date.now
	},
	docUsername: {
	  type: String
	},


	docTitle: {
	  type: String
	},
	docAuthor: {
	  type: String
	},
	docDOI: {
	  type: Number
	},
	docSection: {
	  type: String
	},
	docDescription: {
	  type: String
	},
	docCollectionCode1: {
	  type: String
	},
	docCollectionCode2: {
	  type: String
	},
	docCollectionCode3: {
	  type: String
	},
	docCollectionCode4: {
	  type: String
	},
	docAuthorType: { 
	  type: String
	},
	docCommissionDate: {
	  type: Date
	},
	docInvoiceDate: {
	  type: Date
	},
	docInvoiceAmount: {
	  type: Number
	},

    //TIMELINE

	docAcceptDate: {
	  type: Date
	},
	docPublishDate: {
	  type: Date
	},
	docEnteredDate: {
	  type: Date
	},
	docCopyEditBeginDate: {
	  type: Date
	},
	docCopyEditCompleteDate: {
	  type: Date
	},
	docSendSEDate: {
	  type: Date
	},
	docReturnSEDate: {
	  type: Date
	},
	docSendAuthorDate: {
	  type: Date
	},
	docReturnAuthorDate: {
	  type: Date
	},
	docFinalizeDate: {
	  type: Date
	},

	//EDITORS
	docEditor: {
      type: String
	},
	docCoordinator: {
      type: String
	},
	docProofReader: {
      type: String
	},
	docSE1: {
	  type: String
	},
	docSE2: {
	  type: String
	},

	//YES OR NO FIELDS
	docOpenAccess: {
	  type: Boolean
	},
	docTranslation: {
	  type: Boolean
	},
	
    //ONLINE ISSUE

	docOnlineIssue: {
	  type: String
	},
	docFirstPageOnline: {
	  type: Number
	},
	docLastPageOnline: {
	  type: Number
	},
	docNumPagesOnline: {
	  type: Number
	},
	docOnlineNotes: {
      type: String	
	},

    //PRINT ISSUE

   	docPrintIssue: {
	  type: String
	},
	docFirstPagePrint: {
	  type: Number
	},
	docLastPagePrint: {
	  type: Number
	},
	docNumPagesPrint: {
	  type: Number
	},
    docPrintNotes: {
      type: String	
	},
	docAdConflicts: {
      type: String	
	},

    //NEWS ONLY

	docPublishDateCMAJnews: { 
	  type: Date
	},
    docNewsAuthorType: { //freelance or staff
	  type: String
	},
	docNewsCommissionDate: {
	  type: Date
	},
	docNewsInvoiceDate: {
      type: Date
	},
	docNewsInvoiceAmount: {
	  type: Number	
	},
    //FORMATTED DATES
	docCommissionDateFormatted: {
	  type: String
	},
    docInvoiceDateFormatted: {
	  type: String
	},
    docAcceptDateFormatted: { 
	  type: String
	},
    docPublishDateFormatted: { 
	  type: String
	},
    docEnteredDateFormatted: { 
	  type: String
	},
    docCopyEditBeginDateFormatted: { 
	  type: String
	},
    docCopyEditCompleteDateFormatted: { 
	  type: String
	},
    docSendSEDateFormatted: { 
	  type: String
	},
    docReturnSEDateFormatted: { 
	  type: String
	},
    docSendAuthorDateFormatted: { 
	  type: String
	},
    docReturnAuthorDateFormatted: { 
	  type: String
	},
    docFinalizeDateFormatted: { 
	  type: String
	},
    docPublishDateCMAJnewsFormatted: { 
	  type: String
	},
    docNewsCommissionDateFormatted: { 
	  type: String
	},
    docNewsInvoiceDateFormatted: { 
	  type: String
	}
});

let Doc = mongoose.model('Doc', DocSchema)
module.exports = Doc;
