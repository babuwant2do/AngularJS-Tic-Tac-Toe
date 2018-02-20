var ticTacToeApp = angular.module('ticTacToeApp', ['ui.router', 'ui.bootstrap']);

ticTacToeApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        
        .state('players', {
            url: '/players',
            views: {
                '': { 
                    templateUrl: './entities/players/partial-players.html',
                    controller: 'PlayersController'
                }
            }
            
        })
        .state('players.details', {
            url: '/details',
            views: {
                'userDetails@players':{
                    templateUrl: './entities/players/partial-players-details.html',
                }
            }
        })
        
        .state('game', {
            url: '/game',
            views: {
                '': { 
                    templateUrl: './entities/game/partial-board.html' ,
                    // controller: 'BoardController',
                    controller: 'GameBoardController'
                },
                
                'information@game': { 
                    templateUrl: './entities/game/partial-board-information',
                    controller: 'GameBoardInfoController'
                },
                'field@game': { 
                    templateUrl: './entities/game/partial-board-field.html',
                    controller: 'GameBoardFieldController'
                }
            }
            
        })
        ;
        
});





