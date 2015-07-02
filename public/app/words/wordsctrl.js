angular.module('scramble')
  .controller('WordsCtrl', function($scope, $rootScope, $modal, WordFactory) {
    var words = this;
        words.word = WordFactory.word;
        words.getWordnik = WordFactory.getWordnik;
        words.wordnik = WordFactory.getWord();
        words.getWord = WordFactory.getWord;
        words.result = null;


    $scope.$on('word.update', function(word) {
      words.word = WordFactory.word;
    })

    $scope.$on('success', function() {
      $rootScope.resultHead = "Success!" 
      $rootScope.resultMSG = "You guess correctly!";
      $scope.open();
    })

    $scope.$on('fail', function() {
      $rootScope.resultHead = "Failure!" 
      $rootScope.resultMSG = "You guess incorrectly!";
      $scope.open();
    })

    $scope.$on('word.getWord', function(wordnik) {
      words.wordnik = WordFactory.getWord();
    })

    $scope.open = function() {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'app/words/modal.html',
        controller: 'ModalController'
      });
 
      modalInstance.result.then(function () {
        console.log('success!');
         $scope.modalInstance = undefined;
      }, function () {
        console.log('closed');
         $scope.modalInstance = undefined;
      });
    };







    })

.controller('ModalController', function($scope, $modalInstance, WordFactory) {

    this.result = $scope.result ? "Success!" : "Fail";
    console.log(this.result);

    $scope.ok = function () {
        $modalInstance.close();
    };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});