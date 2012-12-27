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

var map_radius = function() {
  game().board
};

var distance = function(tile1, tile2){
  x_distance = Math.abs(tile1.x - tile2.x);
  y_distance = Math.abs(tile1.y - tile2.y);
  return (x_distance + y_distance)/2
};

var board_radius = function(){
  max_radius = 1;
  tiles = Tiles.find({game_id: game()._id});
  tiles.forEach(function (tile) {
    distance = (Math.abs(tile.x) + Math.abs(tile.y))/2;
    if (distance > max_radius) {
      max_radius = distance
    };
  });
  return max_radius;
};

  var board = function () {
  var width = board_radius();
  var height = board_radius();
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
        console.log("this is working honest");
        //board.rows[row][column]= "
        board.rows[row].columns[column] = "look at me I'm row " + row + " and column" + column;
      }
    }
    return board
  };



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

Template.board.offset = function() {
  return (this.row_number + 1) % 2;
  //board should always have an odd number of rows, center row will always be thickest

}

//DON'T double-nest templates!




