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

.controller('TextbookDetailCtrl', function($scope, $stateParams, Textbooks) {
  $scope.textbooks = Textbooks.get($stateParams.textbookId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('BookDetailCtrl', function($scope, $stateParams, Book) {
  $scope.book = Book.get($stateParams.bookId);
  console.log($scope.book);
});