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
	docFullText: {
	  type: String
	},
 
    //LAYOUT

	docNumPages: {
	  type: Number, default: 0
	},
	docNumPagesOnline: {
	  type: Number, default: 0
	},
	docNumPagesPrint: {
	  type: Number, default: 0
	},
	docNumAppendices: {
	  type: Number, default: 0
	},
	docNumAppendicesOnline: {
	  type: Number, default: 0
	},
	docNumAppendicesPrint: {
	  type: Number, default: 0
	},
	docNumFigures: {
	  type: Number, default: 0
	},
	docNumFiguresOnline: {
	  type: Number, default: 0
	},
	docNumFiguresPrint: {
	  type: Number, default: 0
	},
	docNumBoxes: {
	  type: Number, default: 0
	},
	docNumBoxesOnline: {
	  type: Number, default: 0
	},
	docNumBoxesPrint: {
	  type: Number, default: 0
	},
	docNumTables: {
	  type: Number, default: 0
	},
	docNumTablesOnline: {
	  type: Number, default: 0
	},
	docNumTablesPrint: {
	  type: Number, default: 0
	},
	docLayoutOnly: {
	  type: Boolean
	},
	docETOCOnly: {
	  type: Boolean
	},
	docKeyWords: {
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
	  type: Number, default: 0
	},
	docLastPageOnline: {
	  type: Number, default: 0
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
	  type: Number, default: 0
	},
	docLastPagePrint: {
	  type: Number, default: 0
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
	},
    docAcceptDateFormatted: {
      type: String
    },
    docPaymentDateFormatted: {
      type: String
    },
    docETOCDateFormatted: { 
      type: String
    },
    docOnlineIssueFormatted: {
      type: String
    },
    docPrintIssueFormatted: {
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
    docSendFineTuneDateFormatted: {
      type: String
    },
    docReturnFineTuneDateFormatted: {
      type: String
    },
    docSendProofReadDateFormatted: {
      type: String
    },
    docReturnProofReadDateFormatted: {
      type: String
    },
    docFinalizeDateFormatted: {
      type: String
    },

    docNewsReadyFormatted: {
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
    },

});

let Doc = module.exports = mongoose.model('Doc', DocSchema)

module.exports.getDocByDOI = function(DOI, callback) {
  const query = {
    docDOI: DOI
  }
  Doc.findOne(query, callback);
}





