angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Textbooks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var textbooks = [
    { id: 0, name: 'Astronomy' },
    { id: 1, name: 'PHP' },
    { id: 2, name: 'Javascript for Dummys' },
    { id: 3, name: 'HTML and CSS basics' }
  ];

  return {
    all: function() {
      return textbooks;
    },
    get: function(textbookId) {
      // Simple index lookup
      return textbooks[textbookId];
    }
  };
})

.factory('Book', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  $http.get('data/book_list.json').success(function(data){
    var books = data;
  })
  console.log(books);
  return {
    all: function() {
      return books;
    },
    get: function(bookId) {
      // Simple index lookup
      return books[bookId];
    }
  }
});
