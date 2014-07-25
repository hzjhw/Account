/**
 * @description config
 * @namespace config
 * @author yongjin on 2014/7/18
 */
app.constant('HOST', 'http://example.com:9004')
    .constant('API_END_POINT', 'http://example.com:9007/api/')
    .constant('SOURCE_URL', 'http://agent.example.com/')
    .constant('MOBILE_DESIGN_URL', 'http://mviews.example.com:4002')
    .constant('WEB_DESIGN_URL', 'http://views.example.com:4000')
    .constant('WEBSITE_URL', 'http://example.com:9006/')
    .config(['$sceProvider', '$sceDelegateProvider', '$httpProvider', 'SOURCE_URL', 'API_END_POINT',
        function ($sceProvider,$sceDelegateProvider,$httpProvider,SOURCE_URL, API_END_POINT) {
            $sceProvider.enabled(false);
            $sceDelegateProvider.resourceUrlWhitelist(['self',API_END_POINT + '**',SOURCE_URL + '**']);
            $sceDelegateProvider.resourceUrlBlacklist([]);
            $httpProvider.defaults.withCredentials = true;
        }]);
app.run(['$rootScope', 'HOST', 'API_END_POINT', 'SOURCE_URL', 'WEB_DESIGN_URL', 'WEBSITE_URL', 'MOBILE_DESIGN_URL',
    function($rootScope, HOST, API_END_POINT, SOURCE_URL, WEB_DESIGN_URL, WEBSITE_URL, MOBILE_DESIGN_URL){
        $rootScope.HOST = HOST;
        $rootScope.API_END_POINT = API_END_POINT;
        $rootScope.SOURCE_URL = SOURCE_URL;
        $rootScope.WEB_DESIGN_URL = WEB_DESIGN_URL;
        $rootScope.WEBSITE_URL = WEBSITE_URL;
        $rootScope.MOBILE_DESIGN_URL = MOBILE_DESIGN_URL;
    }]);