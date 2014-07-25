app.controller('LoginCtrl', ['$scope', 'AccountFactory','HOST','$window', function($scope, AccountFactory, HOST, $window){
    $scope.user = {username: '',password: ''};
    $scope.submit = function(){
        AccountFactory.login($scope.user).then(function(data){
            $window.location.href=HOST;
        }, function(){
            alert('登录失败');
        });
    }
}]);


function r() {
    var username=$("#username") ;
    var pass=$("#password");
    if (username.val() === "") {
        alert("请输入用户名!");
        username.focus();
        return;
    }
    if (pass.val()=="") {
        alert("请输入密码");
        return;
    }
    return true;
}
$(function(){
    $(".submit").bind('click', function(){
        r();
    })
})