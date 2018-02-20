angular.module('ticTacToeApp').controller('GameBoardInfoController', function ($scope, Players, $uibModal, $timeout) {

    $scope.matchHistory=[];

    $scope.$on("GAME_CELL_CLICKED_BROADCAST", function(evt,data){ 
        // debugger;
        console.log("**** GameBoardInfoController:: "+ evt +" ::: "+data);
        // $scope.startTimeout();
        // evt.stopPropagation();
        
    }); 

    $scope.$on("GAME_RESULT_BROADCAST", function(evt,data){ 
        console.log("******"+evt.name +" ::: "+data.result);
        $scope.matchHistory.push(data);
        // if(data.result){
        //     // debugger;
        //     console.log(data.winner);
        //     $scope.matchHistory.push(data.winner +" Wins!");
        // }else{
        //     $scope.matchHistory.push("Match Draw");
        // }
        
    });
})