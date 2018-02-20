angular.module('ticTacToeApp').controller('confirmationModalCtrl', 
function($scope, $uibModalInstance, data) {
    $scope.data1 = data;
    $scope.ok = function(){
      $uibModalInstance.close("Ok "+data);
    }

    $scope.restart = function(){
        $uibModalInstance.close("RESTART");
      }
     
    $scope.cancel = function(){
      $uibModalInstance.dismiss();
    } 
    
  });