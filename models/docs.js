let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database'); 

let DocSchema = new Schema({
	
	dateEntered: {
	  type: Date
	},
	docUsername: {
	  type: String
	},
	docSection: {
	  type: String
	},
	docTitle: {
	  type: String
	},
	docDescription: {
	  type: String
	},
	docAuthor: {
	  type: String
	},
	docOnlineIssue: {
	  type: String
	},
	docPrintIssue: {
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
	docDOI: {
		type: Number
	},
	docAuthorType: { //freelance or staff
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
	docPublishDateCMAJnews: { //published on WordPress Site
	  type: Date
	},
	docNumPagesOnline: {
	  type: Number
	},
	docOnlineNotes: {
      type: String	
	},
	docPrintNotes: {
      type: String	
	},
	docAdConflicts: {
      type: String	
	},
	docPrintIssue: {
	  type: String
	},
	docNumPagesPrint: {
	  type: Number
	},
	docDOI: {
	  type: Number
	},
	docNewsCommissionDate: {
	  type: Date
	},
	docNewsInvoiceDate: {
      type: Date
	},
	docNewsInvoiceAmount: {
	  type: Number	
	}
});

let Doc = mongoose.model('Doc', DocSchema)
module.exports = Doc;
