'use strict';

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/personal', {
        templateUrl: 'modules/Account/views/personal.html'
    }).
        when('/entinfo', {
            templateUrl: 'modules/Account/views/ent.html'
        }).
        when('/password', {
            templateUrl: 'modules/Account/views/password.html'
        })
        .when('/config', {
            templateUrl: 'modules/Account/views/config.html'
        });
}]);

app.controller('UserInfoCtrl',['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.submit = function () {
        $rootScope.ajax({
            method: 'PUT',
            url: 'profile',
            data: $rootScope.sessionuser,
            success: function(){
                $rootScope.showMsg("修改成功!", { time: 500 });
            }
        });
    }
}]);
app.controller('WhMemberCtrl', ['$scope', '$http', 'API_END_POINT', '$rootScope',
    function($scope, $http, API_END_POINT, $rootScope) {
    $scope.whmember = $rootScope.whmember;
    if ($scope.whmember == undefined) {
        $http.get(API_END_POINT + 'whmember')
            .success(function (data) {
                if (data == undefined) {
                    var user = $rootScope.sessionuser;
                    var ent = $rootScope.enterprise;
                    data = {
                        name: user.name,
                        entname: ent.name,
                        phone: user.phone
                    };
                }
                $scope.whmember = data;
            })
            .error(function (data) {
                var user = $rootScope.sessionuser;
                var ent = $rootScope.enterprise;
                data = {
                    name: user.name,
                    entname: ent.name,
                    phone: user.phone
                };
                $scope.whmember = data;
            });
    }
    $scope.submitWhMember = function () {
        var member_id = $scope.whmember.member_id;
        if (member_id == undefined) {
            $http.post(API_END_POINT + 'whmember', $scope.whmember)
                .success(function (data) {
                    $rootScope.showMsg("修改成功", {
                        time : 500
                    });
                    $scope.whmember.member_id = data.member_id;
                })
                .error(function (data) {
                });
        } else {
            $http.put(API_END_POINT + 'whmember', $scope.whmember)
                .success(function (data) {
                    $rootScope.showMsg("修改成功", {
                        time : 500
                    });
                })
                .error(function (data) {
                });
        }
    }
}]);
app.controller('passwordCtrl', ['$scope', '$rootScope', '$http', 'API_END_POINT',
    function($scope, $rootScope, $http, API_END_POINT) {
    $scope.submitPassword = function () {
        if ($scope.new_password1 != $scope.new_password2) {
            alert('两次密码输入不一样');
            return;
        } else {
            $http.put(API_END_POINT + 'profile/password', {
                "old_password": $scope.old_password,
                "password": $scope.new_password1
            }).success(function (data) {
                $rootScope.open('修改成功!');
            }).error(function (data) {
                $rootScope.open('修改失败,原密码错误!');
            })
        }
    }
}]);
app.controller('EntInfoCtrl', ['$scope','$http','API_END_POINT', '$rootScope',
    function($scope,$http,API_END_POINT, $rootScope) {
    $scope.enterprise = $rootScope.enterprise;
    var industry = [
        {name: '安全、防护'},
        {name: '办公、文教'},
        {name: '包装'},
        {name: '传媒、广电'},
        {name: '代理'},
        {name: '电工电器'},
        {name: '电子元器件'},
        {name: '二手设备转让'},
        {name: '纺织、皮革'},
        {name: '服饰'},
        {name: '服装'},
        {name: '化工'},
        {name: '环保'},
        {name: '机械及行业设备'},
        {name: '加工'},
        {name: '家居用品'},
        {name: '家用电器'},
        {name: '建筑、建材'},
        {name: '交通运输'},
        {name: '精细化学品'},
        {name: '库存积压'},
        {name: '礼品、工艺品、饰品'},
        {name: '能源'},
        {name: '农业'},
        {name: '汽摩及配件'},
        {name: '商务服务'},
        {name: '食品、饮料'},
        {name: '数码、电脑'},
        {name: '通信产品'},
        {name: '玩具'},
        {name: '五金、工具'},
        {name: '项目合作'},
        {name: '橡塑'},
        {name: '冶金矿产'},
        {name: '医药、保养'},
        {name: '仪器仪表'},
        {name: '印刷'},
        {name: '运动、休闲'},
        {name: '照明工业'},
        {name: '纸业'},
        {name: '原材料'},
        {name: '安防'},
        {name: '加工定制'},
        {name: '物流招聘'},
        {name: '展会广告'}
    ]
    var businessType = [{name:'生产加工'},{name:'经营批发'},{name:'招商代理'},{name:'商业服务'},{name:'其它'}]
    var entType = [{name:'个人用户'},{name:'企业单位'},{name:'个体经营'},{name:'事业单位或者团体'}]
    $scope.industryOption = industry;
    $scope.businessTypeOption = businessType;
    $scope.entTypeOption = entType;
    $scope.industrySelect ='展会广告';
    if ($scope.enterprise == undefined) {
        $http.get(API_END_POINT + 'enterprise')
            .success(function (data) {
                $scope.enterprise = data;
            })
            .error(function (data) {
                //alert('读取错误');
            });
    }

    $scope.tabs = [
        { title: "公司简介", content: "modules/Account/views/enterpriseinfo.html"},
        { title: "技术实力", content: "modules/Account/views/technic.html"},
        { title: "网络工商标识", content: "modules/Account/views/gsbs.html"}
    ];
    $scope.navType = 'pills';

    $scope.openDateTimePick = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    }
    $scope.editorOptions = {
        language: 'zh-cn'
    };
    $http.get(API_END_POINT + 'ap')
        .success(function (data) {
            $scope.technic = data;
        })
        .error(function (data) {
            //alert('读取错误');
        });
    $scope.submitTechnic = function () {
        $rootScope.ajax({
            method: 'PUT',
            url: 'ap',
            data: $scope.technic,
            success: function(){
                $rootScope.open("修改成功");
            }
        });
    }
    $scope.submitGsbs = function () {
        $rootScope.ajax({
            method: 'PUT',
            url: 'enterprise',
            data: $scope.enterprise,
            success: function(){
                $rootScope.enterprise = $scope.enterprise;
                $rootScope.open("修改成功");
            }
        });
    }
    $scope.submitInfo = function () {
        $rootScope.ajax({
            method: 'PUT',
            url: 'enterprise',
            data: $scope.enterprise,
            success: function(){
                $rootScope.enterprise = $scope.enterprise;
                $rootScope.open("修改成功");
            }
        });
    }
    $scope.submitEnt = function () {
        $rootScope.ajax({
            method: 'PUT',
            url: 'enterprise',
            data: $scope.enterprise,
            success: function(){
                $rootScope.enterprise = $scope.enterprise;
                $rootScope.open("修改成功");
            }
        });
    }
    //图片上传
    $scope.openFileDialog = function(enterprise){
        $rootScope.openFileDialog(function(select_list){
            $scope.enterprise.logo = select_list[0].server_path;
            $rootScope.enterprise.logo = select_list[0].server_path;
        });
        return false;
    };
}]);

