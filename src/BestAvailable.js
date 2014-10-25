/*
---BestAvailable.js---
A simple web app with goal of helping you track and select available players during your live fantasy football draft.

Built using angularJS & Bootstrap with data being provided by fantasyfootballnerd.com 

See http://www.fantasyfootballnerd.com/fantasy-football-api for more info.
*/

var bestAvailableApp = angular.module('bestAvailableApp', []);

bestAvailableApp.controller('playerListController', function($scope){
	$scope.positionFilterValue = '';

	$scope.setPositionFilterValue = function(event){
		$scope.positionFilterValue = event.currentTarget.text;
	};

//---no longer needed
	$scope.playerNameFilter = function(query) {
		if(!query){ query = ''; }
		return function(player) { 
			player.fullName = player.fname.toLowerCase()+''+player.lname.toLowerCase();
			return player.fullName.match(query.toLowerCase()); 
		};
	};
//---

	$scope.playerPositionFilter = function(value) {
		return function(player){
			if(value === 'Show All'){return player.position.match('');
			} else if(value === 'FLEX'){return !player.position.match('QB');
			} else {return player.position.match(value);}
		};
	};

	$scope.selectPlayer = function(event){
		var $playerDiv = $(event.currentTarget);
		$('div.player.selected').removeClass('selected');
		$playerDiv.addClass('selected');
		//console.log( $playerDiv.data('playerid') );
		var activePlayer = _.find($scope.testPlayers, { 'playerId': $playerDiv.attr('data-playerId') });
		console.dir(activePlayer);
		$('#infoPane')
			.slideUp('fast')
			.empty()
			.append('<h3>'+activePlayer.displayName+'</h3>')
			.append('<p>Bye Week:'+activePlayer.byeWeek+'</p>')
			.slideDown();
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
		},{
		playerId: '14',
		position: 'QB',
		displayName: 'Drew Brees',
		fname: 'Drew',
		lname: 'Brees',
		team: 'NO',
		byeWeek: '7',
		nerdRank: '13.222',
		positionRank: '1',
		overallRank: '6'
		},{
		playerId: '1187',
		position: 'TE',
		displayName: 'Jimmy Graham',
		fname: 'Jimmy',
		lname: 'Graham',
		team: 'NO',
		byeWeek: '7',
		nerdRank: '19.511',
		positionRank: '1',
		overallRank: '7'
		}
	];
});

