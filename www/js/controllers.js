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

.controller('NewCtrl', function($scope, Textbooks, TextBookAds, $http, $cordovaBarcodeScanner, $cordovaCamera) {
    $scope.getTextbooks = function(textbooks){
        var promise = Textbooks.all();
        promise.then(
            function(data){
                console.log("Success-DATA", data.data.rows);
                $scope.textbooks = data.data.rows;
            },
            function(err){
                console.log("FAIL", err);
            }
        )
    };
    $scope.getTextbooks();
    $scope.bookTest = function(){
        console.log("BOOK", $scope.textbook);
    }

    // Replace this with actual user when we get that figured out
    $scope.user = {
        '_id': "rjhunter20@gmail.com",
        'name':"Ryan Hunter",
        'email': "rjhunter20@gmail.com"
    };



        console.log("TEXTBOOKS", $scope.textbooks);
    $scope.showValidationMessages = false;

    // Fill with default information (important to set unrequired fields to ""
    $scope.textbook = {
      "condition":{
          'value': 4,
          'description': "This book is in great condition"
      },
      "isbn10": "",
      "isbn13" :"",
      "course" : "",
      "trade" : false,
      "image": "img/books/business-law-text-and-cases.jpg"
    };
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

    $scope.convertImgToBlob = function(img, callback){
        var canvas = new Image(img);

        // Warning: toBlob() isn't supported by every browser.
        // You may want to use blob-util.
        canvas.toBlob(callback, 'image/jpg');
    }

    $scope.showBlob = function(blob){
        console.log("BLOB!!!!", blob);
    };

    $scope.submit = function(tbForm){
        $scope.showValidationMessages = true;

        if(!tbForm.$invalid){
            //$scope.convertImgToBlob($scope.textbook.image, $scope.showBlob());
            var getTextbook = function(textbookID){
                var promise = Textbooks.get(textbookID);
                promise.then(
                    function(data){
                        console.log("Textbook Exists", data);
                        // There is a book that exists: now create a new Ad
                        TextBookAds.add($scope.textbook, $scope.user);
                    },
                    function(err){
                        console.log("Textbook Does Not Exist - Create one", err);
                        // There is not a book, create a new Book and a new Ad
                        Textbooks.add($scope.textbook);
                        TextBookAds.add($scope.textbook, $scope.user);
                    }
                )
            };
            getTextbook($scope.textbook.upc);

          // If the isbn10 does not exist then create a new ad as well as a new textbook

        }
    };
    $scope.clearValues = function(){
        $scope.textbook.course = "";
        $scope.textbook.value = null;
        $scope.textbook.description = "";
        $scope.textbook.title = "";
        $scope.textbook.isbn10 = "";
        $scope.textbook.isbn13 = "";
        $scope.textbook.upc = "";
    };
    $scope.fillWithFake = function(){
        $scope.textbook.course = "DGM 3740";
        $scope.textbook.value = 45;
        $scope.textbook.description = "This is one great book";
        $scope.textbook.title = "Introduction to Node.js";
        $scope.textbook.isbn10 = "1617290572";
        $scope.textbook.isbn13 = "978-1617290572";
        $scope.textbook.upc = "9781617290572";
    };
    $scope.updateTextbook = function(data){
        $scope.textbook.course = data.course;
        $scope.textbook.value = data.value;
        $scope.textbook.description = data.description;
        $scope.textbook.title = data.title;
        $scope.textbook.isbn10 = data.isbn10;
        $scope.textbook.isbn13 = data.isbn13;
        $scope.textbook.upc = data._id;
    };

    $scope.updateCondition = function(tb){
      tb.condition.description = $scope.conditions[tb.condition.value -1].description;
      console.log("TB", tb);
    };

    $scope.fillInputs = function(testUPC){
      // $cordovaBarcodeScanner.scan().then(function(imageData) {
            var  scanResults = testUPC;

            var getTextbook = function (textbookID) {
                var promise = Textbooks.get(textbookID);
                promise.then(
                    function (data) {
                        console.log("Textbook Exists", data);
                        // There is a book that exists: now fill all the text-fields
                        $scope.updateTextbook(data);
                        $scope.$apply();
                    },
                    function (err) {
                        console.log("Textbook Does Not Exist - Send Message & prefill", err);
                        // There is not a book, prefill the upc field
                        $scope.textbook.upc = scanResults;
                        $scope.$apply();
                    }
                )
            };
            getTextbook(scanResults);
       // });


    };

    //adding barcode scanner for automatic input fields
//    $http.get('data/book_scanner_database.json').success(function(data){
//        var bookDatabase = data;
//
//        //adding barcode scanner to automatically fill input fields with textbook data
//        $scope.fillInputs = function() {
//            $cordovaBarcodeScanner.scan().then(function(imageData) {
//
//                var scanResults = imageData.text;
//
//
//                for (var key in bookDatabase) {
//                    if (bookDatabase.hasOwnProperty(key)) {
//                        if (scanResults == bookDatabase[key]['upcCode']) {
//                            document.getElementById('title').value = bookDatabase[key]['title'];
//                            document.getElementById('isbn10').value = bookDatabase[key]['isbn10'];
//                            document.getElementById('isbn13').value = bookDatabase[key]['isbn13'];
//                            document.getElementById('UPC').value = bookDatabase[key]['upcCode'];
//                        }
//                    }
//                }
//
//                if (imageData.cancelled == 1) {
//                    alert("Cancelled Barcode Scan");
//                } else {
//                    console.log("Scan Not Cancelled ->" + imageData.cancelled);
//                }
//            }, function(error) {
//                console.log("An error happened -> " + error);
//            });
//        };//end of barcode scanner
//    });//end scanner book database http


        //start of the camera to take a picture of the textbook
        $scope.takePicture = function() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 400,
                targetHeight: 400,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                //Here is the image data
                $scope.textbook.imageURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occurred. Show a message to the user
            });
        }


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
