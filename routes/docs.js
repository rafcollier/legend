const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Doc = require('../models/docs');

router.post('/submitdoc', (req, res, next) => {
  let newDoc = new Doc({
    docUsername: req.body.docUsername,
    docSection: req.body.docSection,
  	docTitle: req.body.docTitle,
    docAuthor: req.body.docAuthor,
    docDescription: req.body.docDescription,
    docOnlineIssue: req.body.docOnlineIssue,
    docPrintIssue: req.body.docPrintIssue,
    docCollectionCode1: req.body.docCollectionCode1,
    docCollectionCode2: req.body.docCollectionCode2,
    docCollectionCode3: req.body.docCollectionCode3,
    docCollectionCode4: req.body.docCollectionCode4,
    docPublishDateCMAJnews: req.body.docPublishDateCMAJnews,
    docNumPagesOnline: req.body.docNumPagesOnline,
    docOnlineNotes: req.body.docOnlineNotes,
    docPrintNotes: req.body.docPrintNotes,
    docNumPagesPrint: req.body.docNumPagesPrint,
    docAdConflicts: req.body.docAdConflicts,
    docDOI: req.body.docDOI,
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
  console.log("update doc");
  const query = {_id:req.body.docID};
  const updatedDoc = req.body;
  console.log(updatedDoc);
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

    
    //'docPrintIssue' : req.query.docPrintIssue || {}, 
    //'docSection' : req.query.docSection || {} 
  console.log(query1);
  console.log(query2);
  console.log(query3);
  console.log(query4);
  console.log(query5);
  console.log(query6);
  //const offset = req.query.itemOffset;
  //const limit = req.query.limit;
  //Doc.find({'docOnlineIssue' : req.query.docOnlineIssue}, null, {skip: Number(offset), limit: Number(limit), sort: req.query.searchParameter }, (err, items) => {
  Doc.find({$and: [query1, query2, query3, query4, query5, query6]}, null, {sort: {docSection: 1}}, (err, docs) => {
    if (err) throw err;

    res.json(docs);
  });
});


module.exports = router;