CwKN&9lXIR23


//convert cvs to json

csvtojson legendtrimmed.csv > legend.json

//add multiple documents to mongodb collection
db.docs.insertMany(



)

//LOCAL MONGO IMPORT AND EXPORT
//in mongofiles directory in legend under projects

//Import json array into collection from regular command prompt (not mongo shell)
mongoimport --db legend --collection docs --file docs.json --jsonArray


//export json array into collection from regular command prompt (not mongo shell)
mongoexport --db legend --collection sections --out sections.json --jsonArray

//IMPORT FROM LOCAL TO MLAB ON HEROKU
mongoimport -h ds123490.mlab.com:23490 -d heroku_k52f5vsp -c sections -u heroku_k52f5vsp -p efhqgaaq5augddhfj8g61hb7l4 --file sections.json --jsonArray


//GIT




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








