'use strict';
var app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval){
    $scope.keyword;
    $scope.rolling;
    $scope.loading;

    $scope.getImage = function() {
        $scope.loading = true;
        $http.get("http://localhost:8080/getimage/" + $scope.keyword).then(function(res){
            $scope.image = res.data;
            $scope.loading = false;
        });
    };

    $scope.start = function() {
        $scope.getImage();
        $scope.rolling = $interval($scope.getImage, 5000);
    };

    $scope.stopRolling = function() {
        if ($scope.rolling) {
            $interval.cancel($scope.rolling);
            $scope.rolling = undefined;
        }
    }
}]);