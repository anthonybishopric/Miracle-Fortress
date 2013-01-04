var prestige_remaining = function(game) {
  var player_prestige = 0;
  //I miss sql
  //TODO: have player_prestige be dynamic
  Players.find({game_id: game()._id}).forEach(function (player){
      player_prestige = player_prestige + player.prestige;
  });
  return 40 - player_prestige;
};

Meteor.methods( {
  start_new_game: function () {
    var game_id = Games.insert({ board: 1,
                                prestige_remaining:  40, //changed? //TODO: make this dependent on number of players
                  });
  //  idle_players = Players.find({})
    Players.update({}, {$set: {game_id: game_id, prestige: 0}}, {multi: true});
//    Players.update({game_id: null}, {$set: {game_id: game_id, prestige: 0}}, {multi: true});
    //TODO: only do this to players that aren't in a game ()

    //add players to game
    //first find players

    var the_fortress = Tiles.insert(
    { game_id: game_id,
      x: 0,
      y: 0,
      type: "HOLY",
    });

    console.log("Let's get this pahty stahted!");

    return game_id;

  },

});


