const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Doc = require('../models/docs');
const moment = require('moment');

let Converter = require("csvtojson").Converter;
let converter = new Converter({});
let jsonData =  {}; 


router.post('/submitdoc', (req, res, next) => {

  let newDoc = new Doc({

    //GENERAL FIELDS 
    
    docUsername: req.body.docUsername,
    docDOI: req.body.docDOI,
    docSection: req.body.docSection,
    docDepartment: req.body.docDepartment,
    docAuthor: req.body.docAuthor,
    docTitle: req.body.docTitle,
    docFocusArea: req.body.docFocusArea,

    //DOCUMENT DETAILS

    docFlagPrint: req.body.docFlagPrint,
    docOpenAccess: req.body.docOpenAccess,
    docTranslation: req.body.docTranslation,
    docPressRelease: req.body.docPressRelease,
    docProfessionalDev: req.body.docProfessionalDev,
    docRelatedMaterial: req.body.docRelatedMaterial,
    docOutStandingMaterial: req.body.docOutStandingMaterial,
    docInvoiceNum: req.body.docInvoiceNum,
    docShortTitle: req.body.docShortTitle,
    docWebBlurb: req.body.docWebBlurb,
    docWebImageURL: req.body.docWebImageURL,
    docWebImageCredit: req.body.docWebImageCredit,
    docFullText: req.body.docFullText,

    //LAYOUT

    docNumPages: req.body.docNumPages,
    docNumPagesOnline: req.body.docNumPagesOnline,
    docNumPagesPrint: req.body.docNumPagesPrint,
    docNumFigures: req.body.docNumFigures,
    docNumFiguresOnline: req.body.docNumFiguresOnline,
    docNumFiguresPrint: req.body.docNumFiguresPrint,
    docNumBoxes: req.body.docNumBoxes,
    docNumBoxesOnline: req.body.docNumBoxesOnline,
    docNumBoxesPrint: req.body.docNumBoxesPrint,
    docNumTables: req.body.docNumTables,
    docNumTablesOnline: req.body.docNumTablesOnline,
    docNumTablesPrint: req.body.docNumTablesPrint,
    docNumAppendices: req.body.docNumAppendices,
    docNumAppendicesOnline: req.body.docNumAppendicesOnline,
    docNumAppendicesPrint: req.body.docNumAppendicesPrint,
    docLayoutOnly: req.body.docLayoutOnly,
    docETOCOnly: req.body.docETOCOnly,
    docKeyWords: req.body.docKeyWords,


    //MULTIMEDIA

    docMultiMedia1: req.body.docMultiMedia1,
    docMultiMedia2: req.body.docMultiMedia2,
    docMultiMedia3: req.body.docMultiMedia3,
    docPodcastEmbargoLink: req.body.docPodcastEmbargoLink,
    docPodcastPermLink: req.body.docPodcastPermLink,
    docPodcastEmbedCode: req.body.docPodcastEmbedCode,
    docVideoEmbedCode: req.body.docVideoEmbedCode,
    docVideoLink: req.body.docVideoLink,

    //SOCIAL MEDIA
    
    docURL: req.body.docURL,
    docHashTags: req.body.docHashTags,
    docSocialSummary: req.body.docSocialSummary,

    //COLLECTION CODES

    docCollectionCode1: req.body.docCollectionCode1,
    docCollectionCode2: req.body.docCollectionCode2,
    docCollectionCode3: req.body.docCollectionCode3,
    docCollectionCode4: req.body.docCollectionCode4,    
    docCollectionCode5: req.body.docCollectionCode5,    
    docCollectionCode6: req.body.docCollectionCode6,    
    code1Code: req.body.code1Code,
    code2Code: req.body.code2Code,
    code3Code: req.body.code3Code,
    code4Code: req.body.code4Code,
    code5Code: req.body.code5Code,
    code6Code: req.body.code6Code,

    //DOCUMENT TIMELINE

    docAcceptDate: req.body.docAcceptDate,
    docPaymentDate: req.body.docPaymentDate, 
    docETOCDate: req.body.docETOCDate,
    docOnlineIssue: req.body.docOnlineIssue,
    docPrintIssue: req.body.docPrintIssue,

    //EDITING TIMELINE

    docEditor: req.body.docEditor,
    docCoordinator: req.body.docCoordinator,
    docProofReader: req.body.docProofReader,
    docSE1: req.body.docSE1,
    docSE2: req.body.docSE2,  
    docEnteredDate: req.body.docEnteredDate,
    docCopyEditBeginDate: req.body.docCopyEditBeginDate,
    docCopyEditCompleteDate: req.body.docCopyEditCompleteDate,
    docSendSEDate: req.body.docSendSEDate,
    docReturnSEDate: req.body.docReturnSEDate, 
    docSendAuthorDate: req.body.docSendAuthorDate,
    docReturnAuthorDate: req.body.docReturnAuthorDate,
    docSendFineTune: req.body.docSendFineTune,
    docReturnFineTune: req.body.docReturnFineTune,
    docSendProofRead: req.body.docSendProofRead,
    docReturnProofRead: req.body.docReturnProofRead,
    docFinalizeDate: req.body.docFinalizeDate, 
    docStatus: req.body.docStatus,

    //NOTES
    docOnlineNotes: req.body.docOnlineNotes,
    docPrintNotes: req.body.docPrintNotes,
    docNotes: req.body.docNotes,

    //ONLINE ISSUE

    docFirstPageOnline: req.body.docFirstPageOnline,
    docLastPageOnline: req.body.docLastPageOnline,
    docOnlinePosition: req.body.docOnlinePosition,
    docOnlineVolume: req.body.docOnlineVolume,
    docOnlineIssueNumber: req.body.docOnlineIssueNumber,

    //PRINT ISSUE

    docAdConflicts: req.body.docAdConflicts,
    docFirstPagePrint: req.body.docFirstPagePrint,
    docLastPagePrint: req.body.docLastPagePrint,
    docPrintPosition: req.body.docPrintPosition,

  //PRINT ADS
    docAdClient: req.body.docAdClient, 
    docAdDescription: req.body.docAdDescription, 
    docAdSize: req.body.docAdSize, 
    docAdFirstPagePrint: req.body.docAdFirstPagePrint, 
    docAdLastPagePrint: req.body.docAdLastPagePrint, 

    //NEWS ONLY

    docNewsReady: req.body.docNewsReady,
    docPublishDateCMAJnews: req.body.docPublishDateCMAJnews,
    docNewsCommissionDate: req.body.docNewsCommissionDate,
    docNewsInvoiceDate: req.body.docNewsInvoiceDate,
    docNewsInvoiceAmount: req.body.docNewsInvoiceAmount,

    //FORMATTED DATES

    docAcceptDateFormatted: req.body.docAcceptDateFormatted,
    docPaymentDateFormatted: req.body.docPaymentDateFormatted,
    docETOCDateFormatted: req.body.docETOCDateFormatted,
    docOnlineIssueFormatted: req.body.docOnlineIssueFormatted,
    docPrintIssueFormatted: req.body.docPrintIssueFormatted,

    docEnteredDateFormatted: req.body.docEnteredDateFormatted,
    docCopyEditBeginDateFormatted: req.body.docCopyEditBeginDateFormatted,
    docCopyEditCompleteDateFormatted: req.body.docCopyEditCompleteDateFormatted,
    docSendSEDateFormatted: req.body.docSendSEDateFormatted,
    docReturnSEDateFormatted: req.body.docReturnSEDateFormatted,
    docSendAuthorDateFormatted: req.body.docSendAuthorDateFormatted,
    docReturnAuthorDateFormatted: req.body.docReturnAuthorDateFormatted,
    docSendFineTuneDateFormatted: req.body.docSendFineTuneDateFormatted,
    docReturnFineTuneDateFormatted: req.body.docReturnFineTuneDateFormatted,
    docSendProofReadDateFormatted: req.body.docSendProofReadDateFormatted,
    docReturnProofReadDateFormatted: req.body.docReturnProofReadDateFormatted,
    docFinalizeDateFormatted: req.body.docFinalizeDateFormatted,
    docNewsReadyFormatted: req.body.docNewsReadyFormatted,
    docPublishDateCMAJnewsFormatted: req.body.docPublishDateCMAJnewsFormatted,
    docNewsCommissionDateFormatted: req.body.docNewsCommissionDateFormatted,
    docNewsInvoiceDateFormatted: req.body.docNewsInvoiceDateFormatted

  });

  console.log(newDoc);

  //Check for duplicate DOI if there is a DOI -- Dans le CMAJ and Print Ads don't have DOIs
  //if(req.body.docDOI != (null || undefined || "" || 0)) {

  if(req.body.docDOI) {
    Doc.getDocByDOI(newDoc.docDOI, (err, doi) => {
      if(err) throw err;
      if(doi) {
        return res.json({success: false, msg: 'A document with this DOI already exists.'});
      }
      newDoc.save((err) => {
        if(err) {
          console.log(err);
          throw err;
        }
        res.json({success: true, msg: 'Document added'});
      });
    });
  }
  else {
    newDoc.save((err) => {
      if(err) {
        console.log(err);
        throw err;
      }
      res.json({success: true, msg: 'Document added'});
    });
  }
  
});

router.get('/getRecentAdded', (req, res, next) => {
  const limit = req.query.limit;

  //Don't diplay non-editorial sections
  let query1 = {'docLayoutOnly' : {$exists : false}};
  let query2 = {'docLayoutOnly' : null};
  let query3 = {'docLayoutOnly' : false};
  
  //Doc.find({'docUsername' : req.query.docUsername}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
  Doc.find({$or: [query1, query2, query3]}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.get('/getOneDoc', (req, res, next) => {
  Doc.findById(req.query.docID, (err, doc) => { 
    if (err) throw err;
    res.json(doc);
  });
});

router.get('/getNewsDOI', (req, res, next) => {
  console.log("in roure");
  //Doc.find({'docUsername' : req.query.docUsername}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
  Doc.find({docSection: 'News'}, {docDOI: 1}, {limit: 1, sort: {docDOI: -1}}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.delete('/deleteOneDoc', (req, res, next) => {
  console.log
  let query1 = {'_id' : req.query.docID};
  Doc.deleteOne(query1, (err, doc) => { 
    if (err) {
      res.json({success: false, msg: 'Failed to delete document.'});
      throw err;
    }
    else {
     res.json({success: true, msg: 'Document deleted.'}); 
    }
  });
});

//For testing. Delete all the non-editorial pages in the print issue
router.delete('/deleteManyDoc', (req, res, next) => {
  let query1 = {'docSection' : {$regex: 'Print Ad', $options: 'i'}};
  let query2 = {'docSection' : {$regex: 'Filler', $options: 'i'}};
  let query3 = {'docSection' : {$regex: 'Classified', $options: 'i'}};
  let query4 = {'docSection' : {$regex: 'Masthead', $options: 'i'}};
  let query5 = {'docSection' : {$regex: 'Dans le CMAJ', $options: 'i'}};
  let query6 = {'docSection' : {$regex: 'CMAJ Open', $options: 'i'}};
  let query7 = {'docSection' : {$regex: 'Contents', $options: 'i'}};
  let query8 = {'docSection' : {$regex: 'Cover', $options: 'i'}};
  let query9 = {'docSection' : {$regex: 'Cover blurb', $options: 'i'}};
  let query10 = {'docPrintIssue' : req.query.printIssue};
  Doc.deleteMany( {$and: [query10, {$or:[query1, query2, query3, query4, 
                       query5, query6, query7, query8,
                       query9]} ]}, (err, doc) => { 
    if (err) {
      res.json({success: false, msg: 'Failed to delete document.'});
      throw err;
    }
    else {
     res.json({success: true, msg: 'Document deleted.'}); 
    }
  });
});

//For testing. Delete all the non-editorial pages in the print issue
router.delete('/deleteManyETOC', (req, res, next) => {
  let query1 = {'docSection' : {$regex: '10 Health Stories That Mattered This Week', $options: 'i'}};
  let query2 = {'docSection' : {$regex: 'CMAJ Blogs', $options: 'i'}};
  let query3 = {'docSection' : {$regex: 'CMAJ Open', $options: 'i'}};
  let query4 = {'docSection' : {$regex: 'Canadian Journal of Surgery', $options: 'i'}};
  let query5 = {'docSection' : {$regex: 'ETOC Bottom Ad', $options: 'i'}};
  let query6 = {'docSection' : {$regex: 'ETOC Middle Ad', $options: 'i'}};
  let query7 = {'docSection' : {$regex: 'ETOC Top Ad', $options: 'i'}};
  let query8 = {'docSection' : {$regex: 'From the Archives', $options: 'i'}};
  let query9 = {'docSection' : {$regex: 'Journal of Psychiatry and Neuroscience', $options: 'i'}};
  let query10 = {'docSection' : {$regex: 'Memoriam', $options: 'i'}};
  let query11 = {'docSection' : {$regex: 'Sante Inc', $options: 'i'}};
  let query12 = {'docETOCDateFormatted' : req.query.ETOCDate};
  console.log(query12);

  Doc.deleteMany( {$and: [query12, {$or:[query1, query2, query3, query4, 
                       query5, query6, query7, query8,
                       query9, query10, query11]} ]}, (err, doc) => { 
    if (err) {
      res.json({success: false, msg: 'Failed to delete document.'});
      throw err;
    }
    else {
     res.json({success: true, msg: 'Document deleted.'}); 
    }
  });
});

router.put('/updateDoc', (req, res, next) => {
  const query = {_id:req.body.docID};
  const updatedDoc = req.body;

  //Check if document has a DOI and check it against other documents for duplicate DOI if the DOI was changed
  if(updatedDoc.docDOI) {
    console.log(updatedDoc.docDOI);
    //First check if DOI was changed before comparing against other DOIs
    Doc.findById(req.body.docID, (err, doc) => { 
      if (err) throw err;
      else {
        console.log(updatedDoc.docDOI);
        console.log(doc.docDOI);

        if(doc.docDOI != updatedDoc.docDOI) {
          //DOI was updates so check for a duplicate DOI before allowing the change
          Doc.getDocByDOI(updatedDoc.docDOI, (err, doi) => {
            if(err) throw err;
            if(doi) {
              return res.json({success: false, msg: 'A document with this DOI already exists.'});
            }
            //Allow the update with changed DOI
            Doc.update({'_id' : req.body.docID}, req.body, (err) => {
              if(err) throw err;
              res.json({success: true, msg: 'Document updated'});
            });
          });
        } 
        //DOI of edited doc didn't change so update the document
        else {
          Doc.update({'_id' : req.body.docID}, req.body, (err) => {
            if(err) throw err;
            res.json({success: true, msg: 'Document updated'});
          });
        }
      }
    });
  }
  //If no DOI (non-editorial) then just update the document
  else {
    Doc.update({'_id' : req.body.docID}, req.body, (err) => {
    if(err) throw err;
      res.json({success: true, msg: 'Document updated'});
    });
  }
});

router.get('/getSearchResults', (req, res, next) => {

  let query1 = {};
  let query2 = {};
  let query2A = {};
  let query2B = {};
  let query2C = {};
  let query2D = {};
  let query2E = {};
  let query3 = {};
  let query4 = {};
  let query5 = {};
  let query6 = {};
  let query7A = {};
  let query7B = {};
  let query7 = {};
  let query8 = {};
  let query8A = {};
  let query8B = {};
  let query9 = {};
  let query10 = {};
  let query11 = {};
  let query12 = {};
  let query12A = {};
  let query12B = {};
  let query12C = {};
  let query13 = {};
  let query14 = {};
  let query15 = {};
  let query15A = {};
  let query15B = {};

  if(req.query.status)
    query1 = {'docStatus' : req.query.status};

  if(req.query.editor) { 
    query2A = {'docEditor' : req.query.editor};
    query2B = {'docCoordinator' : req.query.editor};
    query2C = {'docProofReader' : req.query.editor};
    query2D = {'docSE1' : req.query.editor};
    query2E = {'docSE2' : req.query.editor};
    query2 = {$or: [query2A, query2B, query2C, query2D, query2E]};
  }

  if(req.query.docSection) 
    query3 = {'docSection' : req.query.docSection};

  if(req.query.docAuthor) 
    query4 = {'docAuthor' : {$regex: req.query.docAuthor, $options: 'i'}};

  if(req.query.docDOI) 
    query5 = {'docDOI' : req.query.docDOI};

  if(req.query.docTitle) 
    query6 = {'docTitle' : {$regex: req.query.docTitle, $options: 'i'}};

  if(req.query.docNotUsedOnline) {  
    query7A = {'docOnlineIssue' : {$exists : false}};
    query7B = {'docOnlineIssue' : null};
    query7 = {$or: [query7A, query7B]};
  }

  if(req.query.docNotUsedPrint) { 
    query8A = {'docPrintIssue' : {$exists : false}};
    query8B = {'docPrintIssue' : null};
    query8 = {$or: [query8A, query8B]};
  }

  if(req.query.afterAcceptDate)
    query9 = {'docAcceptDate': {$gte: new Date(req.query.afterAcceptDate)}};

  if(req.query.beforeAcceptDate)
    query10 = {'docAcceptDate': {$lte: new Date(req.query.beforeAcceptDate)}};

  if(req.query.docFlagPrint) { 
    query11 = {'docFlagPrint' : true};
  }

  //Don't diplay non-editorial sections
  if(req.query.docEditorialOnly) { 
    query12A = {'docLayoutOnly' : {$exists : false}};
    query12B = {'docLayoutOnly' : null};
    query12C = {'docLayoutOnly' : false};
    query12 = {$or: [query12A, query12B, query12C]};
  }

  if(req.query.afterOnline)
    query13 = {'docOnlineIssue': {$gte: new Date(req.query.afterOnline)}};

  if(req.query.beforeOnline)
    query14 = {'docOnlineIssue': {$lte: new Date(req.query.beforeOnline)}};
 
  console.log(req.query.docNotFinal);
  if(req.query.docNotFinal) {
   // query15A = {'docStatus': {$ne: {$regex: '8 - Final', $options: 'i'}}};
   // query15B = {'docStatus': {$ne: {$regex: 'F - News Posted', $options: 'i'}}};
    query15A = {'docStatus': {$ne: '8 - Final'}};
    query15B = {'docStatus': {$ne: 'F - News Posted'}};
    query15 = {$and: [query15A, query15B]};
  }

  Doc.find({$and: [query1, query2, query3, query4, 
                   query5, query6, query7, query8, 
                   query9, query10, query11, query12,
                   query13, query14, query15

                  ]}, 
           null, 
           {sort: {docStatus: 1}
           }, 
    (err, docs) => {
      if (err) throw err;
      else {
        res.json(docs);
      }
    });
  });

router.get('/getNumDocs', (req, res, next) => {
  console.log("in get Num Docs");
  let query1 = {};
  let query2 = {};
  if(req.query.docSection) 
    query1 = {docSection : req.query.docSection};
  if(req.query.docFirstDateNumDocs && req.query.docSecondDateNumDocs) { 
    query2 = {docPublishDate: {$gte: new Date(req.query.docFirstDateNumDocs),
                               $lte: new Date(req.query.docSecondDateNumDocs)
                              }
              }
  }
  console.log(query1, query2);
  
  Doc.find({$and: [query1, query2]}, 
           null, 
           {sort: {docSection: 1}}, 
           (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.get('/getTimeDiff', (req, res, next) => {
  console.log("in get Time Diff");
  let query1 = {};
  let query2 = {};
  if(req.query.docSection) 
    query1 = {docSection : req.query.docSection};
  if(req.query.docFirstDateTimeDifference && req.query.docSecondDateTimeDifference) { 
    query2 = {docPublishDate: {$gte: new Date(req.query.docFirstDateTimeDifference),
                               $lte: new Date(req.query.docSecondDateTimeDifference)
                              }
              }
  }
  console.log(query1, query2);

  Doc.find({$and: [query1, query2]}, 
           {docTitle: 1, docAuthor: 1, docSection: 1, docDOI: 1, docAcceptDate: 1, docPublishDate: 1, docPaymentDate: 1}, 
           (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

//Get search results for a print issue and sort by position by default, but sort by first page as entered

router.get('/getLayoutSearchResults', (req, res, next) => {
  let query1 = {};
  if(req.query.docPrintIssue) 
    query1 = {docPrintIssueFormatted : req.query.docPrintIssue};
  console.log(query1);
  Doc.aggregate([
  {
    $project:
    {
      //GENERAL FIELDS 
      'docUsername': 1,
      'docDOI': 1,
      'docSection': 1,
      'docDepartment': 1,
      'docAuthor': 1,
      'docTitle': 1,
      'docFocusArea': 1,
      //DOCUMENT DETAILS
      'docFlagPrint': 1,
      'docOpenAccess': 1,
      'docTranslation': 1,
      'docPressRelease': 1,
      'docProfessionalDev': 1,
      'docRelatedMaterial': 1,
      'docOutStandingMaterial': 1,
      'docInvoiceNum': 1,
      'docShortTitle': 1,
      'docWebBlurb': 1,
      'docWebImageURL': 1,
      'docWebImageCredit': 1,
      //LAYOUT
      'docNumPages': 1,
      'docNumPagesOnline': 1,
      'docNumPagesPrint': 1,
      'docNumFigures': 1,
      'docNumFiguresOnline': 1,
      'docNumFiguresPrint': 1,
      'docNumBoxes': 1,
      'docNumBoxesOnline': 1,
      'docNumBoxesPrint': 1,
      'docNumTables': 1,
      'docNumTablesOnline': 1,
      'docNumTablesPrint': 1,
      'docNumAppendices': 1,
      'docNumAppendicesOnline': 1,
      'docNumAppendicesPrint': 1,
      'docLayoutOnly': 1,
      'docETOCOnly': 1,
      'docKeyWords': 1,
      //MULTIMEDIA
      'docMultiMedia1': 1,
      'docMultiMedia2': 1,
      'docMultiMedia3': 1,
      'docPodcastEmbargoLink': 1,
      'docPodcastPermLink': 1,
      'docPodcastEmbedCode': 1,
      'docVideoEmbedCode': 1,
      'docVideoLink': 1,
      //SOCIAL MEDIA
      'docURL': 1,
      'docHashTags': 1,
      'docSocialSummary': 1,
      //COLLECTION CODES
      'docCollectionCode1': 1,
      'docCollectionCode2': 1,
      'docCollectionCode3': 1,
      'docCollectionCode4': 1,   
      'docCollectionCode5': 1,  
      'docCollectionCode6': 1,
      'code1Code': 1,
      'code2Code': 1,
      'code3Code': 1,
      'code4Code': 1,
      'code5Code': 1,
      'code6Code': 1,
      //DOCUMENT TIMELINE
      'docAcceptDate': 1,
      'docPaymentDate': 1,
      'docETOCDate': 1,
      'docOnlineIssue': 1,
      'docPrintIssue': 1,
      //EDITING TIMELINE
      'docEditor': 1,
      'docCoordinator': 1,
      'docProofReader': 1,
      'docSE1': 1,
      'docSE2': 1,
      'docEnteredDate': 1,
      'docCopyEditBeginDate': 1,
      'docCopyEditCompleteDate': 1,
      'docSendSEDate': 1,
      'docReturnSEDate': 1, 
      'docSendAuthorDate': 1,
      'docReturnAuthorDate': 1,
      'docSendFineTune': 1,
      'docReturnFineTune': 1,
      'docSendProofRead': 1,
      'docReturnProofRead': 1,
      'docFinalizeDate': 1,
      'docStatus': 1,
      //NOTES
      'docOnlineNotes': 1,
      'docPrintNotes': 1,
      //ONLINE ISSUE
      'docFirstPageOnline': 1,
      'docLastPageOnline': 1,
      'docOnlinePosition': 1,
      'docOnlineVolume': 1,
      'docOnlineIssueNumber': 1,
      //PRINT ISSUE
      'docAdConflicts': 1,
      'docFirstPagePrint': 1,
      'docLastPagePrint': 1,
      'docPrintPosition': 1,
      //PRINT ADS
      'docAdClient': 1,
      'docAdDescription': 1,
      'docAdSize': 1,
      'docAdFirstPagePrint': 1,
      'docAdLastPagePrint': 1,
      //NEWS ONLY
      'docNewsReady': 1,
      'docPublishDateCMAJnews': 1,
      'docNewsCommissionDate': 1,
      'docNewsInvoiceDate': 1,
      'docNewsInvoiceAmount': 1,
      //FORMATTED DATES
      'docAcceptDateFormatted': 1,
      'docPaymentDateFormatted': 1,
      'docETOCDateFormatted': 1,
      'docOnlineIssueFormatted': 1,
      'docPrintIssueFormatted': 1,
      'docEnteredDateFormatted': 1,
      'docCopyEditBeginDateFormatted': 1,
      'docCopyEditCompleteDateFormatted': 1,
      'docSendSEDateFormatted': 1,
      'docReturnSEDateFormatted': 1,
      'docSendAuthorDateFormatted': 1,
      'docReturnAuthorDateFormatted': 1,
      'docSendFineTuneDateFormatted': 1,
      'docReturnFineTuneDateFormatted': 1,
      'docSendProofReadDateFormatted': 1,
      'docReturnProofReadDateFormatted': 1,
      'docFinalizeDateFormatted': 1,
      'docNewsReadyFormatted': 1,
      'docPublishDateCMAJnewsFormatted': 1,
      'docNewsCommissionDateFormatted': 1,
      'docNewsInvoiceDateFormatted': 1,
      sortValue:
      {
        $cond: 
        {
          if: 
          {
            $or: 
            [ 
              {$eq: ['$docFirstPagePrint', 0] },
              {$eq: ['$docFirstPagePrint', null]}
            ]
          },
          then: 1000, 
          else: 0,
        }
      }
    }
  },
  {$match: query1},
  {
    $sort:
    { 
      'sortValue': 1,
      'docFirstPagePrint': 1, 
      'docPrintPosition': 1
    }
  }
  ], (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

//Get search results for a print issue and sort by poisition by default, but sort by first page as entered
router.get('/getOnlineSearchResults', (req, res, next) => {
  let query1 = {};
  if(req.query.docOnlineIssue) 
    query1 = {docOnlineIssueFormatted : req.query.docOnlineIssue};

  console.log(query1);

  Doc.aggregate([
  {
    $project:
    {
      //GENERAL FIELDS 
      'docUsername': 1,
      'docDOI': 1,
      'docSection': 1,
      'docDepartment': 1,
      'docAuthor': 1,
      'docTitle': 1,
      'docFocusArea': 1,
      //DOCUMENT DETAILS
      'docFlagPrint': 1,
      'docOpenAccess': 1,
      'docTranslation': 1,
      'docPressRelease': 1,
      'docProfessionalDev': 1,
      'docRelatedMaterial': 1,
      'docOutStandingMaterial': 1,
      'docInvoiceNum': 1,
      'docShortTitle': 1,
      'docWebBlurb': 1,
      'docWebImageURL': 1,
      'docWebImageCredit': 1,
      //LAYOUT
      'docNumPages': 1,
      'docNumPagesOnline': 1,
      'docNumPagesPrint': 1,
      'docNumFigures': 1,
      'docNumFiguresOnline': 1,
      'docNumFiguresPrint': 1,
      'docNumBoxes': 1,
      'docNumBoxesOnline': 1,
      'docNumBoxesPrint': 1,
      'docNumTables': 1,
      'docNumTablesOnline': 1,
      'docNumTablesPrint': 1,
      'docNumAppendices': 1,
      'docNumAppendicesOnline': 1,
      'docNumAppendicesPrint': 1,
      'docLayoutOnly': 1,
      'docETOCOnly': 1,
      'docKeyWords': 1,
      //MULTIMEDIA
      'docMultiMedia1': 1,
      'docMultiMedia2': 1,
      'docMultiMedia3': 1,
      'docPodcastEmbargoLink': 1,
      'docPodcastPermLink': 1,
      'docPodcastEmbedCode': 1,
      'docVideoEmbedCode': 1,
      'docVideoLink': 1,
      //SOCIAL MEDIA
      'docURL': 1,
      'docHashTags': 1,
      'docSocialSummary': 1,
      //COLLECTION CODES
      'docCollectionCode1': 1,
      'docCollectionCode2': 1,
      'docCollectionCode3': 1,
      'docCollectionCode4': 1,   
      'docCollectionCode5': 1,  
      'docCollectionCode6': 1,
      'code1Code': 1,
      'code2Code': 1,
      'code3Code': 1,
      'code4Code': 1,
      'code5Code': 1,
      'code6Code': 1,
      //DOCUMENT TIMELINE
      'docAcceptDate': 1,
      'docPaymentDate': 1,
      'docETOCDate': 1,
      'docOnlineIssue': 1,
      'docPrintIssue': 1,
      //EDITING TIMELINE
      'docEditor': 1,
      'docCoordinator': 1,
      'docProofReader': 1,
      'docSE1': 1,
      'docSE2': 1,
      'docEnteredDate': 1,
      'docCopyEditBeginDate': 1,
      'docCopyEditCompleteDate': 1,
      'docSendSEDate': 1,
      'docReturnSEDate': 1, 
      'docSendAuthorDate': 1,
      'docReturnAuthorDate': 1,
      'docSendFineTune': 1,
      'docReturnFineTune': 1,
      'docSendProofRead': 1,
      'docReturnProofRead': 1,
      'docFinalizeDate': 1,
      'docStatus': 1,
      //NOTES
      'docOnlineNotes': 1,
      'docPrintNotes': 1,
      //ONLINE ISSUE
      'docFirstPageOnline': 1,
      'docLastPageOnline': 1,
      'docOnlinePosition': 1,
      'docOnlineVolume': 1,
      'docOnlineIssueNumber': 1,
      //PRINT ISSUE
      'docAdConflicts': 1,
      'docFirstPagePrint': 1,
      'docLastPagePrint': 1,
      'docPrintPosition': 1,
      //PRINT ADS
      'docAdClient': 1,
      'docAdDescription': 1,
      'docAdSize': 1,
      'docAdFirstPagePrint': 1,
      'docAdLastPagePrint': 1,
      //NEWS ONLY
      'docNewsReady': 1,
      'docPublishDateCMAJnews': 1,
      'docNewsCommissionDate': 1,
      'docNewsInvoiceDate': 1,
      'docNewsInvoiceAmount': 1,
      //FORMATTED DATES
      'docAcceptDateFormatted': 1,
      'docPaymentDateFormatted': 1,
      'docETOCDateFormatted': 1,
      'docOnlineIssueFormatted': 1,
      'docPrintIssueFormatted': 1,
      'docEnteredDateFormatted': 1,
      'docCopyEditBeginDateFormatted': 1,
      'docCopyEditCompleteDateFormatted': 1,
      'docSendSEDateFormatted': 1,
      'docReturnSEDateFormatted': 1,
      'docSendAuthorDateFormatted': 1,
      'docReturnAuthorDateFormatted': 1,
      'docSendFineTuneDateFormatted': 1,
      'docReturnFineTuneDateFormatted': 1,
      'docSendProofReadDateFormatted': 1,
      'docReturnProofReadDateFormatted': 1,
      'docFinalizeDateFormatted': 1,
      'docNewsReadyFormatted': 1,
      'docPublishDateCMAJnewsFormatted': 1,
      'docNewsCommissionDateFormatted': 1,
      'docNewsInvoiceDateFormatted': 1,
      sortValue:
      {
        $cond: 
        {
          if: 
          {
            $or: 
            [ 
              {$eq: ['$docFirstPageOnline', 0] },
              {$eq: ['$docFirstPageOnline', null]}
            ]
          },
          then: 1000, 
          else: 0,
        }
      }
    }
  },
  {$match: query1},
  {
    $sort:
    { 
      'sortValue': 1,
      'docFirstPageOnline': 1, 
      'docOnlinePosition': 1
    }
  }
  ], (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

router.get('/getETOCSearchResults', (req, res, next) => {

  let query1 = {'docETOCDateFormatted': req.query.docETOCDate}; 

  console.log(query1);

  Doc.find(query1, 
           null,
           {sort: {docOnlinePosition: 1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

router.get('/getCheckPreviousOnlineIssue', (req, res, next) => {

  let query1 = {docOnlineIssue: {$lt: new Date(req.query.docOnlineIssue)}};

  Doc.find(query1, 
           null,
           {limit: 1, sort: {docOnlineIssue: -1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

router.get('/getOnlineLastPage', (req, res, next) => {

  let query1 = {'docOnlineIssue': req.query.docOnlineIssue};
  let query2 = {'docLastPageOnline' : {$exists : true}};

  Doc.find({$and: [query1, query2]}, 
           null,
           {docLastPageOnline:1, limit: 1, sort: {docLastPageOnline: -1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

router.get('/getOnlineFirstPage', (req, res, next) => {

  let query1 = {'docOnlineIssue': req.query.docOnlineIssue};
  let query2 = {'docFirstPageOnline' : {$exists : true}};

  Doc.find({$and: [query1, query2]}, 
           null,
           {docFirstPageOnline:1, limit: 1, sort: {docFirstPageOnline: 1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});


module.exports = router;

/*
converter.fromFile('./data/data2017news4.csv', (err, result) => {
  if(err) 
    console.log(err);
  else { 
    jsonData = result;

    for(let i=0; i<jsonData.length; i++)  {

      let newDoc = new Doc({

        //GENERAL FIELDS

        docDOI: jsonData[i]['docDOI'],
        docSection: jsonData[i]['docSection'],
        docDepartment: jsonData[i]['docDepartment'],
        docAuthor: jsonData[i]['docAuthor'],
        docTitle: jsonData[i]['docTitle'],
        docFocusArea: jsonData[i]['docFocusArea'],
        docNotes: jsonData[i]['docNotes'],

        //DOCUMENT DETAILS 

        docOpenAccess: (jsonData[i]['docOpenAccess'] == 'Yes'),
        docTranslation: (jsonData[i]['docTranslation'] == 'Yes'),
        docPressRelease: (jsonData[i]['docPressRelease'] == 'Yes'),
        docProfessionalDev: (jsonData[i]['docProfessionalDev'] == 'Yes'),
        docNumPages: jsonData[i]['docNumPages'],
        docNumAppendices: jsonData[i]['docNumAppendices'],
        docNumFigures: jsonData[i]['docNumFigures'],
        docNumTables: jsonData[i]['docNumTables'],
        docRelatedMaterial: jsonData[i]['docRelatedMaterial'],
        docOutStandingMaterial: jsonData[i]['docOutStandingMaterial'],
        docInvoiceNum: jsonData[i]['docInvoiceNum'],
        docShortTitle: jsonData[i]['docShortTitle'],
        docWebBlurb: jsonData[i]['docWebBlurb'],

        //MULTIMEDIA

        docMultiMedia1: jsonData[i]['docMultiMedia1'],
        docPodcastEmbargoLink: jsonData[i]['docPodcastEmbargoLink'],
        docPodcastPermLink: jsonData[i]['docPodcastPermLink'],
        docPodcastEmbedCode: jsonData[i]['docPodcastEmbedCode'],
        docVideoEmbedCode: jsonData[i]['docVideoEmbedCode'],
        docVideoLink: jsonData[i]['docVideoLink'],

        // COLLECTION CODES

        docCollectionCode1: jsonData[i]['docCollectionCode1'],

        //SOCIAL MEDIA

        docURL: jsonData[i]['docURL'],
        docHashTags: jsonData[i]['docHashTags'],
        docSocialSummary: jsonData[i]['docSocialSummary'],

        //EDITING TIMELINE

        docEditor: jsonData[i]['docEditor'],
        docStatus: jsonData[i]['docStatus'],
        docCoordinator: jsonData[i]['docCoordinator'],
        docProofReader: jsonData[i]['docProofReader'],
        docSE1: jsonData[i]['docSE1'],
        docSE2: jsonData[i]['docSE2'],

        //PRINT ISSUE

        docAdConflicts: jsonData[i]['docAdConflicts']
    
      })

      const docAcceptDate =  moment(jsonData[i]['docAcceptDate']);
      const docPaymentDate =  moment(jsonData[i]['docPaymentDate']);
      const docOnlineIssue = moment(jsonData[i]['docOnlineIssue']);
      const docPrintIssue = moment(jsonData[i]['docPrintIssue']);

      const docEnteredDate =  moment(jsonData[i]['docEnteredDate']);
      const docCopyEditBeginDate =  moment(jsonData[i]['docCopyEditBeginDate']);
      const docCopyEditCompleteDate =  moment(jsonData[i]['docCopyEditCompleteDate']);
      const docSendSEDate =  moment(jsonData[i]['docSendSEDate']);
      const docReturnSEDate =  moment(jsonData[i]['docReturnSEDate']);
      const docSendAuthorDate =  moment(jsonData[i]['docSendAuthorDate']);
      const docReturnAuthorDate =  moment(jsonData[i]['docReturnAuthorDate']);
      const docSendFineTune =  moment(jsonData[i]['docSendFineTune']);
      const docReturnFineTune =  moment(jsonData[i]['docReturnFineTune']);
      const docSendProofRead =  moment(jsonData[i]['docSendProofRead']);
      const docReturnProofRead =  moment(jsonData[i]['docReturnProofRead']);
      const docFinalizeDate =  moment(jsonData[i]['docFinalizeDate']);


      const docPublishDateCMAJnews =  moment(jsonData[i]['docPublishDateCMAJnews']);
      const docNewsCommissionDate =  moment(jsonData[i]['docNewsCommissionDate']);
      const docNewsInvoiceDate =  moment(jsonData[i]['docNewsInvoiceDate']);

      if(docOnlineIssue.isValid()) 
        newDoc['docOnlineIssue'] = docOnlineIssue.toISOString();
      if(docAcceptDate.isValid()) 
        newDoc['docAcceptDate'] = docAcceptDate.toISOString();
      if(docPaymentDate.isValid()) 
        newDoc['docPaymentDate'] = docPaymentDate.toISOString();
      if(docOnlineIssue.isValid()) 
        newDoc['docOnlineIssue'] = docOnlineIssue.toISOString();
      if(docPrintIssue.isValid()) 
        newDoc['docPrintIssue'] = docPrintIssue.toISOString();
      if(docEnteredDate.isValid()) 
        newDoc['docEnteredDate'] = docEnteredDate.toISOString();
      if(docCopyEditBeginDate.isValid()) 
        newDoc['docCopyEditBeginDate'] = docCopyEditBeginDate.toISOString();
      if(docCopyEditCompleteDate.isValid()) 
        newDoc['docCopyEditCompleteDate'] = docCopyEditCompleteDate.toISOString();
      if(docSendSEDate.isValid()) 
        newDoc['docSendSEDate'] = docSendSEDate.toISOString();
      if(docReturnSEDate.isValid()) 
        newDoc['docReturnSEDate'] = docReturnSEDate.toISOString();
      if(docSendAuthorDate.isValid()) 
        newDoc['docSendAuthorDate'] = docSendAuthorDate.toISOString();
      if(docReturnAuthorDate.isValid()) 
        newDoc['docReturnAuthorDate'] = docReturnAuthorDate.toISOString();
      if(docSendFineTune.isValid()) 
        newDoc['docSendFineTune'] = docSendFineTune.toISOString();
      if(docReturnFineTune.isValid()) 
        newDoc['docReturnFineTune'] = docReturnFineTune.toISOString();
      if(docSendProofRead.isValid()) 
        newDoc['docSendProofRead'] = docSendProofRead.toISOString();
      if(docReturnProofRead.isValid()) 
        newDoc['docReturnProofRead'] = docReturnProofRead.toISOString();
      if(docFinalizeDate.isValid()) 
        newDoc['docFinalizeDate'] = docFinalizeDate.toISOString();
      if(docPublishDateCMAJnews.isValid()) 
        newDoc['docPublishDateCMAJnews'] = docPublishDateCMAJnews.toISOString();
      if(docNewsCommissionDate.isValid()) 
        newDoc['docNewsCommissionDate'] = docNewsCommissionDate.toISOString();
      if(docNewsInvoiceDate.isValid()) 
        newDoc['docNewsInvoiceDate'] = docNewsInvoiceDate.toISOString();
//
      newDoc.save((err) => {
        if(err) throw err;
      });


    }

  }

});

*/


/*
router.get('/getOnlineLastPage', (req, res, next) => {
  
  const onlineDate = new Date(req.query.docOnlineIssue);
  const month = onlineDate.getMonth() + 1;
  const year = onlineDate.getFullYear();
  const dayBefore = onlineDate.getDate() - 1;
  const dayAfter = onlineDate.getDate() + 1;
  const date1 = year + '-' + month + '-' + dayBefore;
  const date2 = year + '-' + month + '-' + dayAfter;
  const query1 = {docOnlineIssue: {$gt: new Date(date1)}};
  const query2 = {docOnlineIssue: {$lt: new Date(date2)}};

  Doc.find({$and: [query1, query2]},
          {docLastPageOnline: 1}, 
          {limit: 1, sort: {docLastPageOnline: -1}}, 
          (err, docs) => {
    if (err) throw err;
    else {
      console.log(docs);
      res.json(docs);
    }
  });
});

*/

/*

router.get('/getOnlineSearchResults', (req, res, next) => {

  let query1 = {'docOnlineIssue': req.query.docOnlineIssue}; 

  Doc.find(query1, 
           null,
           {sort: {docOnlinePosition: 1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      res.json(docs);
    }
  });
});

*/



