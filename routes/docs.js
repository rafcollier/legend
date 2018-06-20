const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Doc = require('../models/docs');
const moment = require('moment');

/*
let Converter = require("csvtojson").Converter;
let converter = new Converter({});
let jsonData =  {}; 

converter.fromFile('./data/data2.csv', (err, result) => {
  if(err) 
    console.log(err);
  else { 
    jsonData = result;

    for(let i=0; i<jsonData.length; i++)  {

      let newDoc = new Doc({
        docTitle: jsonData[i]['docTitle'],
        docAuthor: jsonData[i]['docAuthor'],
        docSection: jsonData[i]['docSection'],
        docDOI: parseInt(jsonData[i]['docDOI']),
        docOpenAccess: (jsonData[i]['docOpenAccess'] == 'TRUE'),
        docTranslation: (jsonData[i]['docTranslation'] == 'TRUE')
       // docAcceptDate: moment(jsonData[i]['docAcceptDate']).toISOString(),
       // docAcceptDateFormatted: moment(jsonData[i]['docAcceptDate']).format("MMMM DD, YYYY")
        //docPaymentDate: moment(jsonData[i]['docPaymentDate']).toISOString(),
        //docPaymentDateFormatted: moment(jsonData[i]['docPaymentDate']).format("MMMM DD, YYYY"),
        //docPublishDate: moment(jsonData[i]['docPublishDate']).toISOString(),
        //docPublishDateFormatted: moment(jsonData[i]['docPublishDate']).format("MMMM DD, YYYY")
       // docEnteredDate: moment(jsonData[i]['docEnteredDate']).toISOString(),
       // docCopyEditBeginDate: moment(jsonData[i]['docCopyEditBeginDate']).toISOString(),
       // docCopyEditCompleteDate: moment(jsonData[i]['docCopyEditCompleteDate']).toISOString(),
       // docSendSEDate: moment(jsonData[i]['docSendSEDate']).toISOString(),
       // docReturnSEDate: moment(jsonData[i]['docReturnSEDate']).toISOString(),
       // docSendAuthorDate: moment(jsonData[i]['docSendAuthorDate']).toISOString(),
       // docReturnAuthorDate: moment(jsonData[i]['docReturnAuthorDate']).toISOString(),
       // docFinalizeDate: moment(jsonData[i]['docFinalizeDate']).toISOString()
      })

      const docOnlineIssue = moment(jsonData[i]['docOnlineIssue']);
      const docPrintIssue = moment(jsonData[i]['docPrintIssue']);
      const docAcceptDate =  moment(jsonData[i]['docAcceptDate']);
      const docPaymentDate =  moment(jsonData[i]['docPaymentDate']);
      const docPublishDate =  moment(jsonData[i]['docPublishDate']);
      const docEnteredDate =  moment(jsonData[i]['docEnteredDate']);
      const docCopyEditBeginDate =  moment(jsonData[i]['docCopyEditBeginDate']);
      const docCopyEditCompleteDate =  moment(jsonData[i]['docCopyEditCompleteDate']);
      const docSendSEDate =  moment(jsonData[i]['docSendSEDate']);
      const docReturnSEDate =  moment(jsonData[i]['docReturnSEDate']);
      const docSendAuthorDate =  moment(jsonData[i]['docSendAuthorDate']);
      const docReturnAuthorDate =  moment(jsonData[i]['docReturnAuthorDate']);
      const docFinalizeDate =  moment(jsonData[i]['docFinalizeDate']);

      //if(docOnlineIssue.isValid()) {
      //  newDoc['docOnlineIssue'] = docAcceptDate.toISOString();
      //  newDoc['docAcceptDateFormatted'] = docAcceptDate.format("MMMM DD, YYYY"); 
      //} 



      if(docAcceptDate.isValid()) {
        newDoc['docAcceptDate'] = docAcceptDate.toISOString();
        newDoc['docAcceptDateFormatted'] = docAcceptDate.format("MMMM DD, YYYY"); 
      }
      if(docPaymentDate.isValid()) {
        newDoc['docPaymentDate'] = docPaymentDate.toISOString();
        newDoc['docPaymentDateFormatted'] = docPaymentDate.format("MMMM DD, YYYY"); 
      }
      if(docPublishDate.isValid()) {
        newDoc['docPublishDate'] = docPublishDate.toISOString();
        newDoc['docPublishDateFormatted'] = docPublishDate.format("MMMM DD, YYYY"); 
      }
      if(docEnteredDate.isValid()) {
        newDoc['docEnteredDate'] = docEnteredDate.toISOString();
        newDoc['docEnteredDateFormatted'] = docEnteredDate.format("MMMM DD, YYYY"); 
      }
      if(docPaymentDate.isValid()) {
        newDoc['docCopyEditBeginDate'] = docCopyEditBeginDate.toISOString();
        newDoc['docCopyEditBeginDateFormatted'] = docCopyEditBeginDate.format("MMMM DD, YYYY"); 
      }
      if(docCopyEditBeginDate.isValid()) {
        newDoc['docCopyEditBeginDate'] = docCopyEditBeginDate.toISOString();
        newDoc['docCopyEditBeginDateFormatted'] = docCopyEditBeginDate.format("MMMM DD, YYYY"); 
      }
      if(docCopyEditCompleteDate.isValid()) {
        newDoc['docCopyEditCompleteDate'] = docCopyEditCompleteDate.toISOString();
        newDoc['docCopyEditCompleteDateFormatted'] = docCopyEditCompleteDate.format("MMMM DD, YYYY"); 
      }
      if(docSendSEDate.isValid()) {
        newDoc['docSendSEDate'] = docSendSEDate.toISOString();
        newDoc['docSendSEDateFormatted'] = docSendSEDate.format("MMMM DD, YYYY"); 
      }
      if(docReturnSEDate.isValid()) {
        newDoc['docReturnSEDate'] = docReturnSEDate.toISOString();
        newDoc['docReturnSEDateFormatted'] = docReturnSEDate.format("MMMM DD, YYYY"); 
      }
      if(docPaymentDate.isValid()) {
        newDoc['docSendAuthorDate'] = docSendAuthorDate.toISOString();
        newDoc['docSendAuthorDateFormatted'] = docSendAuthorDate.format("MMMM DD, YYYY"); 
      }
      if(docSendAuthorDate.isValid()) {
        newDoc['docSendAuthorDate'] = docSendAuthorDate.toISOString();
        newDoc['docSendAuthorDateFormatted'] = docSendAuthorDate.format("MMMM DD, YYYY"); 
      }
      if(docReturnAuthorDate.isValid()) {
        newDoc['docReturnAuthorDate'] = docReturnAuthorDate.toISOString();
        newDoc['docReturnAuthorDateFormatted'] = docReturnAuthorDate.format("MMMM DD, YYYY"); 
      }
      if(docFinalizeDate.isValid()) {
        newDoc['docFinalizeDate'] = docFinalizeDate.toISOString();
        newDoc['docFinalizeDateFormatted'] = docFinalizeDate.format("MMMM DD, YYYY"); 
      }

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
    docNotes: req.body.docNotes,

    //DOCUMENT DETAILS

    docOpenAccess: req.body.docOpenAccess,
    docTranslation: req.body.docTranslation,
    docPressRelease: req.body.docPressRelease,
    docProfessionalDev: req.body.docProfessionalDev,
    docNumPages: req.body.docNumPages,
    docNumAppendices: req.body.docNumAppendicies,
    docRelatedMaterial: req.body.docRelatedMaterial,
    docOutstandingMaterial: req.body.docOutstandingMaterial,
    docInvoiceNum: req.body.docInvoiceNum,

    //MULTIMEDIA

    docMultiMedia: req.body.docMultiMedia,
    docPodcastEmbargoLink: req.body.docPodcastEmbargoLink,
    docPodcastPermLink: req.body.docPodcastPermLink,
    docPodcastEmbedCode: req.body.docPodcastEmbedCode,
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


    //ONLINE ISSUE

    docOnlineNotes: req.body.docOnlineNotes,
    docFirstPageOnline: req.body.docFirstPageOnline,
    docLastPageOnline: req.body.docLastPageOnline,

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
  Doc.find({}, null, {limit: Number(limit), sort: {docAcceptDate: -1}}, (err, docs) => {
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

  let query1 = {};
  let query2 = {};
  let query3 = {};
  let query4 = {};
  let query5 = {};
  let query6 = {};
  let query7 = {};
  let query8 = {};
  let query9 = {};

  if(req.query.docOnlineIssue) 
    query1 = {'docOnlineIssue' : {$regex: req.query.docOnlineIssue, $options: 'i'}};

  if(req.query.docPrintIssue) 
    query2 = {'docPrintIssue' : {$regex: req.query.docPrintIssue, $options: 'i'}};

  if(req.query.docSection) 
    query3 = {'docSection' : {$regex: req.query.docSection, $options: 'i'}};

  if(req.query.docAuthor) 
    query4 = {'docAuthor' : {$regex: req.query.docAuthor, $options: 'i'}};

  if(req.query.docDOI) 
    query5 = {'docDOI' : req.query.docDOI};

  if(req.query.docTitle) 
    query6 = {'docTitle' : {$regex: req.query.docTitle, $options: 'i'}};

  if(req.query.docPublished == 'false') { 
    query7 = {'docPublishDate' : {$exists : false}};
  }
  else {
    query7 = {'docPublishDate' : {$exists : true}};
  }

  if(req.query.afterAcceptDate)
    query8 = {docAcceptDate: {$gte: new Date(req.query.afterAcceptDate)}};

  if(req.query.beforeAcceptDate)
    query9 = {docAcceptDate: {$lte: new Date(req.query.beforeAcceptDate)}};


  Doc.find({$and: [query1, query2, query3, query4, query5, query6, query7, query8, query9]}, 
           null, 
           {sort: {docSection: 1}
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



module.exports = router;