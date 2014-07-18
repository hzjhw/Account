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
var app = angular.module('formApp', modules)
    .constant('HOST', 'http://example.com:9004')
    .constant('API_END_POINT', 'http://example.com:9004/api/').
    config(['$sceProvider', '$sceDelegateProvider', '$httpProvider', function ($sceProvider,$sceDelegateProvider,$httpProvider) {
        $sceProvider.enabled(false);
        $sceDelegateProvider.resourceUrlWhitelist(['self','http://localhost:63342/**']);
        $sceDelegateProvider.resourceUrlBlacklist([]);
        $httpProvider.defaults.withCredentials = true;
    }]);
angular.module('ie7support', []).config(['$sceProvider', function($sceProvider) {
    // Completely disable SCE to support IE7.
}]);