//Initialization
//

Meteor.startup(function(){
  Players.remove({}); //scaffolding, TODO: clean this up when you start designing #lobby
  var player_id = Players.insert({name: "Peter"});
  Session.set('player_id', player_id);
  //TODO: Players can, you know, log in

  //for now, automatically create a game and put a player in it
  var game_id = Games.insert({prestige_remaining: 40});

  Players.update({game_id: null}, {$set: {game_id: game_id, prestige: 0}});


  Meteor.autosubscribe(function () {
    Meteor.subscribe('players');
  });
  console.log("It begins.");
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

var offset = function(row_number){
  return row_number % 2;
};

var board_radius = function(){
  max_radius = 0;
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
  var width = 2 * board_radius() + 1;
  var height = 2 * board_radius() + 1;
    var board = {}
    board.rows = [];
    for (var row=0; row<height; row++) {
      board.rows[row] = {};
      board.rows[row].row_number = board_radius() - row;
      var row_number = board_radius() - row;
        board.rows[row].columns = [];
      for (var column=0; column<width; column++) {
        var hex_x = 2*(column - board_radius()) + offset(row_number);
        var hex_y = board_radius() - row;
        board.rows[row].columns[column] = {};
        board.rows[row].columns[column].name = "my hex-coordinates are " + hex_x + ", " +  hex_y;
        board.rows[row].columns[column].hex_x = hex_x;
        board.rows[row].columns[column].hex_y = hex_y;

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

Template.board.rows = function() {
  return board().rows;
}

Template.board.name = function() {
  console.log("found a name!");
  return this.name;
};


Template.board.tile = function() {
  if (tile = Tiles.findOne({x: this.hex_x, y: this.hex_y})) {
    var title = "I'm a real tile! My hexx is " + tile.x + " and my hexy is " + tile.y;
    return title;

  }
};

Template.board.type = function() { 
  if (tile = Tiles.findOne({x: this.hex_x, y: this.hex_y})) { //TODO: refactor me!
    console.log("x:" + tile.x + " y:" + tile.y + "; type is " + tile.type);
    return tile.type;
  }
};


Template.board.offset = function() {
  return offset(this.row_number);
  //board should always have an odd number of rows, center row will always be thickest
}

//DON'T double-nest templates!




