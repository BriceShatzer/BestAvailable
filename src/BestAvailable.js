/*
---BestAvailable.js---
A simple web app with goal of helping you track and select available players during your live fantasy football draft.

Built using angularJS & Bootstrap with data being provided by fantasyfootballnerd.com 

See http://www.fantasyfootballnerd.com/fantasy-football-api for more info.
*/

/*
function playerNameFilter(value){
	if( value.fname.indexOf(nameSearch) !==-1 ||  value.lname.indexOf(nameSearch) !==-1 ){
		return true
	} else { return false}
}
*/

var bestAvailableApp = angular.module('bestAvailableApp', []);

bestAvailableApp.controller('playerListController', function($scope){
	$scope.positionFilter = '';

	$scope.test = function(query) {
		return function(player) { return player.fname.match(query); }
		//works but is currently case sensitive
	};

	$scope.playerNameFilter = function(query){
		caseInsensitiveQuery = '/'+query+'/i'
		return function(player){
			if(player.fname.indexOf(query) !==-1 || player.lname.indexOf(query) !==-1 ){
				return player
			}
		}
	//	return function(player) { return player.name.match(value); }
	};
	$scope.testPlayers = [
		{
		  playerId: '259',
		  position: 'RB',
		  displayName: 'Adrian Peterson',
		  fname: 'Adrian',
		  lname: 'Peterson',
		  team: 'MIN',
		  byeWeek: '5',
		  nerdRank: '1.826',
		  positionRank: '1',
		  overallRank: '1'
		},{
		  playerId: '1981',
		  position: 'RB',
		  displayName: 'Doug Martin',
		  fname: 'Doug',
		  lname: 'Martin',
		  team: 'TB',
		  byeWeek: '5',
		  nerdRank: '2.635',
		  positionRank: '2',
		  overallRank: '2'
		},{  
		  playerId: '145',
		  position: 'RB',
		  displayName: 'Jamaal Charles',
		  fname: 'Jamaal',
		  lname: 'Charles',
		  team: 'KC',
		  byeWeek: '10',
		  nerdRank: '5.594',
		  positionRank: '3',
		  overallRank: '3'
		},{
		  playerId: '454',
		  position: 'WR',
		  displayName: 'Calvin Johnson',
		  fname: 'Calvin',
		  lname: 'Johnson',
		  team: 'DET',
		  byeWeek: '9',
		  nerdRank: '7.209',
		  positionRank: '1',
		  overallRank: '4'
		},{
		  playerId: '1143',
		  position: 'WR',
		  displayName: 'Dez Bryant',
		  fname: 'Dez',
		  lname: 'Bryant',
		  team: 'DAL',
		  byeWeek: '11',
		  nerdRank: '14.809',
		  positionRank: '2',
		  overallRank: '5'
		}
	]
});

