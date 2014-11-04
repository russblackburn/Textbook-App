angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
  $http.get('data/book_list.json').success(function(data){
      $scope.books = data;
  });

  $scope.orderProp = 'dateListed';
})

.controller('SearchCtrl', function($scope, Textbooks) {
  $scope.textbooks = Textbooks.all();
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