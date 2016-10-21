var app = angular.module('app', ['ui.router', 'app.factory', 'startup', 'options', 'results', 'scores', 'signin', 'signup', 'savedSearches']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('startup', {
      url: '/startup',
      templateUrl: 'app/startup/startup.html',
      controller: 'startupController',
      controllerAs: 'vm'
    })
    .state('options', {
      url: '/options',
      templateUrl: 'app/options/options.html',
      controller: 'optionsController',
      controllerAs: 'vm'
    })
    .state('results', {
      url: '/results',
      views: {
        '': {
          templateUrl: 'app/results/results.html',
          controller: 'resultsController',
          controllerAs: 'vm'
        },
        'scores@results': {
          templateUrl: 'app/results/scores.html',
          controller: 'scoresController',
          controllerAs: 'vm'
        }
      }
    })
    .state('auth', {
      url: '/',
      views: {
        '': {
          templateUrl: 'app/auth/auth.html'
        },
        'signin@auth': {
          templateUrl: 'app/auth/signin.html',
          controller: 'signinController',
          controllerAs: 'vm'
        },
        'signup@auth': {
          templateUrl: 'app/auth/signup.html',
          controller: 'signupController',
          controllerAs: 'vm'
        }
     }
   })
   .state('savedSearches', {
     url: '/savedSearches',
     templateUrl: 'app/savedSearches/savedSearches.html',
     controller: 'savedSearchesController',
     controllerAs: 'vm'
   });

});
