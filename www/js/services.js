angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Textbooks', function($http, $log, $q) {
  //var db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
  var textbooks = [];
  var date = new Date().toLocaleString();
  return {
      all: function () {
          return $http.get('http://dgm3790.iriscouch.com/textbook_db/_design/apiv1/_view/textbooks');
      },
      get: function (textbookId) {
          var textbook_db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
          console.log("ID", textbookId);
           return textbook_db.get(textbookId, function(err, doc){
                if(err){
                    return err;
                } else if(doc){
                    return doc;
                }
//
//                // If the isbn10 does not exist then create a new ad as well as a new textbook
//                if(err){
//                    console.log("NO TEXTBOOK", err);
//                    textbook_db.put(
//                        {
//                            _id: $scope.textbook.isbn10,
//                            "course": $scope.textbook.course,
//                            "price": $scope.textbook.price,
//                            "description":  $scope.textbook.description,
//                            "dateListed":date,
//                            "sellerID":"rjhunter20@gmail.com",
//                            "title": $scope.textbook.name,
//                            "isbn10": $scope.textbook.isbn10,
//                            "isbn13": $scope.textbook.isbn13,
//                            "condition": $scope.textbook.condition.value,
//                            "imageURL":"img/books/business-law-text-and-cases.jpg",
//                            "trade":false,
//                            "value": $scope.textbook.price
//                        }, function(err, response) {
//                            if(err){
//                                console.log("ERROR", err);
//                            } else if(response){
//                                console.log("SUCCESS", response);
//                            }
//
//                        });
//
//                // If isbn10 exists then use the textbooks id and create a new ad
//                }else if(doc){
//                    console.log("TEXTBOOK-SUCCESS", doc);
//                }
            });



//      db.get(textbookId, function(textbook){
//          return textbook;
//      });
      },
      add: function (textbook) {
          var textbook_db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');

          textbook_db.put(
              {
                  _id: new Date().toISOString(),
                  "course": textbook.course,
                  "title": textbook.title,
                  "isbn10": textbook.isbn10,
                  "isbn13": textbook.isbn13
              }, function(err, response) {
                  if(err){
                      console.log("TEXTBOOK NOT SAVED", err);
                  } else if(response){
                      console.log("TEXTBOOK SAVED", response);
                  }

              });
          // send the image to the database as a blob
//         var convertImgToBlob = function(img, callback) {
//              var canvas = document.createElement('canvas');
//              var context = canvas.getContext('2d');
//              context.drawImage(img, 0, 0);
//              console.log("First Thisfar");
//              // Warning: toBlob() isn't supported by every browser.
//              // You may want to use blob-util.
//              canvas.toBlob(callback, 'image/jpg');
//          };
//
//          convertImgToBlob(textbook.image, function (blob) {
//              console.log("THISFAR");
//
//              textbook_db.putAttachment(textbook.upc, textbook.upc + ".jpg", blob, 'image/jpg').then(function () {
//                  return textbook_db.get(textbook.upc, {attachments: true});
//              }).then(function (doc) {
//                  console.log("ATTACHMENTS", doc);
//              });
//          });

////
//          return promise.then(function(result) {
//              console.log(result.data.rows);
//              return result.data.rows;
//          });


//          db.put(
//              {
//                  _id: new Date().toISOString(),
//                  "course": $scope.textbook.course,
//                  "price": $scope.textbook.price,
//                  "description":  $scope.textbook.description,
//                  "dateListed":date,
//                  "sellerID":"rjhunter20@gmail.com",
//                  "title": $scope.textbook.name,
//                  "isbn10": $scope.textbook.isbn10,
//                  "isbn13": $scope.textbook.isbn13,
//                  "condition": $scope.textbook.condition.value,
//                  "imageURL":"img/books/business-law-text-and-cases.jpg",
//                  "trade":false,
//                  "value": $scope.textbook.price
//              }, function(err, response) {console.log("ERROR/RESP", err, response) });
//
//    }
      }
  }
})

.factory('TextBookAds', function($http, $log, $q) {
    var date = new Date().toLocaleString();
    return {
        add: function (textbook, user) {
            var ads_db = new PouchDB('http://dgm3790.iriscouch.com/textbook_ads_db');
            ads_db.put(
                {
                    _id: new Date().toISOString(),
                    "sellerID": user._id,
                    "textBookID": textbook._id,
                    "description": textbook.description,
                    "dateListed": date,
                    "condition": textbook.condition.value,
                    "trade": false,
                    "value": textbook.value
                }, function (err, response) {
                    if (err) {
                        console.log("TextbookAd Not Saved", err);
                    } else if (response) {
                        console.log("TextbookAd Saved", response);
                    }

                });
        }
    }
})
.factory('Users', function ($http) {
  Users = {};
  Users.getUsers = function(){
    return $http.get('data/user_list.json');
  }
  return Users;
});
