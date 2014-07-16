/**
 * @description account 帐户管理
 * @author yongjin on 2014/6/10
 * @modified 1014/6/12
 */

app.run(['$rootScope', '$location', '$q', '$http', 'API_END_POINT',
    function($rootScope, $location, $q, $http, API_END_POINT) {
    $rootScope.current_page = '';
    /**
     * @description 登录后初始化
     * @method initAfterLogin
     * @returns {*}
     * @author wyj on 14/6/10
     * @modified 14/6/12
     */
    function initAfterLogin() {
        var deferred = $q.defer();
        $http.get(API_END_POINT + 'profile').success(function (data) {
            $rootScope.user = data.username;
            $rootScope.sessionuser = data;
            $rootScope.usertype = {'00':'免费版','01':'展示版', '02':'营销版','03':'策划版' };
            deferred.resolve('profile');
        });
        $http.get(API_END_POINT + 'enterprise').success(function (data) {
            $rootScope.enterprise = data;
            deferred.resolve('enterprise');
        });
        return deferred.promise;
    }

    /**
     * @description 判断是否已登录
     * @method isLogin
     * @returns {*}
     * @author wyj on 14/6/12
     */
    function isLogin() {
        var deferred = $q.defer();
        $http.get(API_END_POINT).success(function (data) {
            if (!data || !data.isLogin) {
                deferred.reject('not yet');
                $rootScope.isLogin = false;
                // $location.path('/login');
            } else {
                deferred.resolve('okay');
                $rootScope.isLogin = true;
                initAfterLogin();
            }
        }).error(function (data) {
            deferred.resolve('network is not fine');
            $rootScope.isLogin = false;
            $location.path('/login');
        });
        return deferred.promise;
    }

    // 监听路由改变时是否登录状态
    $rootScope.$on('$routeChangeStart', function loginCheck() {
        var deferred = $q.defer();

        $http.get(API_END_POINT).success(function (data) {
            if (!data || !data.isLogin) {
                deferred.reject('not yet');
                $rootScope.isLogin = false;
                if (($location.path() !== '/login') && ($location.path() !== '/register_pass') && ($location.path() !== '/register_result') && ($location.path() !== '/register_result') && ($location.path() !== '/register') && !$rootScope.isLogin) {
                    $location.path('/login');
                }
                if (($location.path() === '/login') && $rootScope.isLogin) {
                    $location.path('/');
                }
            } else {
                deferred.resolve('okay');
                $rootScope.isLogin = true;
                initAfterLogin();
            }
        }).error(function (data) {
            deferred.resolve('network is not fine');
            $rootScope.isLogin = false;
            $location.path('/login');
        });

        return deferred.promise;
    });
    $location.path($location.path());

    // 退出登录
    $rootScope.logout = function () {
        if ($rootScope.isLogin) {
            $http.post(API_END_POINT + 'logout').success(function (data) {
                $rootScope.showMsg(data.msg || '您已成功登出');
                setTimeout(function () {
                    $rootScope.sessionuser = null;
                    $rootScope.enterprise = null;
                    $rootScope.user = null;
                    //$route.reload();
                    $location.path('/login');
                }, 100);
            }).error(function (data) {
                $rootScope.showMsg(data.err || '登出失败！', {
                    type: 'danger'
                });
            });
        }
    };
}]);