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


	//DOCUMENT DETAILS

	docFlagPrint: {
	  type: Boolean
	},
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
	  type: Number
	},
	docNumAppendices: {
	  type: Number
	},
	docNumFigures: {
	  type: Number
	},
	docNumBoxes: {
	  type: Number
	},
	docNumTables: {
	  type: Number
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
	docWebImageURL: {
	  type: String
	},
	docWebImageCredit: {
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
	code1Code: {
	  type: Number
	},
	docCollectionCode2: {
	  type: String
	},
	code2Code: {
	  type: Number
	},
	docCollectionCode3: {
	  type: String
	},
	code3Code: {
	  type: Number
	},
	docCollectionCode4: {
	  type: String
	},
	code4Code: {
	  type: Number
	},
	docCollectionCode5: {
	  type: String
	},
	code5Code: {
	  type: Number
	},
	docCollectionCode6: {
	  type: String
	},
	code6Code: {
	  type: Number
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
	docStatus: {
	  type: String
	},

	//NOTES

	docNotes: {
	  type: String
	},
    docOnlineNotes: {
      type: String	
	},
    docPrintNotes: {
      type: String	
	},

    //ONLINE ISSUE


	docFirstPageOnline: {
	  type: Number
	},
	docLastPageOnline: {
	  type: Number
	},
	docOnlinePosition: {
	  type: Number
	},
	docOnlineVolume: {
	  type: Number
	},
	docOnlineIssueNumber: {
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
	docPrintPosition: {
	  type: Number
	},

	//PRINT ADS

    docAdClient: {
      type: String	
	},
    docAdDescription: {
      type: String	
	},
	docAdSize: {
	  type: Number
	},
	docAdFirstPagePrint: {
	  type: Number
	},
	docAdLastPagePrint: {
	  type: Number
	},
	
    //NEWS ONLY

    docNewsReady: { 
	  type: Date
	},
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

let Doc = module.exports = mongoose.model('Doc', DocSchema)

module.exports.getDocByDOI = function(DOI, callback) {
  const query = {
    docDOI: DOI
  }
  Doc.findOne(query, callback);
}





