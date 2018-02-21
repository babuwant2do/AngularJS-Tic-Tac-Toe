/**
 * this part controls the Game page
 */

angular.module('ticTacToeApp').controller('GameBoardController', function ($scope, Players, $uibModal, $timeout) {

    // console.warn(Constants.CellClass.player1);
    $scope.players = Players.getPlayerList();
    $scope.player1 = null;
    $scope.player2 = null;

    $scope.isMatchStarted = false;
    
    $scope.alerts = [];
    
    $scope.resetBoard = function () {
        $scope.player1 = null;
        $scope.player2 = null;
    }

    $scope.isPlayersSelected = function(){
      if($scope.player1  && $scope.player2 ){
        return true;
      }
      return false;
    }
    

    // ]]]]]]]]]]
      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      addAlert = function(type, message) {
        $scope.alerts.push({type: type, msg: message});
      };

      // To open the Modal: game start/end confirmation 
      var modalData = "modal data x";
      $scope.open = function() {
        var modalInstance =  $uibModal.open({
          templateUrl: "entities/modal/confirmationModal.html",
          controller: "confirmationModalCtrl",
          size: '',
          resolve: {
            data: function () {
              return $scope.isMatchStarted ? "Do you want to End Game?" : "Do you want to Start Game?";
            }
          }
        });
        
        modalInstance.result.then(function(response){
            $scope.result = $scope.isMatchStarted ? "Game Ended!" : "Game Started!";
            $scope.isMatchStarted = ! $scope.isMatchStarted;
            $scope.$broadcast("GAME_START_BROADCAST", {gameStarted: $scope.isMatchStarted});
        });
        
      };

      // timer: not used ... 
        $scope.startCount = 0;  
        $scope.startTimeout = function () {  
            $scope.startCount = $scope.startCount + 1;  
            if($scope.startCount < 10){
                mytimeout = $timeout($scope.startTimeout, 1000);  
            }
        }  
        // $scope.startTimeout();  
    
        $scope.stopTimeout = function () {  
            $scope.startCount = 0;
            $timeout.cancel(mytimeout);  
            alert("Timer Stopped");  
        }  

        // eVent handler

        $scope.$on("GAME_CELL_CLICKED", function(evt,data){ 
            // debugger;
            evt.stopPropagation();

            console.log("******"+evt +" ::: "+data);
            // $scope.startTimeout();
            // evt.stopPropagation();
            $scope.$broadcast("GAME_CELL_CLICKED_BROADCAST", data);
        }); 
        
        
        $scope.$on("GAME_RESULT_EMMIT", function(evt,data){ 
          // debugger;
          console.log("******@#####"+evt.name +" ::: "+data.winner);
          evt.stopPropagation();

          var msg ;
          var className;
          if(data.result){

            var winner = data.winner? $scope.player1 : $scope.player2;
            var looser = !data.winner? $scope.player1 : $scope.player2;
            msg = winner + " WON !!";
            className = data.winner? 'player-1-cell': 'player-2-cell';
            Players.updateResult(winner, looser)
          }else{
            msg = "Match Draw";
            className = 'result-draw';
            Players.updateResult($scope.player1, $scope.player2, true);
          }
          $scope.$broadcast("GAME_RESULT_BROADCAST", {result: msg, class: className});
      }); 
})

  