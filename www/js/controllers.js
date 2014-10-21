angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
        $http.get('book_list.json').success(function(data){
            $scope.books = data;
        });

        $scope.orderProp = 'dateListed';
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});