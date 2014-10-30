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

.factory('Book', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var books = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];
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
