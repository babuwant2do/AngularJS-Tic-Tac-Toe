angular.module('ticTacToeApp').service('Players', function() {
    var list = [
        {name: 'player 1 xx', wins:2, loose: 1, draw: 1},
        {name: 'player 2 yy', wins:1, loose: 2, draw: 1}
    ];
  
   
    return {
      addPlayer: add,
      getPlayerList: getList,
      updateResult: updateResult
    };
  
    function add(item) {
      list.push(item);
    }
  
    function getList() {
      return list;
    }

    function updateResult(winner, looser, isDraw=false){
      var found = 0;
      if(isDraw){
        for(var i = 0; i< list.length; i++){
          if(list[i].name === winner || list[i].name === looser ){
            list[i].draw++;
            found++;
            if(found == 2) break;
          }
        }
      }else{
        for(var i = 0; i< list.length; i++){
          if(list[i].name === winner){
            list[i].wins++;
            found++;
          }else if(list[i].name === looser ){
            list[i].loose++;
            found++;
          }
          if(found == 2) break;
        }
      }
    }

  });