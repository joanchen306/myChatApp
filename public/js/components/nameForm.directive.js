'use strict';

var nameForm = function(){
  return {
    restrict: "E",
    replace: true,
    scope:{
    },
    template:`
      <form name="nameForm" class="form-horizontal" ng-submit="nameForm.$valid && nameCtrl.setName()" novalidate>
        <div class="form-group">
          <label for="inputName" class="col-xs-offset-2  control-label col-xs-2">Please Input a Name</label>
          <div class="col-xs-5">
              <input ng-model="nameCtrl.name" type="name" d="inputName" placeholder="Name" required>
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-offset-8 col-xs-10">
            <button type="submit" class="btn btn-primary" ng-click="nameForm.$valid && chat.setReg()">Start Chatting</button>
          </div>
        </div>
      </form>
      `
  }
};

module.exports = nameForm;