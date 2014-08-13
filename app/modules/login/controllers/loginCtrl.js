app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'AccountFactory', 'HOST', '$window','$q',
    function ($scope, $rootScope, $location, AccountFactory, HOST, $window, $q) {

        var site = $location.search()['site'];
        var url = Est.isEmpty(site) ? HOST : site;
        $scope.user = {username: '', password: ''};
        AccountFactory.isLogin().then(function(){
            $window.location.href = url;
        }, function(){
        });
        $scope.submit = function () {
            AccountFactory.login($scope.user).then(function (data) {
                $window.location.href = url;
            }, function () {
                alert('登录失败');
            });
        }
    }]);
function r() {
    var username = $("#username");
    var pass = $("#password");
    if (username.val() === "") {
        alert("请输入用户名!");
        username.focus();
        return;
    }
    if (pass.val() == "") {
        alert("请输入密码");
        return;
    }
    return true;
}
$(function () {
    $(".submit").bind('click', function () {
        r();
    })
})