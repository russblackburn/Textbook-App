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