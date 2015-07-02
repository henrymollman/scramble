angular.module('scramble')
  .factory('WordFactory', function($http, $rootScope) {
    var wordURL = "https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=8&api_key=f8de9c37abe50fa5b1008000f7d0af42eca8c8c633958489a";


      var wordnik = "WELCOME".split('');
      var originalWord = "";
      var count = 0;
      var result = false;

      var success = function() {
          $rootScope.$broadcast('success');
      };

      var fail = function() {
          $rootScope.$broadcast('fail');
      };

      var broadcast = function(word) {
          $rootScope.$broadcast('word.update', word);
      };

      var wordBroadcast = function(wordnik) {
          $rootScope.$broadcast('word.getWord', wordnik)
      };

      var scrambleWord = function(word) {
        var word = word.toUpperCase();
        var wordArr = word.split(''),
            len = wordArr.length;

        for (var i = 0; i < len; i++) {
          var randInt = Math.floor(Math.random() * (len - i) + i)
          var temp = wordArr[i];
          wordArr[i] = wordArr[randInt];
          wordArr[randInt] = temp;
        }

        wordnik = wordArr;
        return wordnik;
      };

      var checkWord = function() {
        if (wordnik.join('') === originalWord.toUpperCase()) {
          result = true;
          success();
        }
        else {
          result = false;
          wordnik = originalWord.toUpperCase().split('');
          wordBroadcast(wordnik);
          fail();
        }
      };

      var getResult = function() {
        return result;
      };

  return {
    
    word: "",
    getResult: getResult,

    updateWord: function(letter) {
      if (letter > 64 && letter < 91) {
        letter = String.fromCharCode(letter);
        var index = wordnik.indexOf(letter);
        if (index !== -1) {
          var temp = wordnik[count];
          wordnik[count] = wordnik[index];
          wordnik[index] = temp;
          if (count < wordnik.length -1) {
            count++;
            broadcast(this.word);
          }
          else {
            checkWord();
          }
        }
      }
    },

    getWord: function() {
      return wordnik;
    },

    getWordnik: function() {
    $http.get(wordURL)
      .success(function(data) {
        originalWord = data.word;
        wordnik = scrambleWord(originalWord);
        wordBroadcast(wordnik);
        count = 0;
      })
      .error(function(data, status, headers, config) {
        console.log('error! ' + data);
      });
    },


  }

})