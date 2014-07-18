app.controller('LoginCtrl', ['$scope', function($scope){

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