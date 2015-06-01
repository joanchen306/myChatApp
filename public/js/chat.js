'use strict';

var angular = require('angular');
var nameForm = require('./components/nameForm.directive');

(function() { //wrapping the app
  var app = angular.module('myChatApp', [ 'ngMaterial' ]);

  app.controller('ChatController', function($scope, $http) {
  	this.title = 'Welcome to myChatApp'
    this.registered = false;
    this.people = people;

  	$http.get('http://localhost:3000/chat/')
  	  .success(function(res) {
  	  	$scope.chatMsgs = res;
  	  })

    this.setReg = function() {
      this.registered = true;
    };

    this.isReg = function() {
      return this.registered;
    };
  });

  app.controller('NameController', function() {
  	this.name = '';

  	this.setName = function() {
  		people.push({name: this.name});
  		this.name = '';
  	};

  });

  var people = [ 
  	{name: 'Dillon'},
  	{name: 'James'},
  	{name: 'Iris'},
  	{name: 'Cai'}
  ];

  app.directive('nameForm', nameForm);

})();
