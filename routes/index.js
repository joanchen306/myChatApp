var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyChatApp' });
});

router.get('/chat', function(req, res, next) {
	var name = req.query.name;
	var title = "ChatRoom: " + name;
	res.render('chat', { title: title, name: name});
});


module.exports = router;
