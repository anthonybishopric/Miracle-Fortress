Meteor.methods( {
  start_new_game: function () {
    var game_id = Games.insert({ board: 1,
                                prestige_remaining:  40, //changed? //TODO: make this dependent on number of players
                                players: Players.find().fetch() //TODO: not all players join a new game when it's called
                  });
    Players.update({}, {$set: {game_id: game_id}}, {multi: true});

    var the_fortress = Tiles.insert(
    { game_id: game_id,
      x: 0,
      y: 0,
      type: "HOLY",
    });
    console.log("Let it begin.");
    return game_id;
  },
});


