/**
 * @description app
 * @namespace app
 * @author yongjin on 2014/7/15
 */
// app.js
// create our angular app and inject ngAnimate and ui-router
// =============================================================================
var msie = Est.msie();
var modules = [ 'ui.router', 'ngRoute', 'ngAnimate'];
if (msie === 7 || msie === 6){
    modules = ['ui.router', 'ngRoute'];
}
var app = angular.module('formApp', modules).
    config(['$sceProvider', '$sceDelegateProvider', '$httpProvider', function ($sceProvider,$sceDelegateProvider,$httpProvider) {
        $sceProvider.enabled(false);
        $sceDelegateProvider.resourceUrlWhitelist(['self','http://localhost:63342/**']);
        $sceDelegateProvider.resourceUrlBlacklist([]);
        $httpProvider.defaults.withCredentials = true;
    }]).
    config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('form', {
                url: '/form',
                templateUrl: 'form.html',
                controller: 'formController'
            })
            .state('form.profile', {
                url: '/profile',
                templateUrl: 'form-profile.html'
            })
            .state('form.interests', {
                url: '/interests',
                templateUrl: 'form-interests.html'
            })
            .state('form.payment', {
                url: '/payment',
                templateUrl: 'form-payment.html'
            });
        $urlRouterProvider.otherwise('/form/profile');
    }]).controller('formController', ['$scope',function($scope) {
        $scope.formData = {};
        $scope.processForm = function() {
            alert('awesome!');
        };
    }]);
angular.module('ie7support', []).config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE to support IE7.
}]);
