'use strict';

var nameForm = function(){
  return {
    restrict: "E",
    replace: true,
    scope:{
    },
    template:`
      <form name="nameForm" ng-controller="NameController as nameCtrl" ng-submit="nameForm.$valid && nameCtrl.setName()" novalidate>
        <div>
          <label for="inputName" >Please Input a Name</label>
          <div class="col-xs-5">
              <input ng-model="nameCtrl.name" type="name" d="inputName" placeholder="Name" required>
          </div>
        </div>
        <div>
          <div>
            <button type="submit" ng-click="nameForm.$valid && chat.setReg()">Start Chatting</button>
          </div>
        </div>
      </form>
      `
  }
};

module.exports = nameForm;