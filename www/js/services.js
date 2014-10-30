angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Textbooks', function($http) {
  // Might use a resource here that returns a JSON array
  var textbooks = [];
  $http.get('data/book_list.json').success(function(data){
      textbooks = data;
      // console.log(data);
  });
  // Some fake testing data

  // console.log(textbooks[3]);
  return {
    all: function() {
      return textbooks;
    },
    get: function(textbookId) {
      // Simple index lookup
      return textbooks[textbookId];
    }
  };
});
