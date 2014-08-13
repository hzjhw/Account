/**
 * @description 会员登录
 * @controller LoginCtrl
 * @route '/login'
 * @author wyj <zjut_wyj@163.com>
 * @modified  wyj <2014-06-12>
 * @date 2014-02-20
 **/
'use strict';

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'modules/Account/views/login.html',
        controller: "LoginCtrl",
        title: "用户登录"
    })
}]);
app.controller("LoginCtrl", ["$scope", "$rootScope", "$location", "$http", "API_END_POINT",
    function ($scope, $rootScope, $location, $http, API_END_POINT) {
        // 局部变量
        var site = $location.search()['site'];
        var url = Est.isEmpty(site) ? '/' : site;
        $scope.user = {username: '', password: ''};
        if ($rootScope.isLogin) $location.path(url);
        // 表单提交
        $scope.submit = function () {
            $http.post(API_END_POINT + 'login', $scope.user).success(function (data) {
                $location.path(url);
                $rootScope.showMsg('登录成功！');
                $location.reload();
            }).error(function (data) {
                $rootScope.showMsg(data.err || '用户名或密码错误！', {
                    type: 'danger'
                });
            });
        };
    }
]);
