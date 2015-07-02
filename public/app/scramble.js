angular.module('scramble', [
  'ui.router',
  'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');

  $stateProvider
    .state('words', {
      url: '/words',
      templateUrl: 'app/words/words.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })

})

.run(function($state) {
  $state.go('words');
})