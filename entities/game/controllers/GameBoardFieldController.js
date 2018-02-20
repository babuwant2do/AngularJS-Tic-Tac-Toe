angular.module('ticTacToeApp').controller('GameBoardFieldController', function ($scope, $uibModal, $timeout) {

    
    // user is true / false
    $scope.currentPlayer = true
    $scope.winner = null 
    $scope.board = [
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}],
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}],
        [{value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}, {value:'-', class:'free-cell'}]
    ]
    $scope.alerts =[];
    var boardStatus = 1;// 1: playable, 2: hasResult, 3: Draw
    // $scope.alerts[0] = $scope.currentPlayer? "Player 1 [O]'s Turn" : "Player 2 [X]'s Turn";
    addAlert($scope.currentPlayer? "Player 1 [O]'s Turn" : "Player 2 [X]'s Turn");


    $scope.buttonBoardCellClick = function(row,col){
        console.log("Clicked");
        console.log(row +' : '+col);
        
        // if($scope.winner !== null){
        //     console.warn("Winner Alreday defined, restar for new game!");
        //     return;
        // }

        if(boardStatus === 2){
            console.warn("Winner Alreday defined, restar for new game!");
            addAlert("Winner Alreday defined, restar for new game!", "warning");
        }else if(boardStatus === 1){
            if(angular.isUndefined($scope.board[row][col]) || $scope.getCellValue(row, col) === '-'){
                updateCell(row, col, ($scope.currentPlayer? 'O' : 'X'), $scope.currentPlayer? 'player-1-cell' : 'player-2-cell');

                var winnerInfo = findWinner();
                if(winnerInfo){
                    //TODO: celebrate Winner..
                    // console.warn("Game Winner!! : " +winnerInfo.winner);
                    boardStatus = 2;
                    celebrateWinning(winnerInfo);
                }else if(!isBoardPlayableFunc()){
                    boardStatus = 3;
                    console.warn("Game Drawn!!");
                    fireGameResult(false);
                    
                }else{
                    $scope.currentPlayer = !$scope.currentPlayer;
                    // $scope.alerts[0]= $scope.currentPlayer? "Player 1 [O]'s Turn" : "Player 2 [X]'s Turn";
                    addAlert($scope.currentPlayer? "Player 1 [O]'s Turn" : "Player 2 [X]'s Turn");
                }
            }else{
                console.warn("Not a free cell, try another!!");
                // addAlert("danger", "Not a free cell, try another!!");
                //ERR MSG WITH TIMER
            }
        }else{
            boardStatus = 3;
            console.warn("The game voard is not playable!");
            // addAlert(null, "Not a free cell, try another!!");
             //ERR MSG WITH TIMER
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
        $scope.alerts=[];
        boardStatus = 1;
        addAlert($scope.currentPlayer? "Player 1 [O]'s Turn" : "Player 2 [X]'s Turn");

        $scope.player1 = null;
        $scope.player2 = null;
    }


    
    function findWinner(){
        for (var i = 0; i < 3; i++) {
            //row wise 
            if($scope.getCellValue(i, 0) !== '-' && $scope.getCellValue(i, 0) === $scope.getCellValue(i, 1) && $scope.getCellValue(i, 0) === $scope.getCellValue(i, 2)){
                return {winner: $scope.currentPlayer, winningCell: [{row:i, col: 0}, {row:i, col: 1},{row:i, col: 2}]};
            }
            //col wide
            if($scope.getCellValue(0,i) !== '-' && $scope.getCellValue(0,i) === $scope.getCellValue(1,i) && $scope.getCellValue(0,i) === $scope.getCellValue(2,i)){
                return {winner: $scope.currentPlayer, winningCell: [{row:0, col: i}, {row:1, col: i},{row:2, col: i}]};
            }
        }

        if($scope.getCellValue(1,1) !== '-' && $scope.getCellValue(1,1) === $scope.getCellValue(0,0) && $scope.getCellValue(1,1) === $scope.getCellValue(2,2)){
            return {winner: $scope.currentPlayer, winningCell: [{row:1, col: 1}, {row:0, col: 0},{row:2, col: 2}]};
        }else if($scope.getCellValue(1,1) !== '-' && $scope.getCellValue(1,1) === $scope.getCellValue(0,2) && $scope.getCellValue(1,1) === $scope.getCellValue(2,0)){
            return {winner: $scope.currentPlayer, winningCell: [{row:1, col: 1}, {row:0, col: 2},{row:2, col: 0}]};
        }

        return null;
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
    }

    function setCellValue(row, col, value){
        ($scope.board[row][col]).value = value;
    }

    function setCellClass(row, col, classVal){
        ($scope.board[row][col]).class = classVal;
    }

    function celebrateWinning(winnerInfo){
        console.warn("Celebtity  Winner is "+ winnerInfo.winner);
        markWinningCell(winnerInfo.winningCell);
        fireGameResult(true, winnerInfo.winner);
    }

    function markWinningCell(indexArr){
        if (indexArr instanceof Array) {
            indexArr.forEach(element => {
                setCellClass(element.row, element.col, 'winning-cell');
            });
        }
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    addAlert = function(message, type='success',  index=0) {
        $scope.alerts[index] = {type: type, msg: message};
    };

    // event to fire

    fireBoardCellValidClicked = function(row,col){
        console.log("Clicked GameBoardFieldController");
        console.log(row +' : '+col);
        $scope.$emit("GAME_CELL_CLICKED",{row,col}); 
    }

    fireGameResult = function(result, winner = null){
        console.log("Clicked GameBoardFieldController");
        $scope.$emit("GAME_RESULT_EMMIT",{result, winner}); 
    }



    // fireFindWinner = function(winner){
    //     console.log("Clicked GameBoardFieldController");
    //     $scope.$emit("GAME_WINNER_FOUND",{winner}); 
    // }

    // fireGameDraw = function(){
    //     console.log("Clicked GameBoardFieldController");
    //     $scope.$emit("GAME_DRAW",null); 
    // }

    // fireBoardReset = function(){
    //     console.log("Clicked GameBoardFieldController");
    //     $scope.$emit("GAME_BOARD_RESET",null); 
    // }
    
})