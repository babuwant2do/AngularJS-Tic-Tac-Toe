angular.module('ticTacToeApp').service('Players', function() {
    var list = [
        {name: 'player 1 xx', sex: 'M'},
        {name: 'player 2 yy', sex: 'F'}
    ];
  
   
    return {
      addPlayer: add,
      getPlayerList: getList
    };
  
    function add(item) {
      list.push(item);
    }
  
    function getList() {
      return list;
    }
  });