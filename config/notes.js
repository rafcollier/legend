
/////////////////////////////


https://legend.development.joulecma.ca


**database **transaction **lock file when been edited *can still read

Three databases

Development, Production, localStorage

Proxy can establish connection and see development or production on local host

//CONNECT TO DEV DATABASE FROM LOCAL HOST
kubectl port-forward $(echo $(kubectl get pods -o=name --all-namespaces | grep mongodb) | sed 's/pod\///g') 27020:27017 -n mongodb




//////////////////////////////




Jenkins

Kubernetes


development and production cluster


//Clone github to local













///

CwKN&9lXIR23


//convert cvs to json

csvtojson legendtrimmed.csv > legend.json

//add multiple documents to mongodb collection
db.docs.insertMany(


//Mongo dump and restore

cd /data/db

//Legend
mongodump -h ds123490.mlab.com:23490 -d heroku_k52f5vsp -u heroku_k52f5vsp -p efhqgaaq5augddhfj8g61hb7l4 -o dumps 

mongorestore --db legend --verbose "/data/db/dumps/heroku_k52f5vsp"

//Collection Tracker
mongodump -h ds153521.mlab.com:53521 -d heroku_n29prwpc -u rogercollier -p rogercollier123 -o dumps

mongorestore --db whenwear --verbose "/data/db/dumps/heroku_n29prwpc"



//Colletion Tracker
"heroku_n29prwpc"


mongoexport -h ds012345.mlab.com:12345 -d <database> -c <collection> -u <user> -p <password> -o <output file>





//LOCAL MONGO IMPORT AND EXPORT
//in mongofiles directory in legend under projects

//Import json array into collection from regular command prompt (not mongo shell)
mongoimport --db legend --collection docs --file docs.json --jsonArray

//export json array into collection from regular command prompt (not mongo shell)
mongoexport --db legend --collection sections --out sections.json --jsonArray

//IMPORT FROM LOCAL TO MLAB ON HEROKU
mongoimport -h ds123490.mlab.com:23490 -d heroku_k52f5vsp -c sections -u heroku_k52f5vsp -p efhqgaaq5augddhfj8g61hb7l4 --file sections.json --jsonArray


mongoexport -h ds123490.mlab.com:23490 -d heroku_k52f5vsp -c sections -u heroku_k52f5vsp -p efhqgaaq5augddhfj8g61hb7l4 -o sections.json --jsonArray


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







