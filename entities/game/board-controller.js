var ticTacToeApp = angular.module('ticTacToeApp')

// ticTacToeApp.constant('Constants', {
//     CellClass: {
//         default: 'free-cell',
//         player1: 'player-1-cell',
//         player2: 'player-2-cell',
//         winning: 'winning-cell'
//     }
// }); 

//TODO: if we have time try to create a directive for board.
ticTacToeApp.controller('BoardController', function ($scope, Players, $uibModal, $timeout) {

    // console.warn(Constants.CellClass.player1);
    $scope.players = Players.getPlayerList();
    $scope.player1 = null;
    $scope.player2 = null;

    
    $scope.alerts = [];
    $scope.currentPlayer = true
    $scope.winner = null

    $scope.board = [
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}],
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}],
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}]
    ]

    $scope.buttonBoardCellClick = function(row,col){
        console.log("Clicked");
        console.log(row +' : '+col);
        
        

        if($scope.winner !== null){
            console.warn("Winner Alreday defined, restar for new game!");
            return;
        }

        if(isBoardPlayableFunc()){
            if(angular.isUndefined($scope.board[row][col]) || $scope.getCellValue(row, col) === '-'){
                updateCell(row, col, ($scope.currentPlayer? 'O' : 'X'), $scope.currentPlayer? 'player-1-cell' : 'player-2-cell')
                findWinner();
                if($scope.winner === null && !isBoardPlayableFunc()){
                    console.warn("Game Drawn!!");
                }
                $scope.currentPlayer = !$scope.currentPlayer;
            }else{
                console.warn("Not a free cell, try another!!");
                addAlert("danger", "Not a free cell, try another!!");
            }
        }else{
            console.warn("The game voard is not playable!");
            addAlert(null, "Not a free cell, try another!!");
        }
    }
    

    $scope.resetBoard = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                updateCell(i,j, '-', 'free-cell');
            }
        }
        $scope.currentPlayer = !$scope.currentPlayer
        $scope.winner = null
        isBoardPlayable = true

        $scope.player1 = null;
        $scope.player2 = null;
    }


    
    function findWinner(){
        for (var i = 0; i < 3; i++) {
            //row wise 
            if($scope.getCellValue(i, 0) !== '-' && $scope.getCellValue(i, 0) === $scope.getCellValue(i, 1) && $scope.getCellValue(i, 0) === $scope.getCellValue(i, 2)){
                celebrateWinning([{row:i, col: 0}, {row:i, col: 1},{row:i, col: 2}]);
                $scope.winner = $scope.currentPlayer? "Player 1 [O]" : "Player 2 [X]";       
            }
            //col wide
            if($scope.getCellValue(0,i) !== '-' && $scope.getCellValue(0,i) === $scope.getCellValue(1,i) && $scope.getCellValue(0,i) === $scope.getCellValue(2,i)){
                celebrateWinning([{row:0, col: i}, {row:1, col: i},{row:2, col: i}]);
                $scope.winner = $scope.currentPlayer? "Player 1 [O]" : "Player 2 [X]";       
            }
        }

        if($scope.getCellValue(1,1) !== '-' && $scope.getCellValue(1,1) === $scope.getCellValue(0,0) && $scope.getCellValue(1,1) === $scope.getCellValue(2,2)){
            celebrateWinning([{row:1, col: 1}, {row:0, col: 0},{row:2, col: 2}]);
            $scope.winner = $scope.currentPlayer? "Player 1 [O]" : "Player 2 [X]";       
        }else if($scope.getCellValue(1,1) !== '-' && $scope.getCellValue(1,1) === $scope.getCellValue(0,2) && $scope.getCellValue(1,1) === $scope.getCellValue(2,0)){
            celebrateWinning([{row:1, col: 1}, {row:0, col: 2},{row:2, col: 0}]);
            $scope.winner = $scope.currentPlayer? "Player 1 [O]" : "Player 2 [X]";       
        }
        if($scope.winner){
            addAlert("success", $scope.winner + "WINS!!");
        }

    }

    function isBoardPlayableFunc(){
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if($scope.getCellValue(i, j) === '-'){
                    // isBoardPlayable = true;
                    return true;
                }
            }
        }
        return false;
    }

    $scope.getCellValue = function (row, col){
        return ($scope.board[row][col]).value;
    }

    $scope.getCellClass = function (row, col){
        return ($scope.board[row][col]).class;
    }

    function updateCell(row, col, value, classVal){
        setCellValue(row, col, value);
        setCellClass(row, col, classVal);
        // ($scope.board[row][col]).value = value;
        // ($scope.board[row][col]).class = classVal;
    }

    function setCellValue(row, col, value){
        ($scope.board[row][col]).value = value;
    }

    function setCellClass(row, col, classVal){
        ($scope.board[row][col]).class = classVal;
    }

    function celebrateWinning(indexArr){
        if (indexArr instanceof Array) {
            indexArr.forEach(element => {
                setCellClass(element.row, element.col, 'winning-cell');
            });
        }
    }

    // ]]]]]]]]]]
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      addAlert = function(type, message) {
        $scope.alerts.push({type: type, msg: message});
      };

      // modal 
      var modalData = "modal data x";
      $scope.open = function() {
        var modalInstance =  $uibModal.open({
          templateUrl: "entities/modal/confirmationModal.html",
          controller: "confirmationModalCtrl",
          size: '',
          resolve: {
            data: function () {
              return modalData;
            }
          }
        });
        
        modalInstance.result.then(function(response){
            $scope.result = `${response} button hitted`;
        });
        
      };

      // timer: 
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

})