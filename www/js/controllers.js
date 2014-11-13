angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $http.get('data/book_list.json').success(function(data){
      $scope.books = data;
  });

  $scope.orderProp = 'title';


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
      for (var key in books) {
        if (books.hasOwnProperty(key)) {
          if ($stateParams.textbookId == books[key]['id']) {
          	$scope.textbook = books[key];
            console.log($scope.textbook.condition);
            $scope.textbook.condition = bookCondition($scope.textbook.condition);
          }
        }
      }
  });
  $http.get('data/user_list.json').success(function(data){
      var user = data;
      for (var key in user) {
        if (user.hasOwnProperty(key)) {
          if ($scope.textbook['sellerID'] == user[key]['sellerID']) {
          	$scope.seller = user[key];
          }
        }
      }
  });
})

.controller('AccountCtrl', function($scope) {
});
