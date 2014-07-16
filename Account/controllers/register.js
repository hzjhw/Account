/**
 用户注册

 @author wyj <zjut_wyj@163.com>
 @modified  wyj <2014-03-11>
 @date 2014-02-25
 **/
'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/register', {
        templateUrl: 'modules/Account/views/register.html'
    }).when('/register_pass', {
        templateUrl : 'modules/Account/views/register_pass.html'
    }).when('/register_result', {
        templateUrl : 'modules/Account/views/register_result.html'
    });
}]);
app.controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location','$q', 'API_END_POINT',
    function($scope, $rootScope, $http, $location,$q, API_END_POINT) {
    $scope.usernameRegisted = false;
    $scope.emailRegisted = false;
    $scope.cellphoneRegisted = false;
    $scope.user={
        email : ''
    }
    // 检查用户名
    $scope.checkUser = function () {
        $http.post(API_END_POINT + 'register?precheck=1', {username: $scope.user.username, password: "9999999999", email: "9999999999", cellphone: "9999999999"}).
            success(function (data) {
                $scope.usernameRegisted = false;
            }).
            error(function (data) {
                $scope.usernameRegisted = true;
                return;
            });
    }
    // 检查邮箱地址
    $scope.checkEmail = function(){
        $http.post(API_END_POINT + 'register?precheck=1', {username:"9999999999",password:"9999999999",email:$scope.user.email,cellphone:"9999999999"}).
            success(function(data){
                $scope.emailRegisted = false;
            }).
            error(function(data) {
                $scope.emailRegisted = true;
            });
    }
    // 检查手机号码
    $scope.checkCellphone = function(){
        $http.post(API_END_POINT + 'register?precheck=1', {username:"9999999999",password:"9999999999",email:$scope.user.email,cellphone:"9999999999"}).
            success(function(data){
                $scope.cellphoneRegisted = false;
            }).
            error(function(data) {
                $scope.cellphoneRegisted = true;
            });
    }
    // 表单提交
    $scope.submit = function() {
        $http.post(API_END_POINT + 'register?precheck=1', {username:$scope.user.username,password:"9999999999",email:"9999999999",cellphone:"9999999999"})
            .success(function(data){
                $http.post(API_END_POINT + 'register?precheck=1', {username:"9999999999",password:"9999999999",email:$scope.user.email,cellphone:"9999999999"})
                    .success(function(data){
                        $http.post(API_END_POINT + 'register?precheck=1', {username:"9999999999",password:"9999999999",email:"9999999999",cellphone:$scope.user.cellphone})
                            .success(function(data){
                                $rootScope.done = false;
                                $http.post(API_END_POINT + 'register', $scope.user, {
                                    withCredentials: true
                                })
                                    .success(function(data) {
                                        $rootScope.done = true;
                                        $rootScope.showMsg("注册成功！");
                                        $rootScope.register_email = $scope.user.email;
                                        $location.path('/register_pass');
                                        $(".form-horizontal").reset();
                                    })
                                    .error(function(data) {
                                        $rootScope.done = true;
                                        $rootScope.showMsg(data.err || 'illegal request', {
                                            type : 'danger'
                                        });
                                        return;
                                    });
                            })
                            .error(function(data) {
                                $rootScope.showMsg("手机号码已被注册！");
                                return;
                            });
                    })
                    .error(function(data) {
                        $rootScope.showMsg("email已被注册！");
                        return;
                    });
            })
            .error(function(data) {
                $rootScope.showMsg("用户名已被注册");
                return;
            });

    };
    // 返回登录页面
    $scope.toLogin = function(){
        $location.path('/login');
    }
    // 转到邮箱登录页面
    $scope.tomail = function(val){
        var houzhui = val.split('@')[1]; //后缀名
        if (houzhui.indexOf("gmail") != -1) { //谷歌
            window.open("http://mail.google.com");
        }
        else if (houzhui.indexOf("hotmail") != -1 || houzhui.indexOf("msn") != -1) {//微软
            window.open("http://mail.live.com");
        } else {
            window.open("http://mail." +houzhui);
        }
    }
    // 电话号码检查
    $scope.phoneNumberPattern = (function() {
        var regexp = /^\d{3,4}-?\d{7,9}$/;
        return {
            test: function(value) {
                if( $scope.requireTel === false ) return true;
                else return regexp.test(value);
            }
        };
    })();
}
]);
