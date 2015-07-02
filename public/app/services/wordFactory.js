angular.module('scramble')
  .factory('WordFactory', function($http, $rootScope) {
    var wordURL = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=f8de9c37abe50fa5b1008000f7d0af42eca8c8c633958489a";


      var wordnik = "";

      var broadcast = function(word) {
          $rootScope.$broadcast('word.update', word);
      };

      var wordBroadcast = function(wordnik) {
          $rootScope.$broadcast('word.getWord', wordnik)
      };



  return {
    
    word: "",

    updateWord: function(letter) {
      if (letter > 64 && letter < 91) {
        letter = String.fromCharCode(letter);
        this.word += letter;
        console.log(this.word);
        broadcast(this.word);
      }
    },

    getWord: function() {
      return wordnik;
    },

    getWordnik: function() {
    $http.get(wordURL)
      .success(function(data) {
        wordnik = data.word;
        console.log(wordnik);
        wordBroadcast(wordnik);
      })
      .error(function(data, status, headers, config) {
        console.log('error! ' + data);
      });
    },


  }

})