
(function() { //wrapping the app
  var app = angular.module('myChatApp', ['btford.socket-io']);

  app.factory('socket', function(socketFactory) {
    var socket = socketFactory();
    //socket.forward('chat message', $scope);
    return socket;
  })

  app.controller('ChatController', function($scope, $http, socket) {
    this.registered = false;
    this.people = people;
    this.chat = '';
    this.user = userInfo;

    socket.on('chat message', function (msg) {
      $scope.msg = msg;
    });

    this.setReg = function() {
      this.registered = true;
      $http.get('http://localhost:3000/chat').success(function(res) {
          $scope.msg = res;
      });
    };

    this.isReg = function() {
      return this.registered;
    };

    this.sendMsg = function() {
      $scope.msg.push({name: this.user['username'], chat: " " + this.chat});
      $http.post('http://localhost:3000/chat', {name: this.user['username'], chat: this.chat});
      this.chat = '';
      socket.emit('chat message', $scope.msg);
    };

  });

  app.controller('NameController', function() {
  	this.name = '';

  	this.setName = function() {
  		people.push({name: this.name});
      userInfo['username'] = this.name;
  		this.name = '';
  	};

  });

  var people = [ 
  	{name: 'Dillon'},
  	{name: 'James'},
  	{name: 'Iris'},
  	{name: 'Cai'}
  ];

  var userInfo = {};

  app.directive('nameForm', function() {
    return {
      restrict: "E",
      templateUrl: '/js/components/name-form.html'
    };
  });

  app.directive('chatRoom', function() {
    return {
      restrict: "E",
      templateUrl: '/js/components/chat-room.html'
    };
  });

  app.directive('membersList', function() {
    return {
      restrict: "E",
      templateUrl: '/js/components/members-list.html'
    };
  });

})();
