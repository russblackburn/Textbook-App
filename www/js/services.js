angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Textbooks', function($http) {
  //var db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
  var textbooks = [];
  return {
    all: function() {

//        return {
//            return:$http.get('http://dgm3790.iriscouch.com/test_assignment_db/_design/apiv1/_view/jobs'
//                .then(function(result){
//                    return result.data.rows;
//                }))
//        }



//        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
//            textbooks = [];
//            if(err){
//                return err;
//            } else if(doc){
//                for(var i=0; i < doc.rows.length; i++){
//                    textbooks.push(doc.rows[i].doc);
//                }
//                console.log("TB: ", textbooks);
//                return textbooks;
//            } else {
//                return "pooh";
//            }
//        });
    },
    get: function(textbookId) {
//      db.get(textbookId, function(textbook){
//          return textbook;
//      });
    },
    set: function(textbook){
//      db.put(textbook, function(err, response) {
//          if(err){
//              return err;
//          } else if(response){
//              return err;
//          } else {
//              return "";
//          }
//      });

    }
  };
});
