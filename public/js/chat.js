
(function() { //wrapping the app
  var app = angular.module('myChatApp', ['btford.socket-io']);

  app.factory('socket', function(socketFactory) {
    var socket = socketFactory();
    //socket.forward('chat message', $scope);
    return socket;
  });


  app.controller('ChatController', function($scope, $http, socket) {
    this.registered = false;
    this.chat = '';
    this.user = userInfo;

    socket.on('chat message', function (msg) {
      $scope.msg = msg;
      $http.get('http://localhost:3000/chat').success(function(res) {
          $scope.msg = res;
      });
    });

    socket.on('people', function (ppl) {
      $scope.people = ppl;
    });

    socket.on('height', function (h) {
      document.getElementById("panel01").scrollTop = h;
    });

    socket.on('user_disconnect', function(ann) {
      $scope.msg.push(ann);
      var h = document.getElementById("panel01").scrollHeight + 60;
      document.getElementById("panel01").scrollTop = h;
      socket.emit('height', h);
    });

    this.setReg = function() {
      this.registered = true;
    };

    this.isReg = function() {
      return this.registered;
    };

    this.sendMsg = function() {
      var ann = {name: this.user['username'], chat: " " + this.chat}
      $scope.msg.push(ann);
      $http.post('http://localhost:3000/chat', ann);
      socket.emit('chat message', $scope.msg);
      this.chat = '';
      var h = document.getElementById("panel01").scrollHeight + 60;
      document.getElementById("panel01").scrollTop = h;
      socket.emit('height', h);
    };
  });

  app.controller('NameController', function($scope, $http, socket) {
  	this.name = '';

  	this.setName = function() {
      userInfo['username'] = this.name;
      $scope.people.push(this.name);
      socket.emit('people', $scope.people);
      $scope.msg.push({name: "Announcement", chat: this.name + " has join the chat"});
      $http.post('http://localhost:3000/chat', {name: "Announcement", chat: this.name + " has join the chat"});
  		socket.emit('chat message', $scope.msg);
      var h = document.getElementById("panel01").scrollHeight + 60;
      document.getElementById("panel01").scrollTop = h;
      socket.emit('height', h);
      this.name = '';
  	};

  });

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
