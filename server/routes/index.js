var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({greeting:'Hello Meeting Summary Project~!'})
});

module.exports = router;