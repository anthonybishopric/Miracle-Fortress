//Initialization
//

Meteor.startup(function(){
  var player_id = Players.insert({name: "Peter"});
  Session.set('player_id', player_id);
  //TODO: Players can, you know, log in

  //for now, automatically create a game and put a player in it
  var game_id = Games.insert({prestige_remaining: 40});

  Players.update({game_id: null}, {$set: {game_id: game_id}})


  Meteor.autosubscribe(function () {
    Meteor.subscribe('players');
  });
  console.log("good morning sunshine!");



});


//Utility functions

var player = function() {
  return Players.findOne(Session.get('player_id'));
};

var game = function() {
  return player() && player().game_id && Games.findOne(player().game_id);
};

var map = function() {
  var map = []
    map[0] = 'zero!';
    map[5] = 'five!';
    return map
};


  var board = function () {
  var width = 3;
  var height = 3;
    var board = {}
    board.rows = [];
    for (var row=0; row<height; row++) {
      board.rows[row] = {};
      board.rows[row].row_number = row
        board.rows[row].columns = []
      for (var column=0; column<width; column++) {
        var output = "you're at row " + row + " and column " + column;
        console.log(output);
        console.log(board);
        //board.rows[row][column]= "
        board.rows[row].columns[column] = "look at me I'm row " + row + " and column" + column;
      }
    }
    return board
  }


Template.game.show = function() {
  return game();
};

Template.game.prestige_remaining = function() {
  return game().prestige_remaining;
};

Template.game.players = function() {
  return game().players;
};

//do we need this?
Template.game.board = function() {
  return board();
};

//surely this is not necessary? Can this come with game.board?
Template.board.rows = function() {
  return board().rows;
}


//DON'T double-nest templates!




