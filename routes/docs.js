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

/*
converter.fromFile('./data/data2017news3.csv', (err, result) => {
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

    docOpenAccess: req.body.docOpenAccess,
    docTranslation: req.body.docTranslation,
    docPressRelease: req.body.docPressRelease,
    docProfessionalDev: req.body.docProfessionalDev,
    docNumPages: req.body.docNumPages,
    docNumFigures: req.body.docNumFigures,
    docNumTables: req.body.docNumTables,
    docNumAppendices: req.body.docNumAppendices,
    docRelatedMaterial: req.body.docRelatedMaterial,
    docOutStandingMaterial: req.body.docOutStandingMaterial,
    docInvoiceNum: req.body.docInvoiceNum,
    docShortTitle: req.body.docShortTitle,
    docWebBlurb: req.body.docWebBlurb,

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

    //NOTES
    docOnlineNotes: req.body.docOnlineNotes,
    docPrintNotes: req.body.docPrintNotes,
    docNotes: req.body.docNotes,

    //ONLINE ISSUE

    docFirstPageOnline: req.body.docFirstPageOnline,
    docLastPageOnline: req.body.docLastPageOnline,
    docOnlinePosition: req.body.docOnlinePosition,

    //PRINT ISSUE

    docAdConflicts: req.body.docAdConflicts,
    docFirstPagePrint: req.body.docFirstPagePrint,
    docLastPagePrint: req.body.docLastPagePrint,

    //NEWS ONLY

    docPublishDateCMAJnews: req.body.docPublishDateCMAJnews,
    docNewsCommissionDate: req.body.docNewsCommissionDate,
    docNewsInvoiceDate: req.body.docNewsInvoiceDate,
    docNewsInvoiceAmount: req.body.docNewsInvoiceAmount,

  });

  console.log("router doc" + newDoc);
  newDoc.save((err) => {
    if(err) throw err;
    res.json({success: true, msg: 'Doc added'});
  });
});

router.get('/getRecentAdded', (req, res, next) => {
  const limit = req.query.limit;
  //Doc.find({'docUsername' : req.query.docUsername}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
  Doc.find({}, null, {limit: Number(limit), sort: {dateEntered: -1}}, (err, docs) => {
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
  Doc.findByIdAndRemove(req.query.docID, (err, doc) => { 
    if (err) throw err;
  });
});

router.put('/updateDoc', (req, res, next) => {
  const query = {_id:req.body.docID};
  const updatedDoc = req.body;
  Doc.update({'_id' : req.body.docID}, req.body, (err) => {
    if(err) throw err;
    res.json({success: true, msg: 'Document updated'});
  });
});

router.get('/getSearchResults', (req, res, next) => {

  let query3 = {};
  let query4 = {};
  let query5 = {};
  let query6 = {};
  let query7 = {};
  let query8 = {};
  let query9 = {};
  let query10 = {};

  if(req.query.docSection) 
    query3 = {'docSection' : req.query.docSection};

  if(req.query.docAuthor) 
    query4 = {'docAuthor' : {$regex: req.query.docAuthor, $options: 'i'}};

  if(req.query.docDOI) 
    query5 = {'docDOI' : req.query.docDOI};

  if(req.query.docTitle) 
    query6 = {'docTitle' : {$regex: req.query.docTitle, $options: 'i'}};

  if(req.query.docNotUsedOnline)  
    query7 = {'docOnlineIssue' : {$exists : false}};

  if(req.query.docNotUsedPrint)  
    query8 = {'docPrintIssue' : {$exists : false}};

  if(req.query.afterAcceptDate)
    query9 = {docAcceptDate: {$gte: new Date(req.query.afterAcceptDate)}};

  console.log(query9);

  if(req.query.beforeAcceptDate)
    query10 = {docAcceptDate: {$lte: new Date(req.query.beforeAcceptDate)}};


  Doc.find({$and: [query3, query4, query5, query6, query7, query8, query9, query10]}, 
           null, 
           {sort: {docOnlinePosition: 1}
           }, 
    (err, docs) => {
      if (err) throw err;
      res.json(docs);
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


router.get('/getLayoutSearchResults', (req, res, next) => {
  let query1 = {};
  if(req.query.docPrintIssue) 
    query1 = {'docPrintIssue' : req.query.docPrintIssue};
  
  Doc.find(query1,
           null, 
           {sort: {docFirstPagePrint: 1}}, 
           (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

router.get('/getOnlineSearchResults', (req, res, next) => {
  let query1 = {}; 
  let query2 = {}; 
  if (req.query.docOnlineIssue) { 
    query1 = {docOnlineIssue: {$gte: new Date(req.query.docOnlineIssue)}};
    query2 = {docOnlineIssue: {$lte: new Date(req.query.docOnlineIssue)}};
  }
  //query9 = {docAcceptDate: {$gte: new Date(req.query.afterAcceptDate)}};

  console.log("in route docs");
  console.log(query1);
  console.log(query2);

  Doc.find({$and: [query1, query2]}, 
           null,
           {sort: {docOnlinePosition: 1}}, 
           (err, docs) => {
    if (err) throw err;
    else {
      console.log(docs);
      res.json(docs);
    }
  });
});


router.get('/getOnlineLastPage', (req, res, next) => {
  console.log(req.query.docOnlineIssue);
  let query1 = {docOnlineIssue: {$eq: new Date(req.query.docOnlineIssue)}};
  console.log(query1);
  Doc.find(query1, 
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

module.exports = router;