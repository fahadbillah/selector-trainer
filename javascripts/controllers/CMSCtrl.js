(function() {
	'use strict';
	angular
	.module('AUTONIC')
	.controller('CMSCtrl', ['$scope', '$window', function($scope,$window){
		$scope.title = 'This is Content Management view';

    $scope.lend = {
      user: {},
      books: []
    }

    $scope.userFormSubmit = function(user) {
      user._id = Math.floor(Math.random()*10000000000000000);
      $scope.userList.push(user);
      $window.localStorage.setItem('userList', stringify($scope.userList));
      $scope.user = {};
      $scope.userForm.$setPristine();
    };

    var getUserList = function() {
      return parse($window.localStorage.getItem('userList'));
    };

    $scope.bookFormSubmit = function(book) {
      book._id = Math.floor(Math.random()*10000000000000000);
      $scope.bookList.push(book);
      $window.localStorage.setItem('bookList', stringify($scope.bookList));
      $scope.book = {};
      $scope.bookForm.$setPristine();
    };

    var getBookList = function() {
      return parse($window.localStorage.getItem('bookList'));
    };

    $scope.lendFormSubmit = function(lend) {
      if (lend.user === {} || lend.books.length === 0) {
        alert('select user & books');
        return false;
      }

      lend._id = Math.floor(Math.random()*10000000000000000);
      $scope.lendList.push(lend);
      $window.localStorage.setItem('lendList', stringify($scope.lendList))
    };

    var getlendList = function() {
      return parse($window.localStorage.getItem('lendList'));
    };

    var stringify = function(data) {
      return JSON.stringify(data);
    };

    var parse = function(data) {
      return JSON.parse(data);
    };

    $scope.lendSelection = function(book, user) {
      if (!!book) {
        $scope.lend.books.push(book);
        $scope.searchBook = '';
      }
      if (!!user) {
        $scope.lend.user = user;
        $scope.searchUser = '';
      }
    }

    $scope.bookList = getBookList() || [];
    $scope.userList = getUserList() || [];
    $scope.lendList = getlendList() || [];
	}])
})();