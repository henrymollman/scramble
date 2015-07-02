angular.module('scramble')
  .controller('WordsCtrl', function($scope, WordFactory) {
    var words = this;
        words.word = WordFactory.word;
        words.getWordnik = WordFactory.getWordnik;
        words.wordnik = WordFactory.wordnik;
        words.getWord = WordFactory.getWord;


    $scope.$on('word.update', function(word) {
      console.log(word);
      console.log('update word!')
      words.word = WordFactory.word;
    })

    $scope.$on('word.getWord', function(wordnik) {
      console.log('update wordnik! ')
      words.wordnik = WordFactory.getWord();
      console.dir(words.wordnik);
    })






    })