var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.any('SELECT * FROM games')
        .then((data) => {
          res.json(data);
        }).catch((error) => {
          res.json( { message: 'Something went wrong', error });
        });
});

router.post('/', function(req, res, next) {
  console.log('req.body', req.body);
  req.db.any('INSERT INTO games (player_one_id, player_two_id, player_one_score, player_two_score) VALUES (${player_one_id}, ${player_two_id}, ${player_one_score}, ${player_two_score});', req.body)
        .then((data) => {
          res.json(data);
        }).catch((error) => {
          res.json( { message: 'Something went wrong', error });
        });
});

module.exports = router;
