(function() {
  'use strict';
  angular
  .module('AUTONIC')
  .controller('FormElementCtrl', ['$scope', '$http', 'USASTATES', function($scope, $http, USASTATES){
    $scope.title = 'This is Registration view';

    $scope.countries = '';
    $scope.USAStates = USASTATES;

    $http({
      method: 'get',
      url: 'bower_components/Countries/countries.minimal.json'
    })
    .then(function(data) {
      $scope.countries = data.data;
      console.log(data);
    }, function(data, error) {
      console.log(data);
      console.log(error);
    })
  }])
})();