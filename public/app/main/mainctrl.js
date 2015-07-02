angular.module('scramble')
  .controller('MainCtrl', function($http, $scope, WordFactory) {
    var main = this;
        main.keyPress = keyPress;


      function keyPress(e) {
        WordFactory.updateWord(e);
      }

    })