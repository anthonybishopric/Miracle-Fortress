Games = new Meteor.Collection('games');
//{players: [player_id, player_id], prestige_remaining: 40, tiles: [x, y, type, id, owner], board[][]}

Players = new Meteor.Collection('players');
//{name: "Peter", game_id: 1}
//

Tiles = new Meteor.Collection('tiles');
//{x: 0, y:0, game_id: 1, owner: 12, type: COURAGE}

if (Meteor.is_server) {
  Meteor.publish('players', function() {
    return Players.all
  })
}





