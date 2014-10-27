/*
---BestAvailable.js---
A simple web app with goal of helping you track and select available players during your live fantasy football draft.

Built using angularJS & Bootstrap with data being provided by fantasyfootballnerd.com 

See http://www.fantasyfootballnerd.com/fantasy-football-api for more info.
*/

var bestAvailableApp = angular.module('bestAvailableApp', []);

bestAvailableApp.controller('playerListController', function($scope){

//===Position Filter Functionality 
	$scope.positionFilterValue = '';

	$scope.setPositionFilterValue = function(event){
		$scope.positionFilterValue = event.currentTarget.text;
	};

	$scope.playerPositionFilter = function(value) {
		return function(player){
			if(value === 'Show All'){return player.position.match('');
			} else if(value === 'FLEX'){return !player.position.match('QB');
			} else {return player.position.match(value);}
		};
	};	
//===


	

/*
//---no longer needed
	$scope.playerNameFilter = function(query) {
		if(!query){ query = ''; }
		return function(player) { 
			player.fullName = player.fname.toLowerCase()+''+player.lname.toLowerCase();
			return player.fullName.match(query.toLowerCase()); 
		};
	};
//---
*/

//===player selection & side panel functionality 
	$scope.styleController = {
		infoPane_height:0,
		infoPane_closed:true
	};


	$scope.activePlayer = {};

	$scope.selectPlayer = function(event){
		var $playerDiv = $(event.currentTarget);
	//---player list manipulation
		$('div.player.selected').removeClass('selected');
		$playerDiv.addClass('selected');

	//--side panel functionality	 	
		var player = _.find($scope.testPlayers, { 'playerId': $playerDiv.attr('data-playerId') });
		_.forIn($scope.depthCharts[player.team], function(v){
			var c = _.find(v,{ playerId: player.playerId });
			if(c){ 
				player.depthChartPosition = c.position;
				player.depthChartValue = c.depth;
			}		
		});

		player.depthChartList = [];

		if(!player.depthChartPosition || !player.depthChartValue){
			player.depthChartPosition = 'Not Available';
		} else {
			_.each($scope.depthCharts[player.team][player.depthChartPosition],function(obj){
				var depthChartEntry = {};
				depthChartEntry.playerName = obj.playerName;
				depthChartEntry.selectedPlayer = (function(){ return player.playerId === obj.playerId; })();
				player.depthChartList[parseInt(obj.depth)-1] = depthChartEntry;
			});
		}
		$scope.activePlayer = player;
		$scope.styleController.infoPane_height = (function(){ 
			if( $(window).outerHeight() > 375){ return Math.ceil($(window).outerHeight()*0.8);
			} else { return 300 }
		})();
		$scope.styleController.infoPane_closed = false;
	};
//===

//===Static Test Data
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
	$scope.depthCharts ={
		NO: {
			QB: [
				{
				team: "NO",
				position: "QB",
				depth: "1",
				playerId: "14",
				playerName: "Drew Brees"
				},
				{
				team: "NO",
				position: "QB",
				depth: "2",
				playerId: "70",
				playerName: "Luke McCown"
				},
				{
				team: "NO",
				position: "QB",
				depth: "3",
				playerId: "2385",
				playerName: "Ryan Griffin"
				}
			],
			RB: [
				{
				team: "NO",
				position: "RB",
				depth: "1",
				playerId: "292",
				playerName: "Pierre Thomas"
				},
				{
				team: "NO",
				position: "RB",
				depth: "2",
				playerId: "1415",
				playerName: "Mark Ingram"
				},
				{
				team: "NO",
				position: "RB",
				depth: "3",
				playerId: "285",
				playerName: "Darren Sproles"
				},
				{
				team: "NO",
				position: "RB",
				depth: "4",
				playerId: "1974",
				playerName: "Travaris Cadet"
				}
			],
			FB: [
				{
				team: "NO",
				position: "FB",
				depth: "1",
				playerId: "151",
				playerName: "Jed Collins"
				}
			],
			TE: [
				{
				team: "NO",
				position: "TE",
				depth: "1",
				playerId: "1187",
				playerName: "Jimmy Graham"
				},
				{
				team: "NO",
				position: "TE",
				depth: "2",
				playerId: "730",
				playerName: "Benjamin Watson"
				},
				{
				team: "NO",
				position: "TE",
				depth: "3",
				playerId: "2389",
				playerName: "Josh Hill"
				}
			],
			WR1: [
				{
				team: "NO",
				position: "WR1",
				depth: "1",
				playerId: "371",
				playerName: "Marques Colston"
				},
				{
				team: "NO",
				position: "WR1",
				depth: "2",
				playerId: "1978",
				playerName: "Nick Toon"
				},
				{
				team: "NO",
				position: "WR1",
				depth: "3",
				playerId: "490",
				playerName: "Robert Meachem"
				}
			],
			WR2: [
				{
				team: "NO",
				position: "WR2",
				depth: "1",
				playerId: "2388",
				playerName: "Kenny Stills"
				},
				{
				team: "NO",
				position: "WR2",
				depth: "2",
				playerId: "493",
				playerName: "Lance Moore"
				}
			]
		},
		DAL: {
			WR1: [
				{
				team: "DAL",
				position: "WR1",
				depth: "1",
				playerId: "1143",
				playerName: "Dez Bryant"
				},
				{
				team: "DAL",
				position: "WR1",
				depth: "2",
				playerId: "2160",
				playerName: "Terrance Williams"
				},
				{
				team: "DAL",
				position: "WR1",
				depth: "3",
				playerId: "543",
				playerName: "Micheal Spurlock"
				}
			],
			TE: [
				{
				team: "DAL",
				position: "TE",
				depth: "1",
				playerId: "733",
				playerName: "Jason Witten"
				},
				{
				team: "DAL",
				position: "TE",
				depth: "2",
				playerId: "1794",
				playerName: "James Hanna"
				},
				{
				team: "DAL",
				position: "TE",
				depth: "3",
				playerId: "2161",
				playerName: "Gavin Escobar"
				}
			],
			WR2: [
				{
				team: "DAL",
				position: "WR2",
				depth: "1",
				playerId: "328",
				playerName: "Miles Austin"
				},
				{
				team: "DAL",
				position: "WR2",
				depth: "2",
				playerId: "1443",
				playerName: "Dwayne Harris"
				},
				{
				team: "DAL",
				position: "WR2",
				depth: "3",
				playerId: "1787",
				playerName: "Cole Beasley"
				}
			],
			QB: [
				{
				team: "DAL",
				position: "QB",
				depth: "1",
				playerId: "76",
				playerName: "Kyle Orton"
				},
				{
				team: "DAL",
				position: "QB",
				depth: "2",
				playerId: "59",
				playerName: "Jon Kitna"
				}
			],
			FB: [
				{
				team: "DAL",
				position: "FB",
				depth: "1",
				playerId: "1380",
				playerName: "Tyler Clutts"
				}
			],
			RB: [
				{
				team: "DAL",
				position: "RB",
				depth: "1",
				playerId: "1421",
				playerName: "DeMarco Murray"
				},
				{
				team: "DAL",
				position: "RB",
				depth: "2",
				playerId: "1538",
				playerName: "Phillip Tanner"
				},
				{
				team: "DAL",
				position: "RB",
				depth: "3",
				playerId: "2157",
				playerName: "Joseph Randle"
				}
			]
		},
		DET: {
			WR1: [
				{
				team: "DET",
				position: "WR1",
				depth: "1",
				playerId: "454",
				playerName: "Calvin Johnson"
				},
				{
				team: "DET",
				position: "WR1",
				depth: "2",
				playerId: "543",
				playerName: "Micheal Spurlock"
				}
			],
			RB: [
				{
				team: "DET",
				position: "RB",
				depth: "1",
				playerId: "139",
				playerName: "Reggie Bush"
				},
				{
				team: "DET",
				position: "RB",
				depth: "2",
				playerId: "1220",
				playerName: "Joique Bell"
				},
				{
				team: "DET",
				position: "RB",
				depth: "3",
				playerId: "1698",
				playerName: "Mikel Leshoure"
				},
				{
				team: "DET",
				position: "RB",
				depth: "4",
				playerId: "2305",
				playerName: "Theo Riddick"
				}
			],
			WR2: [
				{
				team: "DET",
				position: "WR2",
				depth: "1",
				playerId: "1439",
				playerName: "Kris Durham"
				},
				{
				team: "DET",
				position: "WR2",
				depth: "2",
				playerId: "987",
				playerName: "Kevin Ogletree"
				},
				{
				team: "DET",
				position: "WR2",
				depth: "3",
				playerId: "355",
				playerName: "Nate Burleson"
				},
				{
				team: "DET",
				position: "WR2",
				depth: "4",
				playerId: "1629",
				playerName: "Jeremy Ross"
				}
			],
			QB: [
				{
				team: "DET",
				position: "QB",
				depth: "1",
				playerId: "793",
				playerName: "Matthew Stafford"
				},
				{
				team: "DET",
				position: "QB",
				depth: "2",
				playerId: "54",
				playerName: "Shaun Hill"
				},
				{
				team: "DET",
				position: "QB",
				depth: "3",
				playerId: "1898",
				playerName: "Kellen Moore"
				}
			],
			TE: [
				{
				team: "DET",
				position: "TE",
				depth: "1",
				playerId: "888",
				playerName: "Brandon Pettigrew"
				},
				{
				team: "DET",
				position: "TE",
				depth: "2",
				playerId: "2307",
				playerName: "Joseph Fauria"
				},
				{
				team: "DET",
				position: "TE",
				depth: "3",
				playerId: "1147",
				playerName: "Dorin Dickerson"
				}
			]
		},
		KC: {
			QB: [
				{
				team: "KC",
				position: "QB",
				depth: "1",
				playerId: "97",
				playerName: "Alex Smith"
				},
				{
				team: "KC",
				position: "QB",
				depth: "2",
				playerId: "786",
				playerName: "Chase Daniel"
				},
				{
				team: "KC",
				position: "QB",
				depth: "3",
				playerId: "2191",
				playerName: "Tyler Bray"
				}
			],
			FB: [
				{
				team: "KC",
				position: "FB",
				depth: "1",
				playerId: "1427",
				playerName: "Anthony Sherman"
				}
			],
			WR2: [
				{
				team: "KC",
				position: "WR2",
				depth: "1",
				playerId: "330",
				playerName: "Donnie Avery"
				},
				{
				team: "KC",
				position: "WR2",
				depth: "2",
				playerId: "1841",
				playerName: "A.J. Jenkins"
				}
			],
			RB: [
				{
				team: "KC",
				position: "RB",
				depth: "1",
				playerId: "145",
				playerName: "Jamaal Charles"
				},
				{
				team: "KC",
				position: "RB",
				depth: "2",
				playerId: "2192",
				playerName: "Knile Davis"
				},
				{
				team: "KC",
				position: "RB",
				depth: "3",
				playerId: "1818",
				playerName: "Cyrus Gray"
				}
			],
			TE: [
				{
				team: "KC",
				position: "TE",
				depth: "1",
				playerId: "634",
				playerName: "Anthony Fasano"
				},
				{
				team: "KC",
				position: "TE",
				depth: "2",
				playerId: "2029",
				playerName: "Sean McGrath"
				},
				{
				team: "KC",
				position: "TE",
				depth: "3",
				playerId: "1462",
				playerName: "Richard Gordon"
				}
			],
			WR1: [
				{
				team: "KC",
				position: "WR1",
				depth: "1",
				playerId: "343",
				playerName: "Dwayne Bowe"
				},
				{
				team: "KC",
				position: "WR1",
				depth: "2",
				playerId: "1161",
				playerName: "Dexter McCluster"
				},
				{
				team: "KC",
				position: "WR1",
				depth: "3",
				playerId: "1820",
				playerName: "Junior Hemingway"
				}
			]
		}
	};
//===

});

