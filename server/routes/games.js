var express = require('express');
var router = express.Router();
const decamelize = require('decamelize');


const deCamelizeColumns = (data) => {
  for (let prop in data) {
    const camel = decamelize(prop);
    if (!(camel in data)) {
      data[camel] = data[prop];
      delete data[prop];
    }
  }
}

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
  const params = req.body
  deCamelizeColumns(params)

  req.db.any('INSERT INTO games (player_one_id, player_two_id, player_one_score, player_two_score) VALUES (${player_one_id}, ${player_two_id}, ${player_one_score}, ${player_two_score});', params)
        .then((data) => {
          res.json(data);
        }).catch((error) => {
          res.json( { message: 'Something went wrong', error });
        });
});

module.exports = router;
