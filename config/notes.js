CwKN&9lXIR23


//convert cvs to json

csvtojson legendtrimmed.csv > legend.json

//add multiple documents to mongodb collection
db.docs.insertMany(



)

//Import json array into collection from regular command prompt (not mongo shell)
mongoimport --db legend --collection docs --file legendJSON.json --jsonArray


//export json array into collection from regular command prompt (not mongo shell)
mongoexport --db legend --collection docs --out legendNewDates.json --jsonArray


//convert string dates to date objects in mongodb

db.docs.aggregate( [ {
   $addFields: {
      docAcceptDate: {
         $dateFromString: {
            dateString: '$docAcceptDate',
            timezone: 'America/New_York'
         }
      },
      docPublishDate: {
         $dateFromString: {
            dateString: '$docPublishDate',
            timezone: 'America/New_York'
         }
      },
      docPaymentDate: {
         $dateFromString: {
            dateString: '$docPaymentDate',
            timezone: 'America/New_York'
         }
      },
      docEnteredDate: {
         $dateFromString: {
            dateString: '$docEnteredDate',
            timezone: 'America/New_York'
         }
      },
      docCopyEditBeginDate: {
         $dateFromString: {
            dateString: '$docCopyEditBeginDate',
            timezone: 'America/New_York'
         }
      },
      docCopyEditCompleteDate: {
         $dateFromString: {
            dateString: '$docCopyEditCompleteDate',
            timezone: 'America/New_York'
         }
      },
      docFinalizeDate: {
         $dateFromString: {
            dateString: '$docFinalizeDate',
            timezone: 'America/New_York'
         }
      },
      docSendSEDate: {
         $dateFromString: {
            dateString: '$docSendSEDate',
            timezone: 'America/New_York'
         }
      },
      docReturnSEDate: {
         $dateFromString: {
            dateString: '$docReturnSEDate',
            timezone: 'America/New_York'
         }
      },
      docSendAuthorDate: {
         $dateFromString: {
            dateString: '$docSendAuthorDate',
            timezone: 'America/New_York'
         }
      },
      docReturnAuthorDate: {
         $dateFromString: {
            dateString: '$docReturnAuthorDate',
            timezone: 'America/New_York'
         }
      }
   }
},
{ $out: "docs"}
] )








