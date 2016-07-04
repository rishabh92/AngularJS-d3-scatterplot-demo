var app = angular.module('d3App', ['scatterchart'])
	app.controller('d3Controller', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.showData = {
            value1: '5', value2 : '10', value3: '22',
            value4: '40', value5: '58', value6: '78',
        };
        $scope.flag = false;
        $scope.data = [];
        $scope.datafinal = function(){
        	 $scope.flag = true;
             $scope.data = [{Subject: "Subject1", Marks1: $scope.showData.value1, Marks2: parseInt($scope.showData.value1) + 4},
             				{Subject: "Subject2", Marks1: $scope.showData.value2, Marks2: parseInt($scope.showData.value2) + 2},
             				{Subject: "Subject3", Marks1: $scope.showData.value3, Marks2: parseInt($scope.showData.value3) + 5},
             				{Subject: "Subject4", Marks1: $scope.showData.value4, Marks2: parseInt($scope.showData.value4) + 6},
             				{Subject: "Subject5", Marks1: $scope.showData.value5, Marks2: parseInt($scope.showData.value5) + 1},
             				{Subject: "Subject6", Marks1: $scope.showData.value6, Marks2: parseInt($scope.showData.value6) + 8}
             			   ];
             console.log($scope.data); 
        };
        $scope.retrnflag = function(){
          if($scope.flag)
            return $scope.flag;
        };
        
	}])

