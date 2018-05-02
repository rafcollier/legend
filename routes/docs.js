const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Doc = require('../models/docs');

router.post('/submitdoc', (req, res, next) => {
  let newDoc = new Doc({

    //GENERAL FIELDS 
    
    docUsername: req.body.docUsername,
    docTitle: req.body.docTitle,
    docAuthor: req.body.docAuthor,
    docDOI: req.body.docDOI,
    docSection: req.body.docSection,
    docDescription: req.body.docDescription,
    docCollectionCode1: req.body.docCollectionCode1,
    docCollectionCode2: req.body.docCollectionCode2,
    docCollectionCode3: req.body.docCollectionCode3,
    docCollectionCode4: req.body.docCollectionCode4,    
    docAuthorType: req.body.docAuthorType,
    docCommissionDate: req.body.docCommissionDate,
    docInvoiceDate: req.body.docInvoiceDate,
    docInvoiceAmount: req.body.docInvoiceAmount,

    //TIMELINE
    docAcceptDate: req.body.docAcceptDate,
    docPublishDate: req.body.docPublishDate,
    docEnteredDate: req.body.docEnteredDate,
    docCopyEditBeginDate: req.body.docCopyEditBeginDate,
    docCopyEditCompleteDate: req.body.docCopyEditCompleteDate,
    docSendSEDate: req.body.docSendSEDate,
    docReturnSEDate: req.body.docReturnSEDate, 
    docSendAuthorDate: req.body.docSendAuthorDate,
    docReturnAuthorDate: req.body.docReturnAuthorDate,
    docFinalizeDate: req.body.docFinalizeDate, 

    //EDITORS
    docEditor: req.body.docEditor,
    docCoordinator: req.body.docCoordinator,
    docProofReader: req.body.docProofReader,
    docSE1: req.body.docSE1,
    docSE2: req.body.docSE2,  

    //YES OR NO FIELDS
    docOpenAccess: req.body.docOpenAccess,
    docTranslation: req.body.docTranslation,

    //ONLINE ISSUE

    docOnlineIssue: req.body.docOnlineIssue,
    docFirstPageOnline: req.body.docFirstPageOnline,
    docLastPageOnline: req.body.docLastPageOnline,
    docNumPagesOnline: req.body.docNumPagesOnline,
    docOnlineNotes: req.body.docOnlineNotes,

    //PRINT ISSUE

    docPrintIssue: req.body.docPrintIssue,
    docFirstPagePrint: req.body.docFirstPagePrint,
    docLastPagePrint: req.body.docLastPagePrint,
    docNumPagesPrint: req.body.docNumPagesPrint,
    docPrintNotes: req.body.docPrintNotes,
    docAdConflicts: req.body.docAdConflicts,

    //NEWS ONLY

    docPublishDateCMAJnews: req.body.docPublishDateCMAJnews,
    docNewsAuthorType: req.body.docNewsAuthorType,
    docNewsCommissionDate: req.body.docNewsCommissionDate,
    docNewsInvoiceDate: req.body.docNewsInvoiceDate,
    docNewsInvoiceAmount: req.body.docNewsInvoiceAmount
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
  if(req.query.docOnlineIssue) 
    query1 = {'docOnlineIssue' : req.query.docOnlineIssue};
  if(req.query.docPrintIssue) 
    query2 = {'docPrintIssue' : req.query.docPrintIssue};
  if(req.query.docSection) 
    query3 = {'docSection' : req.query.docSection};
  if(req.query.docAuthor) 
    query4 = {'docAuthor' : req.query.docAuthor};
  if(req.query.docDOI) 
    query4 = {'docDOI' : req.query.docDOI};
  if(req.query.docTitle) 
    query4 = {'docTitle' : req.query.docTitle};
    
  //const offset = req.query.itemOffset;
  //const limit = req.query.limit;
  //Doc.find({'docOnlineIssue' : req.query.docOnlineIssue}, null, {skip: Number(offset), limit: Number(limit), sort: req.query.searchParameter }, (err, items) => {
  
  Doc.find({$and: [query1, query2, query3, query4, query5, query6]}, 
           null, 
           {sort: {docSection: 1}}, 
           (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});


router.get('/getLayoutSearchResults', (req, res, next) => {
  let query1 = {};
  //let query2 = {};
  //if(req.query.docOnlineIssue) 
   // query1 = {'docOnlineIssue' : req.query.docOnlineIssue};
  if(req.query.docPrintIssue) 
    query1 = {'docPrintIssue' : req.query.docPrintIssue};
  //const offset = req.query.itemOffset;
  //const limit = req.query.limit;
  //Doc.find({'docOnlineIssue' : req.query.docOnlineIssue}, null, {skip: Number(offset), limit: Number(limit), sort: req.query.searchParameter }, (err, items) => {
  
  //Doc.find({$and: [query1, query2, query3, query4, query5, query6]}, 
  Doc.find(query1,
           null, 
           {sort: {docFirstPagePrint: 1}}, 
           (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});



module.exports = router;