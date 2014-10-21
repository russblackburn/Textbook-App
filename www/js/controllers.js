angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('SearchCtrl', function($scope, Textbooks) {
  $scope.textbooks = Textbooks.all();
})

.controller('TextbookDetailCtrl', function($scope, $stateParams, Textbooks) {
  $scope.textbooks = Textbook.get($stateParams.textbookId);
})

.controller('AccountCtrl', function($scope) {
});
