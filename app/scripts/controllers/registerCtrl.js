/**
 * @description formController
 * @namespace formController
 * @author yongjin on 2014/7/18
 */
app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('form', {
            url: '/form',
            templateUrl: 'views/register/form.html',
            controller: 'FormCtrl'
        })
        .state('form.profile', {
            url: '/profile',
            controller: 'ProFileCtrl',
            templateUrl: 'views/register/form-profile.html'
        })
        .state('form.interests', {
            url: '/interests',
            controller: 'InterestsCtrl',
            templateUrl: 'views/register/form-interests.html'
        })
        .state('form.payment', {
            url: '/payment',
            controller: 'PaymentCtrl',
            templateUrl: 'views/register/form-payment.html'
        });
    $urlRouterProvider.otherwise('/form/profile');
}]);


app.controller('FormCtrl', ['$scope',function($scope) {
    $scope.formData = {};
    $scope.emailFocus = false;
    $scope.processForm = function() {
        alert('awesome!');
    };
}]);
/**
 * @description 设置登录名页面
 */
app.controller('ProFileCtrl', ['$scope', function($scope){

}]);
/**
 * @description 填写帐户信息页面
 */
app.controller('InterestsCtrl', ['$scope', function($scope){

}]);
/**
 * @description 注册成功页面
 */
app.controller('PaymentCtrl', ['$scope', function($scope){

}]);