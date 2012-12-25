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


