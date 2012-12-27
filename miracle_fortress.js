if (Meteor.is_client) {
  Template.hello.greeting = function () {
    return "Welcome to miracle_fortress.";
  };

  Template.hello.events = {
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  };
};



var what_tile_goes_here = function (row, column, game_id) {
//  var x = Tiles.findOne({}, {x: 1}, {fields: {x}}, {skip: 3})
};

var map = []
map[0] = 'zero'
map[5] = 'five'




if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
};
Meteor.methods( {
  add_tile: function (tile_id, x, y) {
  return "ok!";
  }
});

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


