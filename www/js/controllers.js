angular.module('starter.controllers', [])

    //injected $cordovaBarcodeScanner service
.controller('DashCtrl', function($scope, $http, $cordovaBarcodeScanner) {
  $http.get('data/book_list.json').success(function(data){
      $scope.books = data;
  });

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
  $scope.submit = function(tbForm){
      $scope.showValidationMessages = true;

      if(!tbForm.$invalid){
          console.log("TB",tbForm);
      }

  };
  $scope.updateCondition = function(tb){
      tb.condition.description = $scope.conditions[tb.condition.value -1].description;
      console.log("TB", tb);
  };
})

.controller('TextbookDetailCtrl', function($http, $scope, $stateParams, Textbooks) {
  // var textbooks = Textbooks.all();
  // console.log(textbooks[1]);
  // $scope.textbook = textbooks[2];
  $http.get('data/book_list.json').success(function(data){
      var books = data;
      for (var key in books) {
        if (books.hasOwnProperty(key)) {
          if ($stateParams.textbookId == books[key]['id']) {
          	console.log(books[key]);
          	$scope.textbook = books[key];
          }
        }
      }
  });
  $http.get('data/user_list.json').success(function(data){
      var user = data;
      for (var key in user) {
        if (user.hasOwnProperty(key)) {
          if ($scope.textbook['sellerID'] == user[key]['sellerID']) {
          	console.log(user[key]);
          	$scope.seller = user[key];
          }
        }
      }
  });
})

.controller('AccountCtrl', function($scope) {
});
