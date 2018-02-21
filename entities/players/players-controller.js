var ticTacToeApp = angular.module('ticTacToeApp')

/**
 * controls player information.. for noe add players
 */
ticTacToeApp.controller('PlayersController', function ($scope, Players) {
     $scope.newPlayer = '';
    // $scope.playersList= [
    //     {name: 'player 1', sex: 'M'},
    //     {name: 'player 2', sex: 'F'}
    // ];

    $scope.playersList = Players.getPlayerList();
    $scope.addNewUser = function(){
        
        // console.log($scope.playersList.indexOf({name: $scope.newPlayer, sex:'M'}));

        // foreach is not a good idea.. can not break the loop.. use normal loop
        // angular.forEach($scope.playersList, function(player){
        //     if(player.name === $scope.newPlayer){
        //         console.log('compare and found: '+ $scope.newPlayer +' with '+ player.name);
        //         return;
        //     }else{
        //         console.log('compare: '+ $scope.newPlayer +' with '+ player.name);
        //     }
        // });

        for(var i = 0; i< $scope.playersList.length; i++){
            if($scope.playersList[i].name === $scope.newPlayer){
                alert('Already Exist : '+ $scope.newPlayer);
                return;
            }
        }

        var msg = Players.addPlayer({name: $scope.newPlayer, wins:0, loose: 0, draw:0});
        $scope.newPlayer = null;
        console.log("on Add Player: "+msg);
    }

    // $scope.addNewUser = function(){
    //     $scope.playersList.push({name: $scope.newPlayer, sex:'M'});
    // }

    $scope.selectedUser = null;
    $scope.showUserDetails= function(user){
        $scope.selectedUser =user;
    }
})  