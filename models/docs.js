let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const config = require('../config/database'); 

let DocSchema = new Schema({

    //GENERAL FIELDS	

	dateEntered: {
	  type: Date, default: Date.now
	},
	docUsername: { //user who entered document
	  type: String
	},
	docDOI: {
	  type: Number
	  //type: String
	},
	docSection: {
	  type: String
	},
	docDepartment: {
	  type: String
	},
	docAuthor: {
	  type: String
	},
	docTitle: {
	  type: String
	},
	docFocusArea: {
	  type: String
	},
	docNotes: {
	  type: String
	},

	//DOCUMENT DETAILS

	docOpenAccess: {
	  type: Boolean
	},
	docTranslation: {
	  type: Boolean
	},
	docPressRelease: {
	  type: Boolean
	},
	docProfessionalDev: {
	  type: Boolean
	},
	docNumPages: {
	  //type: Number
	  type: String
	},
	docNumAppendices: {
	  //type: Number
	  type: String
	},
    docRelatedMaterial: {
	  type: String
	},
	docOutStandingMaterial: {
	  type: String
	},
	docInvoiceNum: {
	  type: String
	},
	docShortTitle: {
	  type: String
	},
	docWebBlurb: {
	  type: String
	},

	//MULTIMEDIA

	docMultiMedia1: {
	  type: String
	},
	docMultiMedia2: {
	  type: String
	},
	docMultiMedia3: {
	  type: String
	},
	docPodcastEmbargoLink: {
	  type: String
	},
	docPodcastPermLink: {
	  type: String
	},
	docPodcastEmbedCode: {
	  type: String
	},
	docVideoEmbedCode: {
	  type: String
	},
	docVideoEmbedCode: {
	  type: String
	},
	docVideoLink: {
	  type: String
	},

    //SOCIAL MEDIA

	docURL: {
	  type: String
	},
	docHashTags: {
	  type: String
	},
	docSocialSummary: {
	  type: String
	},
    
	// COLLECTION CODES

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
	docCollectionCode5: {
	  type: String
	},
	docCollectionCode6: {
	  type: String
	},

    //DOCUMENT TIMELINE

	docAcceptDate: {
	  type: Date
	},
    docPaymentDate: {
	  type: Date
	},
	docETOCDate: {
	  type: Date
	},
	docOnlineIssue: {
	  type: Date
	},
  	docPrintIssue: {
	  type: Date
	},

	//EDITING TIMELINE

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
	docSendFineTune: {
	  type: Date
	},
	docReturnFineTune: {
	  type: Date
	},
	docSendProofRead: {
	  type: Date
	},
	docReturnProofRead: {
	  type: Date
	},
	docFinalizeDate: {
	  type: Date
	},

    //ONLINE ISSUE

    docOnlineNotes: {
      type: String	
	},
	docFirstPageOnline: {
	  type: Number
	},
	docLastPageOnline: {
	  type: Number
	},

    //PRINT ISSUE

    docAdConflicts: {
      type: String	
	},
	docFirstPagePrint: {
	  type: Number
	},
	docLastPagePrint: {
	  type: Number
	},
	
    //NEWS ONLY

	docPublishDateCMAJnews: { 
	  type: Date
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
