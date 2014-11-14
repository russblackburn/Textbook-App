angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Textbooks', function($http) {
  var db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
  var textbooks = [];
  return {
    all: function() {
        db.allDocs({include_docs: true, descending: true}, function(err, doc) {
            textbooks = [];
            if(err){
                return err;
            } else if(doc){
                for(var i=0; i < doc.rows.length; i++){
                    textbooks.push(doc.rows[i].doc);
                }
                console.log("TB: ", textbooks);
                return textbooks;
            } else {
                return "pooh";
            }
        });
    },
    get: function(textbookId) {
      db.get(textbookId, function(textbook){
          return textbook;
      });
    },
    set: function(textbook){
      db.put(textbook, function(err, response) {
          if(err){
              return err;
          } else if(response){
              return err;
          } else {
              return "";
          }
      });

    }
  };
});
