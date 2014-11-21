angular.module('starter.controllers', [])

    //injected $cordovaBarcodeScanner service
.controller('DashCtrl', function($scope, $http, $cordovaBarcodeScanner, Textbooks) {
  $http.get('data/book_list.json').success(function(data){
      $scope.books = data;
  });

//  $scope.db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
//
//  $scope.db.allDocs({include_docs: true, descending: true}, function(err, doc) {
//      $scope.textbooks = [];
//      for(var i=0; i < doc.rows.length; i++){
//          $scope.textbooks.push(doc.rows[i].doc);
//      }
//      $scope.books = $scope.textbooks;
//      console.log("DOC",$scope.books);
//  });

//  $scope.print = console.log("BOOKS", Textbooks.all());



  $scope.orderProp = 'title';

        //adding barcode scanner for textbook upc
        $scope.scanBarcode = function() {
            $cordovaBarcodeScanner.scan().then(function(imageData) {

                $scope.barcoderesults = imageData.text;
                document.getElementById("textbookInput").value = imageData.text;

                if (imageData.cancelled == 1) {
                    alert("Cancelled Barcode Scan");
                } else {
                    console.log("Scan Not Cancelled ->" + imageData.cancelled);
                }
            }, function(error) {
                console.log("An error happened -> " + error);
            });
        };


})

.controller('NewCtrl', function($scope, Textbooks) {
  $scope.textbooks = Textbooks.all();
  $scope.showValidationMessages = false;
  $scope.textbook = {
          "condition":{
              'value': 4,
              'description': "This book is in great condition"
          }
      }
  $scope.conditions = [
      {
          "description": "This book sucks"
      },
      {
          "description": "This book sucks a little"
      },
      {
          "description": "This book is ok"
      },
      {
          "description": "This book is in great condition"
      },
      {
          "description": "This book is awesome"
      }
  ];
        var date = new Date().toLocaleString();
        console.log("DATE: ", date);
  $scope.submit = function(tbForm){
      $scope.showValidationMessages = true;

      if(!tbForm.$invalid){
          var db = new PouchDB('http://dgm3790.iriscouch.com/textbook_db');
          db.put(
              {
                  _id: new Date().toISOString(),
                  "course": $scope.textbook.course,
                  "price": $scope.textbook.price,
                  "description":  $scope.textbook.description,
                  "dateListed":date,
                  "sellerID":"rjhunter20@gmail.com",
                  "title": $scope.textbook.name,
                  "isbn-10": $scope.textbook.isbn10,
                  "isbn13": $scope.textbook.isbn13,
                  "condition": $scope.textbook.condition.value,
                  "imageURL":"img/books/business-law-text-and-cases.jpg",
                  "trade":false,
                  "value": $scope.textbook.price
              }, function(err, response) {console.log("ERROR/RESP", err, response) });
      }




  };
  $scope.updateCondition = function(tb){
      tb.condition.description = $scope.conditions[tb.condition.value -1].description;
      console.log("TB", tb);
  };
})

.controller('TextbookDetailCtrl', function($http, $scope, $stateParams, Textbooks) {
  function bookCondition(num){
    var val;
    switch(num){
      case 1:
        val = 'Bad';
      break;
      case 2:
        val = 'Poor';
      break;
      case 3:
        val = 'Fair';
      break;
      case 4:
        val = 'Good';
      break;
      case 5:
        val = 'Excellent';
      break;
    }
    return val;
  }
  $http.get('data/book_list.json').success(function(data){
      var books = data;
      var condition;
      var defaultCon = "-outline";
      var conArray = [defaultCon,defaultCon,defaultCon,defaultCon,defaultCon];
      for (var key in books) {
        if (books.hasOwnProperty(key)) {
          if ($stateParams.textbookId == books[key]['id']) {
            $scope.textbook = books[key];
            condition = books[key]['condition'];
            conArray.length = 5;
            for(var i = 0; i < condition; i++){
              conArray[i] = "";
            }
            $scope.starsCon = conArray;

            $scope.textbook['trade_text'] = (books[key]['trade'] == true ? books[key]['title']+' is up for trade, please make an offer' : books[key]['title']+' is not up for trade, cash payments only')

            $scope.textbook.timestamp = books[key]['dateListed'].split(" ");
            $scope.textbook.timestamp.day = $scope.textbook.timestamp[0].split("-");
            $scope.textbook.timestamp.time_ = $scope.textbook.timestamp[1].split("-");
          }
        }
      }
  });
  $http.get('data/user_list.json').success(function(data){
      var user = data;
      var rating;
      var defaultVal = "-outline";
      var ratingArray = [defaultVal,defaultVal,defaultVal,defaultVal,defaultVal];
      $scope.stars = [];
      for (var key in user) {
        if (user.hasOwnProperty(key)) {
          if ($scope.textbook['sellerID'] == user[key]['sellerID']) {
            $scope.seller = user[key];
            rating = user[key]['rating'];
            ratingArray.length = 5;
            for(var i = 0; i < rating; i++){
              ratingArray[i] = "";
            }
            // $scope.stars = JSON.stringify(ratingArray);
            $scope.starsRating = ratingArray;
          }
        }
      }
  });
})

.controller('AccountCtrl', function($scope, $stateParams, Users) {
  var users = Users.getUsers()
    .success(function(usr){
      for (var key in usr) {
          if (usr.hasOwnProperty(key)) {
            if ($stateParams.userId == usr[key]['sellerID']) {
              $scope.seller = usr[key];
              break;
            }
          }
        }
      });
});
