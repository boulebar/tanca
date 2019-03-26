'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('games', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    player_one_id: 'integer',
    player_two_id: 'integer',
    player_one_score: 'integer',
    player_two_score: 'integer'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('games', callback);
};

exports._meta = {
  "version": 1
};
