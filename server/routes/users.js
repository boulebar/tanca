var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.any('SELECT * FROM users')
        .then((data) => {
          res.json(data);
        }).catch((error) => {
          res.json( { message: 'Something went wrong', error });
        });
});

router.post('/', function(req, res, next) {
  console.log({...req.body, ranking: 1000});
  req.db.any('INSERT INTO users (name, email, ranking) VALUES (${name}, ${email}, ${ranking});', {...req.body, ranking: 1000})
        .then((data) => {
          res.json(data);
        }).catch((error) => {
          res.json( { message: 'Something went wrong', error });
        });
});

module.exports = router;
